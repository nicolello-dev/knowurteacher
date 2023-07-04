import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface APIRequest extends NextApiRequest {
    query: {
        teacherID: string | undefined;
    }
}

export default async function suggestTeachers(req: APIRequest, res: NextApiResponse) {

    if(req.method !== "GET") {
        res.status(405).json({"success": false, "error": "Invalid method used. Please use GET only."})
    }

    const { teacherID } = req.query;
    if(teacherID == undefined) {
        res.status(400).json([]);
        return;
    }
    const prisma = new PrismaClient();
    const reviews =  await prisma.review.findMany({
        where: {
            teacherID: {
                equals: req.query.teacherID
            }
        }
    });
    res.status(200).json(reviews || []);
    return;
}