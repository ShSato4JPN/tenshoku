import { type Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const statusData: Prisma.StatusCreateInput[] = [
  {
    id: "WAITING",
    value: "待機中",
  },
  {
    id: "PROGRESS",
    value: "進行中",
  },
  {
    id: "DONE",
    value: "完了",
  },
  {
    id: "DECLINED",
    value: "辞退",
  },
];

export async function main() {
  for (const u of statusData) {
    await prisma.status.create({ data: u });
  }
}

main();
