import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

import { getServerSession } from "next-auth/next"
import authOptions from "./auth/[...nextauth]"

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
        school: string | undefined;
    }
}

export default async function addTeacher(req: APIRequest, res: NextApiResponse) {
    if(req.method != "POST") {
        res.status(405).json({ 'success': false, 'message': 'Method not allowed. Use a POST request instead, please.' });
        return;
    }
    
    const session = await getServerSession(req, res, authOptions);
    if(!session) {
        res.status(401).json({ 'success': false, 'message': "Not authenticated. Please sign in and try again." });
    }

    const { name, school } = JSON.parse(req.body)

    console.log(name, school, req.body);

    if(name == undefined || name == "" || school == undefined || school.length == 0) {
        res.status(400).json({ 'success': false, 'message': 'Name or school are either not defined or an empty string ""' });
        return;
    }
    try {
        await prisma.teacher.create({
            data: {
                name: name,
                school: school
            }
        });
    } catch (err) {
        res.status(500).json({ 'success': false, 'message': 'Unknown error; likely the teacher already exists'});
        return;
    }
    res.status(200).json({ 'success': true, 'teacherdata': { name, school } });
    return;
}