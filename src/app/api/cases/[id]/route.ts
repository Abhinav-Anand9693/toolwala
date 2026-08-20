import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    const caseItem = await prisma.case.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!caseItem) {
      return NextResponse.json(
        {
          error: "Case not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      case: caseItem,
    });
  } catch (error) {
    console.error("GET /api/cases/[id] error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch case",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    const existingCase =
      await prisma.case.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!existingCase) {
      return NextResponse.json(
        {
          error: "Case not found",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const updatedCase =
      await prisma.case.update({
        where: {
          id,
        },

        data: {
          ...(typeof body.title === "string"
            ? {
                title: body.title.trim(),
              }
            : {}),

          ...(typeof body.caseNumber === "string"
            ? {
                caseNumber:
                  body.caseNumber.trim() || null,
              }
            : {}),

          ...(typeof body.court === "string"
            ? {
                court:
                  body.court.trim() || null,
              }
            : {}),

          ...(typeof body.clientName === "string"
            ? {
                clientName:
                  body.clientName.trim() || null,
              }
            : {}),

          ...(typeof body.oppositeParty === "string"
            ? {
                oppositeParty:
                  body.oppositeParty.trim() || null,
              }
            : {}),

          ...(typeof body.description === "string"
            ? {
                description:
                  body.description.trim() || null,
              }
            : {}),

          ...(typeof body.caseType === "string"
            ? {
                caseType:
                  body.caseType.toUpperCase(),
              }
            : {}),

          ...(typeof body.status === "string"
            ? {
                status:
                  body.status.toUpperCase(),
              }
            : {}),
        },
      });

    return NextResponse.json({
      case: updatedCase,
    });
  } catch (error) {
    console.error(
      "PATCH /api/cases/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update case",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    const existingCase =
      await prisma.case.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!existingCase) {
      return NextResponse.json(
        {
          error: "Case not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.case.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE /api/cases/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete case",
      },
      {
        status: 500,
      }
    );
  }
}