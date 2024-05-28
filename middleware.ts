import { JWT, getToken } from 'next-auth/jwt';
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
  
  const jwt = await getToken({ req: req, secret: process.env.NEXT_SECRET }) as any;
  let token: string = '';
  if (jwt?.accessToken) {
    token = jwt["accessToken"]
  }
  
  if (!token && req.nextUrl.pathname.startsWith('/cards')) {
    return Response.redirect(new URL('/en/error/access', req.url))
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'
 
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}