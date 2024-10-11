// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Protect all routes under /admin
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Allow requests to NextAuth endpoints
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    // If user is authenticated and isAdmin, allow access
    if (req.nextauth.token && req.nextauth.token.isAdmin) {
      return NextResponse.next();
    }

    // Redirect to sign-in page if not authenticated or not admin
    const signInUrl = new URL("/api/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow if token exists and user is admin
        return !!token && !!token.isAdmin;
      },
    },
  }
);

// Define the routes to apply the middleware
export const config = {
  matcher: ["/admin/:path*"],
};
