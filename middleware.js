import { NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

/**
 * Session refresh + studio protection.
 * Choice: require auth for /studio except /studio/demo (guest demo stays public).
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);

  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  const isDemo =
    pathname === "/studio/demo" || pathname.startsWith("/studio/demo/");

  if (isStudio && !isDemo && !user) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return response;
    }
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
