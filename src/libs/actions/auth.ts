"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => {
  console.log(signIn);
  await signIn("github", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
