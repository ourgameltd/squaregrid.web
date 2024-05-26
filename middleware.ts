import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server'
 
const PUBLIC_FILE = /\.(.*)$/
 
export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }
  
  const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');

  console.log(token);
  
  if (!token && req.nextUrl.pathname.startsWith('/account')) {
    return Response.redirect(new URL('/en/error/access', req.url))
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'
 
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}