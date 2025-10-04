import { NextRequest, NextResponse } from "next/server";
import { adminRoutes, authRoutes, publicRoutes, userRoutes } from "../route";
import { getToken } from "next-auth/jwt";


const roleBasedRoutes: Record<string, string[]> = {
    Admin: adminRoutes,
    User: userRoutes,
};

const isAuthRoute = (path: string) => {
    return authRoutes.some((route) => path === route);
};

const isPublicRoute = (path: string) => {
    return publicRoutes.some((route) => path === route);
};


const isAllowedRoute = (path: string, allowedRoutes: string[]) => {
    return allowedRoutes.some((route) => {
      
      if (route === path) return true;
      
      
      if (route.includes(':')) {
        const routeParts = route.split('/');
        const pathParts = path.split('/');
        
        if (routeParts.length !== pathParts.length) return false;
        
        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(':')) continue;
          if (routeParts[i] !== pathParts[i]) return false;
        }
        
        return true;
      }
      
      return false;
    });
};

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
  
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".") ||
      pathname === "/not-found" ||
      pathname === "/404"
    ) {
      return NextResponse.next();
    }
  
    const isAuth = isAuthRoute(pathname);
  
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  
    if (isAuth) {
        if (token) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }
  
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }
  
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("error", "unauthenticated");
      return NextResponse.redirect(url);
    }
  
    const userRole = token.role as string | undefined;
    const allowedRoutes = roleBasedRoutes[userRole || ""] || [];
  
    if (!isAllowedRoute(pathname, allowedRoutes)) {
      const url = new URL("/", req.url);
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  
    return NextResponse.next();
}

export const config = {
    matcher: [
      "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};