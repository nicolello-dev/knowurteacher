import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user);
            try {
                await prisma.user.create({
                    data: {
                        username: user.name || "",
                        email: user.email || "",
                    }
                });
                return true;
            } catch (err)  {
                if(await prisma.user.findFirst({ where: {
                    username: user.name || "",
                    email: user.email || ""
                }}) !== null) {
                    return true
                }
                console.error(err);
                return false;
            }
        }
    },
    secret: process.env.JWT_SECRET
})