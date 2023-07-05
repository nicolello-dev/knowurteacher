import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/prisma/prisma";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
        startIndex: string | undefined;
        school: string | undefined;
    }
}

export default async function getTeachersFromName(req: APIRequest, res: NextApiResponse) {

    if(req.method !== "GET") {
        res.status(405).json({ 'success': false, 'message': 'Invalid method, GET only allowed.' })
    }

    const nameInput: string | undefined = req.query.name;
    const schoolInput: string | undefined = req.query.school;
    const startIndex: number = parseInt(req.query.startIndex || '0');

    if(nameInput == undefined || nameInput.length < 3 || startIndex == undefined || startIndex < 0) {
        res.status(400).json([]);
        return;
    }

    let teachers;
    let count;
    if(schoolInput == "") {
        teachers = await prisma.teacher.findMany({
            where: {
                name: {
                    contains: nameInput,
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