import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
        school: string | undefined;
    }
}

export default async function suggestTeacher(req: APIRequest, res: NextApiResponse) {
    let { name, school } = req.query;
    if(name == '') {
        name = undefined;
    }
    if(school == '') {
        school = undefined;
    }
    if(name == undefined) {
        res.status(400).json({ 'success': false, 'error': 'Name is undefined' });
        return;
    }
    const prisma = new PrismaClient();
    try {
        await prisma.teacher.create({
            data: {
                name: name,
                school: school
            }
        });
    } catch (err) {
        res.status(500).json({ 'success': false, 'error': 'Unknown error; likely the teacher already exists'});
        return;
    }
    res.status(200).json({ 'success': true });
    return;
}