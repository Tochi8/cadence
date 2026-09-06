import { getUserClient, unauthorized } from "../../../../lib/supabase/api";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({ source: "memory", scene: { id, title: body.title } });
  }
  if (noAuth) return unauthorized();

  const patch = {};
  if (typeof body.title === "string") patch.title = body.title.trim();

  const { data, error } = await supabase
    .from("scenes")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", scene: data });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();
  if (mode === "memory") return Response.json({ source: "memory", ok: true });
  if (noAuth) return unauthorized();

  const { error } = await supabase
    .from("scenes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", ok: true });
}
