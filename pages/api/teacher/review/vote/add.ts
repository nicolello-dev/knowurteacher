import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/prisma";
import { APIResponse } from "@/types/api";
import { voteType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function Handler(req: NextApiRequest, res: NextApiResponse<APIResponse<null>>) {
    if(req.method !== "POST") {
        res.status(403).json({
            success: false,
            data: null,
            message: "Method not allowed"
        });
        return;
    }

    const { type, commentId } = JSON.parse(req.body);

    if(type !== "up" && type !== "down" || typeof commentId !== "string") {
        res.status(400).json({
            success: false,
            data: null,
            message: "Invalid data sent! Sent: " + req.body
        });
        return;
    }

    const session = await getServerSession(req, res, authOptions);

    try {
        if(!session?.user?.email) {
            console.error("Not logged in!")
            throw new Error("Not logged in!");
        }
        try {
            await prisma.user.update({
                where: {
                    email: session.user.email
                },
                data: {
                    votes: {
                        create: {
                            reviewId: commentId,
                            type: type as voteType
                        }
                    }
                }
            });
        } catch (err) {
            const user = await prisma.user.findFirst({
                where: {
                    email: session.user.email
                },
                select: {
                    id: true
                }
            });
            if(!user) {
                throw new Error("User not found!");
            }
            await prisma.user.update({
                where: {
                    email: session.user.email
                },
                data: {
                    votes: {
                        update: {
                            where: {
                                reviewId_userId: {
                                    reviewId: commentId,
                                    userId: user.id
                                }
                            },
                            data: {
                                type
                            }
                        }
                    }
                }
            })
        }

        res.status(200).json({
            success: true,
            data: null,
            message: null
        });
        return;
    } catch(err) {
        res.status(500).json({
            success: false,
            data: null,
            message: "An unexpected error occurred. Check logs please."
        });
    }
}