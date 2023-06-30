import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface APIRequest extends NextApiRequest {
    query: {
        email: string | undefined;
        username: string | undefined;
        school: string | undefined;
        photoURL: string | undefined;
    }
}

export default async function suggestTeacher(req: APIRequest, res: NextApiResponse) {

    let { email, username, photoURL, school } = req.query;

    email = email || undefined;
    photoURL = photoURL || undefined;
    school = school || undefined;

    if(username == undefined || email == undefined) {
        res.status(400).json({ 'success': false, 'error': 'Name is undefined' });
        return;
    }

    const prisma = new PrismaClient();
    try {
        await prisma.user.create({
            data: {
                email: email,
                username: username,
                photoURL: photoURL,
                school: school
            }
        });
    } catch (err) {
        res.status(500).json({ 'success': false, 'error': 'Unknown error; likely the user already exists'});
        return;
    }
    res.status(200).json({ 'success': true });
    return;
}