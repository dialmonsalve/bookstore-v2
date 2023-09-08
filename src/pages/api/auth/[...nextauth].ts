import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { checkEmailPassword, oAuthDbClient } from "@/database/dbUser";
import { IEmployee } from "@/types";


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
            const { 
              username, 
              _id, 
              role } = await oAuthDbClient(user.email || '', user.name || '', user.image || '') as IEmployee;

            if (username) {
              token.username = username;
              token.rol = role
            }
            if (_id) {
              token._id = _id;
            }

            break;

          case 'credentials':
            token = {
              ...user,
              iat: token.iat,
              exp: token.exp,
              jti: token.jti,
            };
            break;

          default:
            break;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      if (token.username) {
        session.user.username = token?.username as string;
      }
      if (token._id) {
        session.user._id = token._id as any;
      }

      if (token.user) {
        session.user = token.user as IEmployee;
      }    

      return session;
    }
  }
});



