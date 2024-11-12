
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./components/mtt/Api/helpers/verifyToken";


export async function middleware(req: NextRequest) {
  let token = await req.cookies.get("token")?.value;

  token = token ? token : "wrongtoken";

  let isLoggedIn = false;

  isLoggedIn = !!(await verifyToken (token));

  const publicRoutes = ["/"];
  const apiPrefix = "/api";
  const authRoutes = ["/signin", "/signup", "api/signout"];
  const DEFAULT_LOGIN_REDIRECT = "/dashboard";

  // Determine if the user is logged in

  const isApiRoute = req.nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  // Redirect logged-in users away from authentication routes
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  // Allow the request to continue if it's a public route or API route
  if (isPublicRoute || isApiRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/signin", req.url), 302);
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

          