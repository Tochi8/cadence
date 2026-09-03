import { PROJECT } from "../../../lib/store";
import { hasSupabase, supabaseAdmin } from "../../../lib/supabase";

export async function GET() {
  if (!hasSupabase()) {
    return Response.json({ source: "memory", projects: [PROJECT] });
  }
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("projects")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", projects: data });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const title = body.title || "Untitled project";
  if (!hasSupabase()) {
    return Response.json({ source: "memory", project: { id: "demo", title } });
  }
  const db = supabaseAdmin();
  const { data: profile } = await db.from("profiles").select("id").limit(1).maybeSingle();
  const { data, error } = await db
    .from("projects")
    .insert({ title, user_id: profile?.id || null })
    .select()
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  await db.from("scenes").insert({ project_id: data.id, title: "Scene 1" });
  return Response.json({ source: "supabase", project: data });
}
