import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/prisma/prisma";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
    }
}

export default async function suggestTeachers(req: APIRequest, res: NextApiResponse) {

    if(req.method !== "GET") {
        res.status(405).json({"success": false, "message": "Invalid method used. Please use GET only."})
    }

    const nameInput: string | undefined = req.query.name;
    if(nameInput == undefined || nameInput.length < 3) {
        res.status(200).json([]);
        return;
    }
    const teachers =  await prisma.teacher.findMany({
        where: {
            name: {
                contains: nameInput,
                mode: 'insensitive'
            }
        },
        select: {
            name: true,
            school: true
        },
        take: 5
    })
    res.status(200).json(teachers);
    return;
}