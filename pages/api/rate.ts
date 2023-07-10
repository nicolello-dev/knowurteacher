import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next"
import authOptions from "./auth/[...nextauth]"

interface APIRequest extends NextApiRequest {
    query: {
        email: string | undefined;
        name: string | undefined;
        school: string | undefined;
        strictness: string | undefined;
        communication: string | undefined;
        engagement: string | undefined;
        feedbackQuality: string | undefined;
        flexibility: string | undefined;
    }
}

export default async function rateTeacher(req: APIRequest, res: NextApiResponse) {

    if(req.method !== "POST") {
        res.status(405).json({ "success": false, "message": "Invalid method! POST only"});
    }

    const session = await getServerSession(req, res, authOptions);
    if(!session) {
        res.status(401).json({ 'success': false, 'message': "Not authenticated. Please sign in and try again." });
    }

    let { email, name, school, labels } = JSON.parse(req.body);

    email = email || undefined;
    name = name || undefined
    school = school || undefined;
    labels = labels?.length ? labels : undefined;

    if(email == undefined || name == undefined || school == undefined || labels == undefined) {
        res.status(400).json({ 'success': false, 'message': 'Something was not defined' });
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
                    labels: labels
                }
            });
        } catch(err) {
            await prisma.review.update({
                where: {
                    authorID_teacherID: {
                        authorID: user.id,
                        teacherID: teacher.id
                    }
                },
                data: {
                    labels
                }
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'success': false, 'message': 'Unknown error; you likely already wrote a review for the teacher'});
        return;
    }
    res.status(200).json({ 'success': true });
    return;
}