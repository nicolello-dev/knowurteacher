import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/prisma/prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await prisma.user.create({
          data: {
            username: user.name || "",
            email: user.email || "",
          },
        });
        return true;
      } catch (err) {
        if (
          (await prisma.user.findFirst({
            where: {
              username: user.name || "",
              email: user.email || "",
            },
          })) !== null
        ) {
          return true;
        }
        console.error(err);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
