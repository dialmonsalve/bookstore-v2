import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      lastName?: string | null;
      phone?: string | null;
      
    };
    accessToken?: string;
  }
}

