// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/dashboard", "/profile", "/hasil", "/scan"];
const AUTH_ONLY = ["/login", "/register"];

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;
   const token = request.cookies.get("auth_token")?.value;
   const isLoggedIn = !!token;

   // Belum login → redirect ke login
   const needsAuth = PROTECTED.some((r) => pathname.startsWith(r));
   if (needsAuth && !isLoggedIn) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
   }

   // Sudah login → jangan bisa akses login/register lagi
   const isAuthPage = AUTH_ONLY.some((r) => pathname.startsWith(r));
   if (isAuthPage && isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/dashboard/:path*",
      "/profile/:path*",
      "/hasil/:path*",
      "/scan/:path*",
      "/login",
      "/register",
   ],
};
