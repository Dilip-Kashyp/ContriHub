import { NextResponse } from 'next/server'
import { PAGE_ROUTES, LOCAL_STORAGE_KEY } from '@/constants/common'

export function proxy(request) {
  const token = request.cookies.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN)?.value;
  const { pathname } = request.nextUrl;
  
  // Define route groups
  const authRoutes = [PAGE_ROUTES.LOGIN, PAGE_ROUTES.SIGNUP];
  const protectedRoutes = [PAGE_ROUTES.DASHBOARD, PAGE_ROUTES.PROFILE];

  // 1. If user is logged in and trying to access login/signup, Redirect to Dashboard
  if (token && authRoutes.some(route => pathname.startsWith(route))) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = PAGE_ROUTES.DASHBOARD;
    return NextResponse.redirect(dashboardUrl);
  }

  // 2. If user is NOT logged in and trying to access protected pages, Redirect to Login
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = PAGE_ROUTES.LOGIN;
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
}
