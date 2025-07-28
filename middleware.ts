import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Temporarily disabled middleware to fix loading issues
export async function middleware(request: NextRequest) {
  // Allow all requests to pass through without authentication
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
