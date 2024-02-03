import { staffFormSchema } from "@/lib/zodSchemas";
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
            `${process.env.API}/user/staff/login`,
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
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session && session.user) {
        const { user }: { [key: string]: any } = token;
        session.user = {
          ...session.user,
          name: `${user.staffDetails.firstName} ${user.staffDetails.lastName}`,
          image: user.staffDetails.imgUrl,
          ...user,
        };
      }
      return session;
    },
  },
};
