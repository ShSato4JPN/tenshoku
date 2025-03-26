import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import type { MutationConfig } from "@/lib/react-query";
import type { Company } from "@prisma/client";
import axios from "axios";
import { getEntiresOptions } from "./get-entries";

export const createEntryInputSchema = z.object({
  name: z
    .string({ required_error: "企業名を入力してください" })
    .nonempty({ message: "企業名を入力してください" }),
  employees: z
    .string()
    .refine(
      (value) => {
        if (typeof value !== "string" || value.trim() === "") return true;

        return value.replace(/,/g, "").match(/^\d+$/);
      },
      { message: "社員数は数値で入力してください" },
    )
    .optional(),
  capital: z
    .string()
    .refine(
      (value) => {
        if (typeof value !== "string" || value.trim() === "") return true;

        return value.replace(/,/g, "").match(/^\d+$/);
      },
      { message: "資本金は数値で入力してください" },
    )
    .optional(),
  link: z.string().url({ message: "URL が正しくありません" }).optional(),
  memo: z.string().optional(),
});

export type CreateEntryInput = z.infer<typeof createEntryInputSchema>;

export const createEntry = ({
  data,
}: {
  data: CreateEntryInput;
}): Promise<Company> => {
  return axios.post("/api/entries", data);
};

type UseCreateDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof createEntry>;
};

export const useCreateDiscussion = ({
  mutationConfig,
}: UseCreateDiscussionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEntiresOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEntry,
  });
};
