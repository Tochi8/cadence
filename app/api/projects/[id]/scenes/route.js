import { getUserClient, unauthorized } from "../../../../../lib/supabase/api";

export async function GET(_req, { params }) {
  const { id } = await params;
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();
  if (mode === "memory") {
    return Response.json({ source: "memory", scenes: [{ id: "s1", title: "Scene 1" }] });
  }
  if (noAuth) return unauthorized();

  const { data, error } = await supabase
    .from("scenes")
    .select("*")
    .eq("project_id", id)
    .eq("user_id", user.id)
    .order("created_at");

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", scenes: data });
}

export async function POST(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({
      source: "memory",
      scene: { id: `s_${Date.now()}`, projectId: id, title: body.title || "Scene" },
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

  const { data, error } = await supabase
    .from("scenes")
    .insert({
      project_id: id,
      user_id: user.id,
      title: (body.title || "Scene 1").trim(),
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", scene: data });
}
