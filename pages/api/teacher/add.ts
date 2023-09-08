import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

import { APIResponse } from "@/types/api";

import { getServerSession } from "next-auth/next"
import authOptions from "@/pages/api/auth/[...nextauth]"

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
        school: string | undefined;
    }
}

export default async function addTeacher(req: APIRequest, res: NextApiResponse<APIResponse>) {
    if(req.method != "POST") {
        res.status(405).json({
            success: false,
            data: null,
            message: "Wrong method! Please only use POST methods for this route."
        });
        return;
    }

    const session = await getServerSession(req, res, authOptions);
    if(!session) {
        res.status(401).json({
            success: false,
            data: null,
            message: "Not authenticated. Please sign in and retry."
        });
        return;
    }

    const { name, school } = JSON.parse(req.body)

    if(name == undefined || name == "" || school == undefined || school.length == 0) {
        res.status(400).json({
            success: false,
            data: null,
            message: "The data passed is invalid or inexistent. Please try again."
        });
        return;
    }
    try {
        await prisma.teacher.create({
            data: {
                name: name,
                school: school
            }
        });
        res.status(200).json({
            success: true,
            data: null,
            message: null
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: "An unexpected error occurred (likely the teacher already exists). If that isn't the case, please contact support."
        });
        return;
    }
}