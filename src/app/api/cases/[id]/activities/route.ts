import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: caseId } = await params;

    const caseItem = await prisma.case.findFirst({
      where: {
        id: caseId,
        userId,
      },
      select: {
        id: true,
        createdAt: true,
        title: true,
      },
    });

    if (!caseItem) {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      );
    }

    const activities =
      await prisma.caseActivity.findMany({
        where: {
          caseId,
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      activities,
    });
  } catch (error) {
    console.error("Fetch activities error:", error);

    return NextResponse.json(
      { error: "Failed to fetch timeline" },
      { status: 500 }
    );
  }
}