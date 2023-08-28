import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next"
import authOptions from "./auth/[...nextauth]"

import type { APIResponse } from "@/types/api";

interface APIRequest extends NextApiRequest {
    query: {
        email: string | undefined;
        name: string | undefined;
        school: string | undefined;
        teaching: string | undefined;
        fairness: string | undefined;
        general: string | undefined;
    }
}

export default async function rateTeacher(req: APIRequest, res: APIResponse<null>) {

    if(req.method !== "POST") {
        res.status(405).json({ "success": false, "message": "Invalid method! POST only"});
    }

    const session = await getServerSession(req, res, authOptions);
    if(!session) {
        res.status(401).json({ 'success': false, 'message': "Not authenticated. Please sign in and try again." });
    }

    let { email, name, school, teaching, fairness, general } = JSON.parse(req.body);
    
    if([email, name, school, teaching, fairness, general].some(e => e == undefined)) {
        res.status(400).json({
            success: false,
            data: null,
            error: "Something was undefined! Please check that you filled in everything and retry."
        });
        return;
    }
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            },
            select: {
                id: true
            }
        });
        const teacher = await prisma.teacher.findUniqueOrThrow({
            where: {
                name_school: { name, school }
            },
            select: {
                id: true
            }
        });
        try {
            await prisma.review.create({
                data: {
                    author: { connect: { id: user.id } },
                    teacher: { connect: { id: teacher.id } },
                    teaching,
                    fairness,
                    general
                }
            });
        } catch(err) { // If such a review already exists
            await prisma.review.update({
                where: {
                    authorID_teacherID: {
                        authorID: user.id,
                        teacherID: teacher.id
                    }
                },
                data: {
                    teaching,
                    fairness,
                    general
                }
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: null,
            error: "Something unexpected happened! Please try again."
        })
        return;
    }
    res.status(200).json({
        success: true,
        data: null,
        error: null
    });
    return;
}