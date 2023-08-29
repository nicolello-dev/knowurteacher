import { APIResponse } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/prisma";

interface Request extends NextApiRequest {
    body: {
        teaching: string,
        fairness: string,
        general: string,
        teacherId: string
    }
}

export default async function Handler(req: Request, res: NextApiResponse<APIResponse>) {

    if(req.method != "POST") {
        res.status(405).json({
            success: false,
            data: null,
            error: "Method not allowed. Please make a POST request instead."
        })
    }

    const session = await getServerSession(req, res, authOptions);

    if(!session) {
        res.status(401).json({
            success: false,
            data: null,
            error: "Invalid credentials. Sign in and try again."
        });
        console.log("Invalid credentials");
        return
    }
    
    const { teaching, fairness, general, teacherId } = req.body;

    try {
        await prisma.user.update({
            where: {
                email: session.user?.email || undefined
            },
            data: {
                Reviews: {
                    create: {
                        teaching,
                        fairness,
                        general,
                        teacherID: teacherId
                    }
                }
            }
        })
        res.status(200).json({
            success: true,
            data: null,
            error: null
        });
        console.log("Success adding a review!");
    } catch(err) {
        console.error(err);
        res.status(400).json({
            success: false,
            data: null,
            error: "Teacher or user not found. This error should not have happened, please try again or contact support."
        });
        return;
    }
}