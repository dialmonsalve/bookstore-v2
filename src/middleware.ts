import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TypeRole } from './types';

export async function middleware(req: NextRequest) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  const isAdmin = (session?.role as TypeRole[])?.includes("admin");

  if (!session) {

    if (requestedPage.startsWith('/admin/users')) {
      url.pathname = "/";
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }
  }

  if (!isAdmin) {
    if (requestedPage.startsWith('/admin/users')) {

      if(session?.username){
        url.pathname = "/bookstore";
      }else{

        url.pathname = "/";
      }
      return NextResponse.redirect(url);
    }
  }

  if(!session?.username){
    if (requestedPage.startsWith('/bookstore')) {
        url.pathname = "/";      
      return NextResponse.redirect(url);
    }

  }

}

// export const config = {
//   // matcher: []
// }