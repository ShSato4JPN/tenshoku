import { auth } from "@/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  const user = await auth();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function POST(_: NextRequest) {
  const user = await auth();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user, { status: 200 });
}
