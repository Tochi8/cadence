import { getUserClient, unauthorized } from "../../../../lib/supabase/api";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({ source: "memory", character: { id, ...body } });
  }
  if (noAuth) return unauthorized();

  const patch = {};
  if (typeof body.name === "string") patch.name = body.name.trim();
  if (typeof body.locale === "string") patch.locale = body.locale;
  if (typeof body.voice === "string") patch.voice = body.voice;
  if (typeof body.locked === "boolean") patch.locked = body.locked;
  if (body.backend !== undefined) patch.backend = body.backend;
  if (body.voiceId !== undefined || body.voice_id !== undefined) {
    patch.voice_id = body.voiceId ?? body.voice_id;
  }
  if (body.fingerprint !== undefined) patch.fingerprint = body.fingerprint;

  const { data, error } = await supabase
    .from("characters")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", character: data });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();
  if (mode === "memory") return Response.json({ source: "memory", ok: true });
  if (noAuth) return unauthorized();

  const { error } = await supabase
    .from("characters")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", ok: true });
}
