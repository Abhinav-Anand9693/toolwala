import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const allowedCaseTypes = [
  "CIVIL",
  "CRIMINAL",
  "CORPORATE",
  "FAMILY",
  "PROPERTY",
  "OTHER",
] as const;

const allowedStatuses = [
  "ACTIVE",
  "PENDING",
  "CLOSED",
] as const;

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search")?.trim() || "";

    const cases = await prisma.case.findMany({
      where: {
        userId,

        ...(search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  caseNumber: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  clientName: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  oppositeParty: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      cases,
    });
  } catch (error) {
    console.error("GET /api/cases error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch cases",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();

    const {
      title,
      caseNumber,
      caseType,
      court,
      clientName,
      oppositeParty,
      description,
      status,
    } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        {
          error: "Case title is required",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedCaseType =
      typeof caseType === "string"
        ? caseType.toUpperCase()
        : "OTHER";

    const normalizedStatus =
      typeof status === "string"
        ? status.toUpperCase()
        : "ACTIVE";

    if (
      !allowedCaseTypes.includes(
        normalizedCaseType as (typeof allowedCaseTypes)[number]
      )
    ) {
      return NextResponse.json(
        {
          error: "Invalid case type",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !allowedStatuses.includes(
        normalizedStatus as (typeof allowedStatuses)[number]
      )
    ) {
      return NextResponse.json(
        {
          error: "Invalid case status",
        },
        {
          status: 400,
        }
      );
    }

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 401,
        }
      );
    }

    const email =
      clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        {
          error: "User email not available",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.user.upsert({
      where: {
        id: userId,
      },

      update: {
        email,
        name:
          `${clerkUser.firstName ?? ""} ${
            clerkUser.lastName ?? ""
          }`.trim() || null,
      },

      create: {
        id: userId,
        email,
        name:
          `${clerkUser.firstName ?? ""} ${
            clerkUser.lastName ?? ""
          }`.trim() || null,
        role: "lawyer",
      },
    });

    const newCase = await prisma.case.create({
      data: {
        userId,

        title: title.trim(),

        caseNumber:
          typeof caseNumber === "string"
            ? caseNumber.trim() || null
            : null,

        caseType:
          normalizedCaseType as
            | "CIVIL"
            | "CRIMINAL"
            | "CORPORATE"
            | "FAMILY"
            | "PROPERTY"
            | "OTHER",

        court:
          typeof court === "string"
            ? court.trim() || null
            : null,

        clientName:
          typeof clientName === "string"
            ? clientName.trim() || null
            : null,

        oppositeParty:
          typeof oppositeParty === "string"
            ? oppositeParty.trim() || null
            : null,

        description:
          typeof description === "string"
            ? description.trim() || null
            : null,

        status:
          normalizedStatus as
            | "ACTIVE"
            | "PENDING"
            | "CLOSED",
      },
    });

    return NextResponse.json(
      {
        case: newCase,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/cases error:", error);

    return NextResponse.json(
      {
        error: "Failed to create case",
      },
      {
        status: 500,
      }
    );
  }
}