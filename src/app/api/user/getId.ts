import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Email undefined, please try again.",
      },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "No user found with this email.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user.id,
      message: "Successfully retrieved the ID.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "An unknown error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
