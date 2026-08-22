import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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

    const existingCase = await prisma.case.findFirst({
      where: {
        id: caseId,
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

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        {
          error: "Uploaded file is empty",
        },
        {
          status: 400,
        }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      file.type &&
      !allowedTypes.includes(file.type)
    ) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload PDF, DOCX, TXT, JPG, PNG, or WEBP.",
        },
        {
          status: 400,
        }
      );
    }

    const document = await prisma.document.create({
      data: {
        caseId,
        userId,

        name: file.name,

        fileName: file.name,

        mimeType:
          file.type || "application/octet-stream",

        size: file.size,

        storagePath: null,
      },
    });

    return NextResponse.json(
      {
        document,
        message: "Document uploaded successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/cases/[id]/documents/upload error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to upload document",
      },
      {
        status: 500,
      }
    );
  }
}