"use client";
import { login } from "@/libs/actions/auth";

export default async function Home() {
  //const session = await auth();
  //console.log(session);
  return (
    <div>
      <button type="button" onClick={() => login()}>
        sign in with Github
      </button>
    </div>
  );
}
