import { NextRequest, NextResponse } from 'next/server';
import { domain } from './domain';

// This middleware runs on Vercel Edge Network (FREE - no function duration charges)
export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';

    // Only handle redirects for non-Facebook crawlers
    if (!userAgent.includes('facebook') && !userAgent.includes('facebookexternalhit')) {
        const { pathname } = request.nextUrl;

        // For index page
        if (pathname === '/') {
            return NextResponse.redirect(domain, 302);
        }

        // For slug pages (format: /p-slug-123)
        if (pathname.startsWith('/p-')) {
            const redirectUrl = `${domain}${pathname}`;
            return NextResponse.redirect(redirectUrl, 302);
        }
    }

    // Let Facebook crawlers continue to the page (to get metadata)
    return NextResponse.next();
}

// Configure which routes should run through middleware
export const config = {
    matcher: [
        '/',
        '/p-:slug*',
        '/((?!_next|api|favicon.ico).*)',
    ],
};
