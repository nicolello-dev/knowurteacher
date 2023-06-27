import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
        startIndex: string | undefined;
    }
}

export default async function suggestTeacher(req: APIRequest, res: NextApiResponse) {
    const nameInput: string | undefined = req.query.name;
    const startIndex: number = parseInt(req.query.startIndex || '0');

    if(nameInput == undefined || nameInput.length < 3 || startIndex == undefined || startIndex < 0) {
        res.status(400).json([]);
        return;
    }

    const prisma = new PrismaClient();
    const teachers = await prisma.teacher.findMany({
        where: {
            name: {
                startsWith: nameInput,
                mode: 'insensitive'
            }
        },
        orderBy: {
            id: 'asc'
        },
        skip: startIndex,
        take: 5
    });

    res.status(200).json(teachers);
    return;
}