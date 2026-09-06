import { PROJECT } from "../../../lib/store";
import { getUserClient, unauthorized } from "../../../lib/supabase/api";

export async function GET() {
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({ source: "memory", projects: [PROJECT] });
  }
  if (noAuth) return unauthorized();

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, created_at, user_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", projects: data });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const title = (body.title || "Untitled project").trim() || "Untitled project";
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({
      source: "memory",
      project: { id: `p_${Date.now()}`, title },
    });
  }
  if (noAuth) return unauthorized();

  const { data, error } = await supabase
    .from("projects")
    .insert({ title, user_id: user.id })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  await supabase.from("scenes").insert({
    project_id: data.id,
    user_id: user.id,
    title: "Scene 1",
  });

  return Response.json({ source: "supabase", project: data });
}
