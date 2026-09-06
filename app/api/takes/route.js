import { getUserClient, unauthorized } from "../../../lib/supabase/api";

export async function GET(request) {
  const lineId = new URL(request.url).searchParams.get("lineId");
  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  if (mode === "memory") {
    return Response.json({ source: "memory", takes: [] });
  }
  if (noAuth) return unauthorized();

  let q = supabase.from("takes").select("*").eq("user_id", user.id).order("created_at", {
    ascending: false,
  });
  if (lineId) q = q.eq("line_id", lineId);

  const { data, error } = await q;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ source: "supabase", takes: data });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const lineId = body.lineId || body.line_id;
  if (!lineId) return Response.json({ error: "lineId required" }, { status: 400 });

  const { mode, supabase, user, unauthorized: noAuth } = await getUserClient();

  const stub = {
    line_id: lineId,
    status: "stub",
    duration: "00:03.0",
    note: mode === "memory" ? "Memory stub — no TTS key" : "Queued — no TTS key",
  };

  if (mode === "memory") {
    return Response.json({
      source: "memory",
      take: {
        id: `t_${Date.now()}`,
        lineId,
        status: stub.status,
        duration: stub.duration,
        note: stub.note,
      },
    });
  }
  if (noAuth) return unauthorized();

  const { data: line, error: lineErr } = await supabase
    .from("lines")
    .select("id")
    .eq("id", lineId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (lineErr || !line) {
    return Response.json({ error: "Line not found or not owned" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("takes")
    .insert({
      ...stub,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({
    source: "supabase",
    take: {
      id: data.id,
      lineId: data.line_id,
      status: data.status,
      duration: data.duration,
      note: data.note,
      createdAt: data.created_at,
    },
  });
}
