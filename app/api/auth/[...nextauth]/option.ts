import { User } from "@prisma/client";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usernameOrEmail: {
          label: "Username or Email",
          type: "text",
          placeholder: "jsmith or user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { usernameOrEmail, password } = credentials as any;
        try {
          const { data } = await axios.post(
            "http://localhost:3000/api/user/staff/login",
            {
              usernameOrEmail,
              password,
            }
          );
          return data.user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
        token.userName = (user as User).userName;
        token.role = (user as User).role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session && session.user) {
        session.user.id = token.uid as string;
        session.user.userName = token.userName as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
