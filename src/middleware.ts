import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_HOSTS = ['airflowsystem.ir', 'www.airflowsystem.ir', 'localhost', '127.0.0.1'];

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer');

  if (referer) {
    try {
      const refererHost = new URL(referer).hostname;
      if (!ALLOWED_HOSTS.includes(refererHost)) {
        return new NextResponse(null, { status: 403 });
      }
    } catch {
      // Malformed referer header, allow through.
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/images/:path*',
};
