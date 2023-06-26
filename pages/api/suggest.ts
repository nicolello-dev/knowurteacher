import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
    }
}

export default async function suggestTeacher(req: APIRequest, res: NextApiResponse) {
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
        }
    })
    res.status(200).json(teachers);
    return;
}