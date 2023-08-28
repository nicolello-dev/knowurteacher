import type { NextApiRequest, NextApiResponse } from "next";

import type { APIResponse } from "@/types/api";

import prisma from "@/prisma/prisma";
import type { Review } from "@prisma/client";

interface APIRequest extends NextApiRequest {
    query: {
        teacherID: string | undefined;
    }
}

export default async function suggestTeachers(req: APIRequest, res: NextApiResponse<APIResponse<Review[]>>) {

    if (req.method !== "GET") {
        res.status(405).json({
            success: false,
            data: null,
            error: "Invalid method! Please use GET for this request."
        });
    }

    const { teacherID } = req.query;

    if (teacherID == undefined) {
        res.status(400).json({
            success: false,
            data: null,
            error: "TeacherID is undefined. Please request a valid teacher ID."
        });
        return;
    }

    const reviews = await prisma.review.findMany({
        where: {
            teacherID: {
                equals: req.query.teacherID
            }
        }
    });

    res.status(200).json({
        success: true,
        data: reviews,
        error: null
    });
    return;
}