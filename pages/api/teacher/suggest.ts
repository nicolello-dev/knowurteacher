import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/prisma/prisma";
import { TeacherPayload } from "@prisma/client";
import { APIResponse } from "@/types/api";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
    }
}

type TeacherSuggestion = {
    name: string,
    school: string
}

export default async function suggestTeachers(req: APIRequest, res: NextApiResponse<APIResponse<TeacherSuggestion[]>>) {

    if (req.method !== "GET") {
        res.status(405).json({
            success: false,
            data: null,
            message: "Invalid method, use GET only."
        })
    }

    const nameInput: string | undefined = req.query.name;
    if (nameInput == undefined) {
        res.status(200).json({
            success: false,
            data: null,
            message: "Name is invalid! Please try again."
        });
        return;
    }
    try {
        const teachers: TeacherSuggestion[] = await prisma.$queryRaw`SELECT name, school FROM public."Teacher" t WHERE LOWER(t.name) ILIKE ${`%${nameInput}%`} LIMIT 5;`;

        res.status(200).json({
            success: true,
            data: teachers,
            message: "Successfully retrieved matching teachers."
        });
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: null,
            message: "Something unexpected happened, please try again."
        })
    }
}