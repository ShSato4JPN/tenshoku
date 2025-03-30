import type { MutationConfig } from "@/lib/react-query";
import type { Company } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { getEntryQueryOptions } from "./get-entry";

export const updateEntryInputSchema = z.object({
  name: z.string().min(1, "required"),
  employees: z.number().optional(),
  capital: z.number().optional(),
  link: z.string().url().optional(),
  memo: z.string().optional(),
});

export type UpdateEntryInput = z.infer<typeof updateEntryInputSchema>;

const updateEntry = async ({
  formData,
  entryId,
}: { formData: UpdateEntryInput; entryId: string }): Promise<Company> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/api/entries/${entryId}`,
    formData,
  );

  return data;
};

type UseUpdateEntryOptions = {
  mutationConfig?: MutationConfig<typeof updateEntry>;
};

export const useUpdateEntry = ({
  mutationConfig,
}: UseUpdateEntryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getEntryQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateEntry,
  });
};
