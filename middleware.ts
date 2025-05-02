import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")
  const isAuthenticated = !!authCookie

  // Proteger la ruta /dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirigir a dashboard si ya está autenticado e intenta acceder a login
  if ((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/admin-access") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/admin-access"],
}
