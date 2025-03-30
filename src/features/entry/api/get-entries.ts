import type { QueryConfig } from "@/lib/react-query";
import type { Company } from "@prisma/client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getEntries = async (
  { page }: { page?: number } = { page: 1 },
): Promise<{ entries: Company[] }> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/entries`,
    { params: { page } },
  );

  return data;
};

// キャッシュを高効率よく管理するために定義場所を限定させる作り
export const getEntiresQueryOptions = ({
  page = 1,
}: { page?: number } = {}) => {
  return queryOptions({
    queryKey: ["entries", { page }],
    queryFn: async () => await getEntries({ page }),
  });
};

// 外部から設定できるのは queryKey, queryFn 以外のオプション
type UseEntriesOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getEntiresQueryOptions>;
};

export const useEntries = ({ page, queryConfig }: UseEntriesOptions) => {
  return useQuery({ ...getEntiresQueryOptions({ page }), ...queryConfig });
};
