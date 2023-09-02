import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { oAuthDbClient } from "@/database/dbClients";


declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}


export default NextAuth({

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    // adicionar mas providers
    Credentials({
      name: 'Login personalizado',
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "correo@correo.com" },
        password: { label: "Contraseña", type: "password", placeholder: "Contraseña" },
      },
      async authorize(credentials) {


        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    newUser: 'auth/create-account'
  },
  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user }) {

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {

          case 'oauth':
            await oAuthDbClient(user.email || '', user.name || '');
            break;

          case 'credentials':
            token.user = user
            break;

          default:
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token.accessToken && token.user) {
        session.accessToken = token.accessToken as string;
        session.user = token.user as any;
      }
      return session;
    }
  }
});



