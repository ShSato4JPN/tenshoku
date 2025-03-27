import { auth } from "@/auth";
import { getUser } from "@/lib/auth";
import { prisma } from "@/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { zfd } from "zod-form-data";

export async function GET(_: NextRequest) {
  const user = await auth();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function POST(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const schema = zfd.formData({
    name: zfd.text(),
    employees: zfd.numeric(),
    capital: zfd.numeric(),
    link: zfd.text(),
    memo: zfd.text(),
  });

  const formData = await req.formData();

  try {
    const { name, employees, capital, link, memo } = schema.parse({
      name: formData.get("name"),
      employees: String(formData.get("employees")).replace(/,/g, ""),
      capital: String(formData.get("capital")).replace(/,/g, ""),
      link: formData.get("link"),
      memo: formData.get("memo"),
    });

    const company = await prisma.company.create({
      data: {
        registerId: user.id as string,
        name,
        employees,
        capital,
        link,
        memo,
      },
    });

    return NextResponse.json({ success: true, data: company }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
