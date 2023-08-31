import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";
import { APIResponse } from "@/types/api";

interface APIRequest extends NextApiRequest {
    query: {
        email: string;
    }
}

export default async function suggestTeachers(req: APIRequest, res: NextApiResponse<APIResponse<string>>) {

    if(req.method !== "GET") {
        res.status(405).json({
            success: false,
            data: null,
            message: "Incorrect method used. Please use a GET request."
        });
        return;
    }

    const email: string | null = req.query.email || null;
    if(!email) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Email undefined, please try again."
        })
        return;
    }
    try {
        const user =  await prisma.user.findUniqueOrThrow({
            where: {
                email
            },
            select: {
                id: true
            }
        });
    
        res.status(200).json({
            success: true,
            data: user.id,
            message: "Successfully retrieved the ID."
        });
        return;
        
    } catch(err) {
        res.status(500).json({
            success: false,
            data: null,
            message: "An unknown error occurred, likely the email isn't associated to any account. Please try again."
        });
    }
    
}