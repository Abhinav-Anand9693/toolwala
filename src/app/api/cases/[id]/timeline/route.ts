import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const allowedEventTypes = [
  "HEARING",
  "FILING",
  "EVIDENCE",
  "MEETING",
  "DEADLINE",
  "NOTE",
] as const;

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};


/* ======================================================
   GET TIMELINE EVENTS
====================================================== */

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

    const { id: caseId } = await params;

    // Verify that this case belongs to current user
    const caseItem = await prisma.case.findFirst({
      where: {
        id: caseId,
        userId,
      },
      select: {
        id: true,
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

    const events =
      await prisma.caseTimelineEvent.findMany({
        where: {
          caseId,
        },
        orderBy: {
          eventDate: "desc",
        },
      });

    return NextResponse.json({
      events,
    });
  } catch (error) {
    console.error(
      "GET /api/cases/[id]/timeline error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch timeline",
      },
      {
        status: 500,
      }
    );
  }
}


/* ======================================================
   CREATE TIMELINE EVENT
====================================================== */

export async function POST(
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

    const { id: caseId } = await params;

    // Verify case ownership
    const caseItem = await prisma.case.findFirst({
      where: {
        id: caseId,
        userId,
      },
      select: {
        id: true,
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

    const body = await request.json();

    const {
      type,
      title,
      description,
      eventDate,
    } = body;

    // Validate title
    if (
      !title ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          error: "Event title is required",
        },
        {
          status: 400,
        }
      );
    }

    // Validate type
    const normalizedType =
      typeof type === "string"
        ? type.toUpperCase()
        : "NOTE";

    if (
      !allowedEventTypes.includes(
        normalizedType as
          (typeof allowedEventTypes)[number]
      )
    ) {
      return NextResponse.json(
        {
          error: "Invalid event type",
        },
        {
          status: 400,
        }
      );
    }

    // Validate date
    const parsedDate = new Date(eventDate);

    if (
      !eventDate ||
      Number.isNaN(parsedDate.getTime())
    ) {
      return NextResponse.json(
        {
          error: "Valid event date is required",
        },
        {
          status: 400,
        }
      );
    }

    const event =
      await prisma.caseTimelineEvent.create({
        data: {
          caseId,

          type: normalizedType as
            | "HEARING"
            | "FILING"
            | "EVIDENCE"
            | "MEETING"
            | "DEADLINE"
            | "NOTE",

          title: title.trim(),

          description:
            typeof description === "string"
              ? description.trim() || null
              : null,

          eventDate: parsedDate,
        },
      });

    return NextResponse.json(
      {
        event,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/cases/[id]/timeline error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create timeline event",
      },
      {
        status: 500,
      }
    );
  }
}