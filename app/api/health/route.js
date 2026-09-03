import { hasSupabase } from "../../../lib/supabase";

export async function GET() {
  return Response.json({
    ok: true,
    db: hasSupabase() ? "supabase" : "memory",
  });
}
