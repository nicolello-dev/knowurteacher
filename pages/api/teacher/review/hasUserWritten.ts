import { APIResponse } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/prisma";

interface Request extends NextApiRequest {
  id: string;
}

export default async function Handler(
  req: Request,
  res: NextApiResponse<APIResponse>,
) {
  if (req.method != "GET") {
    res.status(405).json({
      success: false,
      data: null,
      message: "Method not allowed. Please make a GET request instead.",
    });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    res.status(401).json({
      success: false,
      data: null,
      message: "Invalid credentials. Sign in and try again.",
    });
    return;
  }

  const { id } = req.query as { [key: string]: string };

  if (id == undefined) {
    res.status(400).json({
      success: false,
      data: null,
      message:
        "Something was not defined! Received: " + JSON.stringify(req.body),
    });
    return;
  }

  try {
    const first = await prisma.review.findFirst({
      where: {
        author: {
          email: session.user?.email,
        },
        teacher: {
          id: id,
        },
      },
    });
    if (first) {
      res.status(200).json({
        success: true,
        data: true,
        message: null,
      });
    } else {
      res.status(200).json({
        success: true,
        data: false,
        message: null,
      });
    }
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
