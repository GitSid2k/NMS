import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Разрешить доступ к странице логина без токена
        if (req.nextUrl.pathname === "/admin/login") {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
