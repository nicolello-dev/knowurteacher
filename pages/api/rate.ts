import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

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

export default async function suggestTeacher(req: APIRequest, res: NextApiResponse) {

    let { email, name, school, strictness, communication, engagement, feedbackQuality, flexibility } = req.query;

    email = email || undefined;
    name = name || undefined
    school = school || undefined;
    strictness = strictness || undefined;
    communication = communication || undefined;
    engagement = engagement || undefined;
    feedbackQuality = feedbackQuality || undefined;
    flexibility = flexibility || undefined;

    if(email == undefined || name == undefined || school == undefined || strictness == undefined || communication == undefined || engagement == undefined || feedbackQuality == undefined || flexibility == undefined) {
        res.status(400).json({ 'success': false, 'error': 'Something was not defined' });
        return;
    }

    const prisma = new PrismaClient();
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
        await prisma.review.create({
            data: {
                author: { connect: { id: user.id } },
                teacher: { connect: { id: teacher.id } },
                strictness: parseInt(strictness),
                communication: parseInt(communication),
                engagement: parseInt(engagement),
                feedbackQuality: parseInt(feedbackQuality),
                flexibility: parseInt(flexibility)
            }
        });
    } catch (err) {
        res.status(500).json({ 'success': false, 'error': 'Unknown error; likely the user or teacher specified doesn\'t exist'});
        return;
    }
    res.status(200).json({ 'success': true });
    return;
}