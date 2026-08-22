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
      },
    });

    if (!caseItem) {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      );
    }

    const documents = await prisma.document.findMany({
      where: {
        caseId,
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      documents,
    });
  } catch (error) {
    console.error("Fetch documents error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch documents",
      },
      {
        status: 500,
      }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
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

    const documentId =
      request.nextUrl.searchParams.get("documentId");

    if (!documentId) {
      return NextResponse.json(
        {
          error: "Document ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        caseId,
        userId,
      },
    });

    if (!document) {
      return NextResponse.json(
        {
          error: "Document not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.document.delete({
      where: {
        id: documentId,
      },
    });

    await prisma.caseActivity.create({
      data: {
        caseId,
        userId,
        type: "DOCUMENT_DELETED",
        title: "Document removed",
        description: document.fileName,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete document error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete document",
      },
      {
        status: 500,
      }
    );
  }
}