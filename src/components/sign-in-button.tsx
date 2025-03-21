"use client";

import { login } from "@/lib/actions/auth";

export const SignInButton = () => {
  return (
    <button type="button" onClick={() => login()}>
      sign in with Github
    </button>
  );
};
