import { NextResponse } from 'next/server';

export function middleware(request) {
  // Ensure CORS headers are set for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}; 