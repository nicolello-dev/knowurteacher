import { APIResponse } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/prisma";

interface Request extends NextApiRequest {
  body: string;
}

export default async function Handler(
  req: Request,
  res: NextApiResponse<APIResponse>,
) {
  if (req.method != "POST") {
    res.status(405).json({
      success: false,
      data: null,
      message: "Method not allowed. Please make a POST request instead.",
    });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({
      success: false,
      data: null,
      message: "Invalid credentials. Sign in and try again.",
    });
    console.log("Invalid credentials");
    return;
  }

  const { text, teacherId } = JSON.parse(req.body);

  if ([text, teacherId].some((e) => e == undefined)) {
    res.status(400).json({
      success: false,
      data: null,
      message:
        "Something was not defined! Received: " + JSON.stringify(req.body),
    });
    return;
  }

  try {
    await prisma.user.update({
      where: {
        email: session.user?.email || undefined,
      },
      data: {
        Reviews: {
          create: {
            text,
            teacherID: teacherId,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      data: null,
      message: null,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      data: null,
      message:
        "Teacher or user not found. This error should not have happened, please try again or contact support.",
    });
    return;
  }
}
