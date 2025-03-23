import { queryOptions, useQuery } from "@tanstack/react-query";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import authConfig from "../../auth.config";
const { auth } = NextAuth(authConfig);

const userQueryKey = ["user"];

export const getUser = async (): Promise<Session["user"]> => {
  const session = await auth();

  return session?.user;
};

export const useUser = () => useQuery(getUserQueryOptions());

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};
