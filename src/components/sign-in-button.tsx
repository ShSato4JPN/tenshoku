"use client";

import { login } from "@/libs/actions/auth";

export const SignInButton = () => {
  return (
    <button type="button" onClick={() => login()}>
      sign in with Github
    </button>
  );
};
