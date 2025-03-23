"use server";

import { signIn, signOut } from "@/auth";
import { paths } from "@/config/paths";

export const login = async () => {
  await signIn("github", { redirectTo: paths.app.home.getHref() });
};

export const logout = async () => {
  await signOut({ redirectTo: paths.home.getHref() });
};
