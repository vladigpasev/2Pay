import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.cookies.has('token')) return NextResponse.next();
  return NextResponse.redirect(new URL(`/auth/signin?redirectPath=${request.nextUrl.pathname}`, request.url));
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/user/:path*', '/verify/sent']
};
