import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('adminToken')?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/admin', '/cms', '/select-dashboard'];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password' ||
    pathname === '/';

  // If trying to access protected route without token, redirect to login
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and visiting an auth page or root, redirect to select-dashboard
  if (isAuthPage && token) {
    const dashboardUrl = new URL('/select-dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/cms/:path*',
    '/select-dashboard/:path*',
    '/select-dashboard',
    '/login',
    '/forgot-password',
    '/reset-password',
    '/',
  ],
};
