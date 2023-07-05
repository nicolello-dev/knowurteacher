import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined,
        school: string | undefined
    }
}

export default async function suggestTeachers(req: APIRequest, res: NextApiResponse) {

    if(req.method !== "GET") {
        res.status(405).json({"success": false, "message": "Invalid method used. Please use GET only."})
    }

    const nameInput: string | null = req.query.name || null;
    const schoolInput: string | null = req.query.school || null;
    if(nameInput == null || nameInput.length < 3 || schoolInput == null) {
        res.status(400).json([]);
        return;
    }
    const teacher =  await prisma.teacher.findFirst({
        where: {
            name: {
                equals: nameInput
            },
            school: {
                equals: schoolInput
            }
        }
    });
    res.status(200).json(teacher || null);
    return;
}