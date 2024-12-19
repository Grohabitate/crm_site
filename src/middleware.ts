import { ClerkMiddlewareAuth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoutes = createRouteMatcher([
  '/site',
  '/api/uploadthing',
  '/agency/sign-in(.*)',
  '/agency/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect non-public routes
  if (!isPublicRoutes(req)) await auth.protect();

  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();

  // Get the hostname from the headers
  const hostname = req.headers.get('host');
  if (!hostname) {
    console.error('Host header is missing');
    return NextResponse.next();
  }

  // Build the path with query parameters
  const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // Extract custom subdomain
  let customSubDomain: string | undefined;

  // Handle localhost without subdomains
  if (hostname.startsWith('localhost')) {
    customSubDomain = undefined;
  } else {
    customSubDomain = hostname
      .split(`${process.env.NEXT_PUBLIC_CLERK_SUBDOMAIN}.`)
      .filter(Boolean)[0];
  }

  if (customSubDomain) {
    try {
      // Construct a fully qualified URL
      const rewriteUrl = `/${customSubDomain}${pathWithSearchParams}`;
      return NextResponse.rewrite(new URL(rewriteUrl));
    } catch (err) {
      console.error('Error rewriting URL:', err);
      return NextResponse.next();
    }
  }

  if(url.pathname === '/sign-in' || url.pathname === '/sign-up') 
    {
    return NextResponse.redirect(new URL('/agency/sign-in', req.url))
  }

  if (url.pathname === '/' || url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN) 
    {
    return NextResponse.rewrite(new URL('/site', req.url))
  }

  if (url.pathname.startsWith('/agency') ||
    url.pathname.startsWith('/subaccount')
 )
    {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
  }



  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip static files and Next.js internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Match API routes and app routes
    '/(api|trpc|site)(.*)',
  ],
};

