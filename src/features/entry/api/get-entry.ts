import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getEntries = (
  { page }: { page?: number } = { page: 1 },
): Promise<{
  entries: {
    id: number;
    name: string;
    employees: number;
    capital: number;
  }[];
  totalCount: number;
}> => {
  return axios.get("/api/entries", { params: { page } });
};

export const getEntiresOptions = ({ page = 1 }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: ["entries", { page }],
    queryFn: () => getEntries({ page }),
  });
};

type UseEntriesOptions = {
  page?: number;
};

export const useEntries = ({ page }: UseEntriesOptions) => {
  return useQuery({ ...getEntiresOptions({ page }) });
};
