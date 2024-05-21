import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const userToken = request.cookies.get("token")?.value || "";
  const protectedRoutes = "/dashboard";
  if (path.startsWith(protectedRoutes) && !userToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
