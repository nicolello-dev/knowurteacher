import prisma from "@/prisma/prisma";
import { APIResponse } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";

type Request = NextApiRequest & {
    query: {
        reviewId: string | undefined;
    }
}

export default async function Handler(req: Request, res: NextApiResponse<APIResponse<number>>) {

    const { reviewId } = req.query;

    try {
        const positives = await prisma.vote.count({
            where: {
                reviewId,
                type: 'up'
            }
        });
        const negatives = await prisma.vote.count({
            where: {
                reviewId,
                type: 'down'
            }
        })
        res.status(200).json({
            success: true,
            data: positives - negatives,
            message: null
        })
    } catch (err: any) {
        return res.status(200).json({
            success: false,
            data: 0,
            message: err.message
        })
    }
}