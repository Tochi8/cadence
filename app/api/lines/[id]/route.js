import { getUserClient, unauthorized } from "../../../../lib/supabase/api";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({ source: "memory", line: { id, ...body } });
  }
  if (noAuth) return unauthorized();

  const patch = {};
  if (typeof body.text === "string") patch.text = body.text.trim();
  if (typeof body.emotion === "string") patch.emotion = body.emotion;
  if (body.pauseMsAfter !== undefined || body.pause_ms !== undefined) {
    patch.pause_ms = body.pauseMsAfter ?? body.pause_ms;
  }
  if (body.sort !== undefined) patch.sort = body.sort;
  if (body.characterId || body.character_id) {
    patch.character_id = body.characterId || body.character_id;
  }

  const { data, error } = await supabase
    .from("lines")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", line: data });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();
  if (mode === "memory") return Response.json({ source: "memory", ok: true });
  if (noAuth) return unauthorized();

  const { error } = await supabase
    .from("lines")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", ok: true });
}
