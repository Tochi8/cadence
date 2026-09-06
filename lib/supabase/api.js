import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { hasSupabase } from "../supabase";

/**
 * Supabase client bound to the request user's cookies (anon key + RLS).
 */
export async function getUserClient() {
  if (!hasSupabase()) {
    return { mode: "memory", supabase: null, user: null };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            /* ignore when cookies immutable */
          }
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { mode: "supabase", supabase, user: null, unauthorized: true };
  }

  return { mode: "supabase", supabase, user };
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
