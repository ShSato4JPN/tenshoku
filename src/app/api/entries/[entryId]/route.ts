import { getUser } from "@/lib/auth";
import { prisma } from "@/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ entryId: string }> },
) {
  const user = getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { entryId } = await params;

  if (!entryId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const entry = await prisma.company.findMany({
      where: {
        id: entryId,
      },
    });

    return NextResponse.json({ entry }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ entryId: string }> },
) {
  const user = getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { entryId } = await params;

  if (!entryId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const entry = await prisma.company.update({
      where: {
        id: entryId,
      },
      data: body,
    });

    return NextResponse.json({ entry }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
}
