import type { MutationConfig } from "@/lib/react-query";
import type { Company } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
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
  return axios.post(`${process.env.NEXT_PUBLIC_URL}/api/entries`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateEntryOptions = {
  mutationConfig?: MutationConfig<typeof createEntry>;
};

export const useCreateEntry = ({
  mutationConfig,
}: UseCreateEntryOptions = {}) => {
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
