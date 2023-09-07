import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();  

  
  

  if (!session) {

    if (requestedPage.startsWith('/admin/store')) {
      url.pathname = "/";
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }
  }

  if (!session?.username) {
    if (requestedPage.startsWith('/admin')) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (session?.username) {
    if (requestedPage.startsWith('/auth/configuration')) {
      url.pathname = '/admin/store'
      return NextResponse.redirect(url)
    }
  }
}

// export const config = {
//   // matcher: []
// }