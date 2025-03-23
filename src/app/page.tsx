"use client";

import { login } from "@/lib/actions/auth";
import { GithubLoginButton } from "react-social-login-buttons";

export default function Home() {
  return (
    <div className="flex h-screen items-center bg-sky-100">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-2xl fonwt-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <p>😼</p>
          <p className="block">転職活動頑張ろうぜ</p>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="ml-3 inline-flex">
            <GithubLoginButton onClick={() => login()}>
              <span>Github でログイン</span>
            </GithubLoginButton>
          </div>
        </div>
      </div>
    </div>
  );
}
