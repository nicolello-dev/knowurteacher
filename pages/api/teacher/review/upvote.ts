import { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "@/types/api";
import prisma from "@/prisma/prisma";

type Request = NextApiRequest & {
    body: {
        id: string
    }
}

export default async function Handler(req: Request, res: NextApiResponse<APIResponse<string>>) {
    if(req.method != "POST") {
        res.status(405).json({
            success: false,
            data: null,
            error: "Wrong method! Please use POST requests for this."
        })
    }

    const { id } = JSON.parse(req.body);

    if(!id) {
        res.status(400).json({
            success: false,
            data: null,
            error: "ID is undefined. Please try again or contact support."
        })
    }

    await prisma.review.update({
        where: {
            id
        },
        data: {
            points: {
                increment: 1
            }
        }
    });

    res.status(200).json({
        success: true,
        data: null,
        error: null
    })
}