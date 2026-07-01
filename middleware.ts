import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateSessionToken } from "@/lib/admin/auth";
import { SESSION_COOKIE } from "@/lib/admin/session";

function clearSessionCookie(response: NextResponse) {
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isValid = await validateSessionToken(token);

  if (pathname === "/admin/login") {
    if (isValid) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (token) {
      return clearSessionCookie(NextResponse.next());
    }

    return NextResponse.next();
  }

  if (!isValid) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    const response = NextResponse.redirect(loginUrl);
    if (token) {
      clearSessionCookie(response);
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
