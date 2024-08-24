import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hasTransactionsCookie = request.cookies.has('expense');

  // Check if the current route is `/expense-insights`
  if (url.pathname === '/expense-insights') {
    // If the cookie is not present, redirect to the home page
    if (!hasTransactionsCookie) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/expense'],
};
