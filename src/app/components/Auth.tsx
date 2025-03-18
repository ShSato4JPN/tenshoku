import type { Session } from "next-auth";
import { use } from "react";

type AuthProps = {
  sessionPromise: Promise<Session | null>;
};

export default function Auth({ sessionPromise }: AuthProps) {
  const session = use(sessionPromise);
  return <div>{JSON.stringify(session)}</div>;
}
