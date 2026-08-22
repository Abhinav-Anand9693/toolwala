import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};


async function getCaseForUser(
  caseId: string,
  userId: string
) {
  return prisma.case.findFirst({
    where: {
      id: caseId,
      userId,
    },
    select: {
      id: true,
    },
  });
}


export async function GET(
  _request: NextRequest,
  { params }: Context
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

    const caseItem = await getCaseForUser(
      caseId,
      userId
    );

    if (!caseItem) {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      );
    }

    const notes = await prisma.caseNote.findMany({
      where: {
        caseId,
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Fetch notes error:", error);

    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}


export async function POST(
  request: NextRequest,
  { params }: Context
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

    const body = await request.json();

    const content =
      typeof body.content === "string"
        ? body.content.trim()
        : "";

    if (!content) {
      return NextResponse.json(
        { error: "Note cannot be empty" },
        { status: 400 }
      );
    }

    const caseItem = await getCaseForUser(
      caseId,
      userId
    );

    if (!caseItem) {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      );
    }

    const note = await prisma.caseNote.create({
      data: {
        caseId,
        userId,
        content,
      },
    });

    await prisma.caseActivity.create({
      data: {
        caseId,
        userId,
        type: "NOTE_CREATED",
        title: "Note added",
      },
    });

    return NextResponse.json(
      { note },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create note error:", error);

    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  request: NextRequest,
  { params }: Context
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

    const body = await request.json();

    const noteId = body.noteId;

    const content =
      typeof body.content === "string"
        ? body.content.trim()
        : "";

    if (
      typeof noteId !== "string" ||
      !content
    ) {
      return NextResponse.json(
        { error: "Invalid note data" },
        { status: 400 }
      );
    }

    const note = await prisma.caseNote.findFirst({
      where: {
        id: noteId,
        caseId,
        userId,
      },
    });

    if (!note) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      );
    }

    const updatedNote =
      await prisma.caseNote.update({
        where: {
          id: noteId,
        },
        data: {
          content,
        },
      });

    return NextResponse.json({
      note: updatedNote,
    });
  } catch (error) {
    console.error("Update note error:", error);

    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: Context
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

    const noteId =
      request.nextUrl.searchParams.get("noteId");

    if (!noteId) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    const note = await prisma.caseNote.findFirst({
      where: {
        id: noteId,
        caseId,
        userId,
      },
    });

    if (!note) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      );
    }

    await prisma.caseNote.delete({
      where: {
        id: noteId,
      },
    });

    await prisma.caseActivity.create({
      data: {
        caseId,
        userId,
        type: "NOTE_DELETED",
        title: "Note removed",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete note error:", error);

    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}