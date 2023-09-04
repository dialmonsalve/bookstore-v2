import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { checkClientEmailPassword, oAuthDbClient, checkStaffEmailPassword } from "@/database/dbClients";



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

        if(credentials!.email){
          return await checkClientEmailPassword(credentials!.email, credentials!.password)
        }else{
          return await checkStaffEmailPassword(credentials!.username, credentials!.password)
        }
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
            console.log(user);

            await oAuthDbClient(user.email || '', user.name || '', user.image || '');
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

      session.accessToken = token.accessToken as string;
      if (token.user) {
        session.user = token.user ;
      } else {
        session.user = {
          name: token.name,
          email: token.email,
          image: token.picture,
        }
      }

      return session;
    }
  }
});



