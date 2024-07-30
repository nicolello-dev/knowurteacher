import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

type TeacherSuggestion = {
  name: string;
  school: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nameInput = searchParams.get("name");

  if (!nameInput) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Name is invalid! Please try again.",
      },
      { status: 200 }
    );
  }

  try {
    const teachers: TeacherSuggestion[] = await prisma.$queryRaw`
      SELECT name, school 
      FROM public."Teacher" t 
      WHERE LOWER(t.name) ILIKE ${`%${nameInput}%`} 
      LIMIT 5;
    `;

    if (!teachers.length) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "No teachers found with the given name.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: teachers,
        message: "Successfully retrieved matching teachers.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Something unexpected happened, please try again.",
      },
      { status: 500 }
    );
  }
}
