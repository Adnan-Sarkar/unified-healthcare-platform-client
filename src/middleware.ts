import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getFromLocalStorage } from "@/utils/local-storage";
import { decodedToken } from "@/utils/jwtHelpers";
import { cookies } from "next/headers";

const authRoutes = ["/login", "/adminLogin", "/registration"];
const adminRoutes = ["/dashboard/admin/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = cookies().get(
    process.env.NEXT_PUBLIC_AUTH_KEY as string
  )?.value;

  if (!token) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  try {
    const decode = decodedToken(token as string);
    const roles = decode?.roles as string[];

    const isValidToken = decode.exp && Date.now() <= decode.exp * 1000;

    if (!isValidToken) {
      const response = NextResponse.redirect(
        new URL(
          roles?.includes("admin") || roles?.includes("super_admin")
            ? "/adminLogin"
            : "/login",
          request.url
        )
      );
      response.cookies.delete(process.env.NEXT_PUBLIC_AUTH_KEY as string);
      return response;
    }

    // Check admin routes access
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      if (!roles.includes("admin") && !roles.includes("super_admin")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Prevent admin/super_admin from accessing non-admin routes
    if (
      !adminRoutes.some((route) => pathname.startsWith(route)) &&
      (roles.includes("admin") || roles.includes("super_admin"))
    ) {
      return NextResponse.redirect(
        new URL("/dashboard/admin/home", request.url)
      );
    }
  } catch (error: any) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
