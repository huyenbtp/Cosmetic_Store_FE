import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các route yêu cầu role cụ thể
const roleRoutes = {
  admin: ["/admin"],
  cashier: ["/cashier"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const role = req.cookies.get("auth_role")?.value;

  const { pathname } = req.nextUrl;

  // Nếu chưa đăng nhập
  if (!token) {
    if (pathname.startsWith("/login")) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Nếu vào "/admin" → tự redirect sang "/admin/dashboard"
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // ✅ Nếu vào "/cashier" → tự redirect sang "/cashier/dashboard"
  if (pathname === "/cashier") {
    return NextResponse.redirect(new URL("/cashier/dashboard", req.url));
  }
  
  // Nếu đăng nhập nhưng vào nhầm role
  if (role === "admin" && pathname.startsWith("/cashier")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (role === "cashier" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/cashier/dashboard", req.url));
  }

  // Nếu đã login và truy cập /login → chuyển sang dashboard đúng role
  if (pathname.startsWith("/login")) {
    const redirectUrl =
      role === "admin" ? "/admin/dashboard" : "/cashier/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các route
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
