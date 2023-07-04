import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
    }
}

export default async function suggestTeachers(req: APIRequest, res: NextApiResponse) {

    if(req.method !== "GET") {
        res.status(405).json({"success": false, "error": "Invalid method used. Please use GET only."})
    }

    const nameInput: string | undefined = req.query.name;
    if(nameInput != undefined && nameInput.length < 3) {
        res.status(200).json([]);
        return;
    }
    const prisma = new PrismaClient();
    const teachers =  await prisma.teacher.findMany({
        where: {
            name: {
                startsWith: nameInput,
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