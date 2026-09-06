import { getUserClient, unauthorized } from "../../../../../lib/supabase/api";

export async function GET(_req, { params }) {
  const { id } = await params;
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();
  if (mode === "memory") return Response.json({ source: "memory", lines: [] });
  if (noAuth) return unauthorized();

  const { data, error } = await supabase
    .from("lines")
    .select("*")
    .eq("scene_id", id)
    .eq("user_id", user.id)
    .order("sort");

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", lines: data });
}

export async function POST(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({
      source: "memory",
      line: {
        id: `l_${Date.now()}`,
        sceneId: id,
        characterId: body.characterId,
        text: body.text || "",
        emotion: body.emotion || "calm",
        pauseMsAfter: body.pauseMsAfter ?? 240,
        sort: body.sort ?? 0,
      },
    });
  }
  if (noAuth) return unauthorized();

  const { data: scene } = await supabase
    .from("scenes")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (!scene) return Response.json({ error: "Scene not found" }, { status: 404 });

  const characterId = body.characterId || body.character_id;
  if (!characterId) {
    return Response.json({ error: "characterId required" }, { status: 400 });
  }
  if (!body.text || !String(body.text).trim()) {
    return Response.json({ error: "text required" }, { status: 400 });
  }

  let sort = body.sort;
  if (sort === undefined) {
    const { data: existing } = await supabase
      .from("lines")
      .select("sort")
      .eq("scene_id", id)
      .order("sort", { ascending: false })
      .limit(1);
    sort = (existing?.[0]?.sort ?? -1) + 1;
  }

  const row = {
    scene_id: id,
    character_id: characterId,
    user_id: user.id,
    text: String(body.text).trim(),
    emotion: body.emotion || "calm",
    pause_ms: body.pauseMsAfter ?? body.pause_ms ?? 240,
    sort,
  };

  const { data, error } = await supabase.from("lines").insert(row).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", line: data });
}
