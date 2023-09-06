import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { checkEmailPassword, oAuthDbClient } from "@/database/dbUser";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
    }),
    // adicionar mas providers
    Credentials({
      name: 'Login personalizado',
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "correo@correo.com" },
        password: { label: "Contraseña", type: "password", placeholder: "Contraseña" },
        username: { label: "username", type: "text", placeholder: "Username" },
      },
      async authorize(credentials): Promise<any> {
        const validateField = credentials!.email || credentials!.username;

        if (!validateField) {
          throw new Error('Las credenciales son obligatorias');
        }
        return await checkEmailPassword(validateField, credentials!.password, !!credentials!.username);
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
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, user }) {

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {

          case 'oauth':
            await oAuthDbClient(user.email || '', user.name || '', user.image || '');

            break;

          case 'credentials':

            token = {
              name: user.name,
              email: user.email,
              picture: user.image,
              sub: token.sub,
              accessToken: token.accessToken,
              username: user.username
            }
            break;
          default:
            break;
        }
      }

      return token;
    },
    async session({ session, token }) {

      session.accessToken = token.accessToken as string;
      session.user = token;
      return session;
    }
  }
});



