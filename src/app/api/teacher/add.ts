import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

import { getServerSession } from "next-auth";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(auth);

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Not authenticated. Please sign in and retry.",
      },
      { status: 401 }
    );
  }

  let requestBody;
  try {
    requestBody = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Invalid JSON payload.",
      },
      { status: 400 }
    );
  }

  const { name, school } = requestBody;

  if (!name || !school) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "The data passed is invalid or inexistent. Please try again.",
      },
      { status: 400 }
    );
  }

  try {
    await prisma.teacher.create({
      data: {
        name: name,
        school: school,
      },
    });
    return NextResponse.json({
      success: true,
      data: null,
      message: null,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message:
          "An unexpected error occurred (likely the teacher already exists). If that isn't the case, please contact support.",
      },
      { status: 500 }
    );
  }
}
