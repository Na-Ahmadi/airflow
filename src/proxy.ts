import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const ALLOWED_HOSTS = [
  'airflowsystem.ir',
  'www.airflowsystem.ir',
  'airflow-chi.vercel.app',
  'localhost',
  '127.0.0.1',
];

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/images/')) {
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

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/images/:path*'],
};
