import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

interface APIRequest extends NextApiRequest {
    query: {
        email: string;
    }
}

export default async function suggestTeachers(req: APIRequest, res: NextApiResponse) {

    if(req.method !== "GET") {
        res.status(405).json({"success": false, "message": "Invalid method used. Please use GET only."})
    }

    const email: string | null = req.query.email || null;
    if(!email) {
        res.status(400).json([]);
        return;
    }

    const user =  await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true
        }
    });

    res.status(200).json(user);
    return;
}