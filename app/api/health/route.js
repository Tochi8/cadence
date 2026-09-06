import { hasSupabase } from "../../../lib/supabase";
import { getUserClient } from "../../../lib/supabase/api";

export async function GET() {
  const { user } = await getUserClient();
  return Response.json({
    ok: true,
    db: hasSupabase() ? "supabase" : "memory",
    auth: Boolean(user),
  });
}
