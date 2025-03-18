import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [Github],
  adapter: PrismaAdapter(prisma),
});
