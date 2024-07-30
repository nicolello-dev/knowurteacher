import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nameInput = searchParams.get("name");
  const schoolInput = searchParams.get("school");

  if (!nameInput || nameInput.length < 3 || !schoolInput) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message:
          "Input either inexistent or invalid. Please check you've compiled correctly all parts.",
      },
      { status: 400 }
    );
  }

  try {
    const teacher = await prisma.teacher.findFirst({
      where: {
        name: {
          equals: nameInput,
        },
        school: {
          equals: schoolInput,
        },
      },
    });

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "No teacher found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: teacher,
      message: null,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
