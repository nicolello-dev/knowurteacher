import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

import { APIResponse } from "@/types/api";
import { Teacher } from "@prisma/client";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined,
        school: string | undefined
    }
}

export default async function findTeacher(req: APIRequest, res: NextApiResponse<APIResponse<Teacher>>) {

    if (req.method !== "GET") {
        res.status(405).json({
            success: false,
            data: null,
            message: "Wrong method. Please only use GET requests for this route."
        });
    }

    const nameInput: string | null = req.query.name || null;
    const schoolInput: string | null = req.query.school || null;
    if (nameInput == null || nameInput.length < 3 || schoolInput == null) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Input either inexistent or invalid. Please check you've compiled correctly all parts."
        });
        return;
    }
    const teacher = await prisma.teacher.findFirst({
        where: {
            name: {
                equals: nameInput
            },
            school: {
                equals: schoolInput
            }
        }
    });
    res.status(200).json({
        success: true,
        data: teacher,
        message: null
    });
    return;
}