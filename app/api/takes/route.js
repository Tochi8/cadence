import { hasSupabase, supabaseAdmin } from "../../../lib/supabase";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const lineId = body.lineId;
  if (!lineId) return Response.json({ error: "lineId required" }, { status: 400 });

  const take = {
    line_id: lineId,
    status: "stub",
    duration: "00:03.0",
    note: hasSupabase() ? "Queued — no TTS key" : "Memory stub — no TTS key",
  };

  if (!hasSupabase()) {
    return Response.json({
      take: { id: `t${Date.now()}`, lineId, status: take.status, duration: take.duration, note: take.note },
    });
  }

  const db = supabaseAdmin();
  const { data, error } = await db.from("takes").insert(take).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ take: data });
}
