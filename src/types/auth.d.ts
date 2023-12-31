import { Session } from 'next-auth';
import { TypeRole } from '.';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      lastName?: string | null;
      phone?: string | null;
      role?: TypeRole[],
      username?:string
    };
    accessToken?: string;
  }
}

