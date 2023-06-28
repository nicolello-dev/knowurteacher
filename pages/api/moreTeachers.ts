import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
        startIndex: string | undefined;
        school: string | undefined;
    }
}

export default async function suggestTeacher(req: APIRequest, res: NextApiResponse) {
    const nameInput: string | undefined = req.query.name;
    const schoolInput: string | undefined = req.query.school;
    const startIndex: number = parseInt(req.query.startIndex || '0');

    if(nameInput == undefined || nameInput.length < 3 || startIndex == undefined || startIndex < 0) {
        res.status(400).json([]);
        return;
    }

    const prisma = new PrismaClient();
    let teachers;
    let count;
    if(schoolInput == "") {
        teachers = await prisma.teacher.findMany({
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
        count = await prisma.teacher.count({
            where: {
                name: {
                    startsWith: nameInput,
                    mode: 'insensitive'
                }
            }
        });
    } else {
        teachers = await prisma.teacher.findMany({
            where: {
                name: {
                    startsWith: nameInput,
                    mode: 'insensitive'
                },
                school: {
                    startsWith: schoolInput,
                    mode: "insensitive"
                }
            },
            orderBy: {
                id: 'asc'
            },
            skip: startIndex,
            take: 5
        });
        count = await prisma.teacher.count({
            where: {
                name: {
                    startsWith: nameInput,
                    mode: 'insensitive'
                },
                school: {
                    startsWith: schoolInput,
                    mode: "insensitive"
                }
            }
        });
    }

    res.status(200).json({'teachers': teachers, 'count': count});
    return;
}