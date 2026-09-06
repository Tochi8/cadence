import { getUserClient, unauthorized } from "../../../../../lib/supabase/api";

export async function GET(_req, { params }) {
  const { id } = await params;
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();
  if (mode === "memory") return Response.json({ source: "memory", characters: [] });
  if (noAuth) return unauthorized();

  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("project_id", id)
    .eq("user_id", user.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", characters: data });
}

export async function POST(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({
      source: "memory",
      character: {
        id: `c_${Date.now()}`,
        projectId: id,
        name: body.name || "Speaker",
        locale: body.locale || "en-NG-LAG",
        voice: body.voice || null,
        locked: body.locked !== false,
      },
    });
  }
  if (noAuth) return unauthorized();

  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (!project) return Response.json({ error: "Project not found" }, { status: 404 });

  const row = {
    project_id: id,
    user_id: user.id,
    name: (body.name || "Speaker").trim(),
    locale: body.locale || "en-NG-LAG",
    voice: body.voice || null,
    locked: body.locked !== false,
    backend: body.backend || null,
    voice_id: body.voiceId || body.voice_id || null,
    fingerprint: body.fingerprint || null,
  };

  const { data, error } = await supabase.from("characters").insert(row).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", character: data });
}
