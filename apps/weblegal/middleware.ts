import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple middleware to guard /portal/* server-side routes.
// Requires either a valid session cookie (cbp_user) or header x-cbp-ai-secret (team shared secret) — adapt to real auth later.

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Only guard portal paths
  if (!pathname.startsWith('/portal')) return NextResponse.next();

  // Allow if server-side has a trusted header (for automation)
  const secret = req.headers.get('x-cbp-ai-secret');
  if (secret && process.env.AI_PROXY_SECRET && secret === process.env.AI_PROXY_SECRET) {
    return NextResponse.next();
  }

  // Check for client-side session cookie (mocked cbp_user)
  const cookie = req.cookies.get('cbp_user');
  if (cookie) {
    return NextResponse.next();
  }

  // Otherwise redirect to login page
  url.pathname = '/auth/login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/portal/:path*']
};
