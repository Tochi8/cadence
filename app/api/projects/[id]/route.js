import { CHARACTERS, LINES, PROJECT, TAKES } from "../../../../lib/store";
import { getUserClient, unauthorized } from "../../../../lib/supabase/api";

function mapLine(row) {
  return {
    id: row.id,
    sceneId: row.scene_id,
    characterId: row.character_id,
    text: row.text,
    emotion: row.emotion,
    pauseMsAfter: row.pause_ms,
    sort: row.sort,
  };
}

function mapTake(row) {
  return {
    id: row.id,
    lineId: row.line_id,
    status: row.status,
    duration: row.duration,
    note: row.note,
    audioKey: row.audio_key,
    createdAt: row.created_at,
  };
}

function mapCharacter(row) {
  return {
    id: row.id,
    projectId: row.project_id,
    name: row.name,
    locale: row.locale,
    voice: row.voice,
    locked: row.locked,
    backend: row.backend,
    voiceId: row.voice_id,
    fingerprint: row.fingerprint,
  };
}

export async function GET(_req, { params }) {
  const { id } = await params;
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory" || id === "demo") {
    return Response.json({
      source: "memory",
      project: { ...PROJECT, id },
      characters: CHARACTERS,
      scenes: [{ id: "s1", projectId: id, title: "Scene 1" }],
      lines: LINES,
      takes: TAKES,
    });
  }
  if (noAuth) return unauthorized();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !project) {
    return Response.json({ error: error?.message || "Not found" }, { status: 404 });
  }

  const { data: characters } = await supabase
    .from("characters")
    .select("*")
    .eq("project_id", id)
    .eq("user_id", user.id);

  const { data: scenes } = await supabase
    .from("scenes")
    .select("*")
    .eq("project_id", id)
    .eq("user_id", user.id);

  const sceneIds = (scenes || []).map((s) => s.id);
  let lines = [];
  let takes = [];

  if (sceneIds.length) {
    const lineRes = await supabase
      .from("lines")
      .select("*")
      .in("scene_id", sceneIds)
      .eq("user_id", user.id)
      .order("sort");
    lines = lineRes.data || [];
    const lineIds = lines.map((l) => l.id);
    if (lineIds.length) {
      const takeRes = await supabase
        .from("takes")
        .select("*")
        .in("line_id", lineIds)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      takes = takeRes.data || [];
    }
  }

  return Response.json({
    source: "supabase",
    project,
    characters: (characters || []).map(mapCharacter),
    scenes: scenes || [],
    lines: lines.map(mapLine),
    takes: takes.map(mapTake),
  });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({ source: "memory", project: { id, title: body.title } });
  }
  if (noAuth) return unauthorized();

  const patch = {};
  if (typeof body.title === "string") patch.title = body.title.trim();

  const { data, error } = await supabase
    .from("projects")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", project: data });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({ source: "memory", ok: true });
  }
  if (noAuth) return unauthorized();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", ok: true });
}
