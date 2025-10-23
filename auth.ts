import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from "./db/mongoose";
import { User } from "./model/user";
import bcrypt from 'bcryptjs';

export const config = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await connectMongo();
        if (!credentials?.email) {
          return null;
        }
        const userData = await User.findOne({ email: credentials.email });

        if (userData) {
          const isPasswordValid = await bcrypt.compare(credentials.password, userData.password);
          if (isPasswordValid) {
            return { email: userData.email, id: userData.id };
          } else return null
        }
        return null;
      },
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      
      if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.picture,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}`;
    },
  },
  pages: {
    signIn: '/auth/signin'
  }
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}