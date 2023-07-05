import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

interface APIRequest extends NextApiRequest {
    query: {
        name: string | undefined;
        school: string | undefined;
    }
}

export default async function addTeacher(req: APIRequest, res: NextApiResponse) {
    if(req.method != "POST") {
        res.status(405).json({ 'success': false, 'message': 'Method not allowed. Use a POST request instead, please.'});
        return;
    }
    let { name, school } = req.body;
    if(name.length == 0 || name == undefined) {
        res.status(405).json({ 'success': false, 'message': 'Method not allowed. Use a POST request instead, please.'});
        return;
    }
    if(school == '') {
        school = undefined;
    }
    if(name == undefined || name == "") {
        res.status(400).json({ 'success': false, 'error': 'Name is not defined' });
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
        res.status(500).json({ 'success': false, 'error': 'Unknown error; likely the teacher already exists'});
        return;
    }
    res.status(200).json({ 'success': true, 'teacherdata': { name, school } });
    return;
}