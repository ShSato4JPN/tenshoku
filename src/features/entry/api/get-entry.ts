import type { QueryConfig } from "@/lib/react-query";
import type { Company } from "@prisma/client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getEntry = async (
  entryId: string,
): Promise<{ entry: Company; totalCount: number }> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/entries/${entryId}`,
  );

  return data;
};

export const getEntryQueryOptions = (entryId: string) => {
  return queryOptions({
    queryKey: ["entry", entryId],
    queryFn: async () => await getEntry(entryId),
  });
};

type UseEntryOptions = {
  entryId: string;
  queryConfig?: QueryConfig<typeof getEntryQueryOptions>;
};

export const useEntry = ({ entryId, queryConfig }: UseEntryOptions) => {
  return useQuery({ ...getEntryQueryOptions(entryId), ...queryConfig });
};
