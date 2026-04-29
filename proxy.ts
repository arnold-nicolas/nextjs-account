// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import envConfig from '@/app/lib/server/config';
import { jwtVerify } from 'jose';
import { decrypt, getSessionId } from '@/app/lib/server/session';

const encodedKey = new TextEncoder().encode(envConfig.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = (pathname === '/' || pathname === '/signup');
  const isProtectedPage = pathname.startsWith('/profile');

  let isValid = false;

  const id = await getSessionId();
  console.log('proxy');
  console.log(id);

  isValid = id ? true : false;
  // Logged-in user trying to access login page
  if (isValid && isAuthPage) {
    return NextResponse.redirect(new URL(`/${id}/profile`, request.url));
  }

  // Not logged-in user trying to access protected page
  if (!isValid && isProtectedPage) {
    return NextResponse.redirect(new URL(pathname, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup'], // apply only to landing page (or expand this)
}