import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nameInput = searchParams.get("name");
  const schoolInput = searchParams.get("school");
  const startIndex = parseInt(searchParams.get("startIndex") || "0");

  if (
    !nameInput ||
    nameInput.length < 3 ||
    startIndex === undefined ||
    startIndex < 0
  ) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    let teachers;
    let count;
    if (!schoolInput) {
      teachers = await prisma.teacher.findMany({
        where: {
          name: {
            contains: nameInput,
            mode: "insensitive",
          },
        },
        orderBy: {
          id: "asc",
        },
        skip: startIndex,
        take: 5,
      });
      count = await prisma.teacher.count({
        where: {
          name: {
            contains: nameInput,
            mode: "insensitive",
          },
        },
      });
    } else {
      teachers = await prisma.teacher.findMany({
        where: {
          name: {
            contains: nameInput,
            mode: "insensitive",
          },
          school: {
            contains: schoolInput,
            mode: "insensitive",
          },
        },
        orderBy: {
          id: "asc",
        },
        skip: startIndex,
        take: 5,
      });
      count = await prisma.teacher.count({
        where: {
          name: {
            contains: nameInput,
            mode: "insensitive",
          },
          school: {
            contains: schoolInput,
            mode: "insensitive",
          },
        },
      });
    }

    return NextResponse.json({ teachers, count });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
