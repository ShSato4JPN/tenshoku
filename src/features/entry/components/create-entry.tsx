"use client";

import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/ui/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CreateEntry() {
  const formSchema = z.object({
    name: z.string().nonempty({ message: "企業名を入力してください" }),
    employees: z.string().refine(
      (value) => {
        value.replace(/,/g, "").match(/^\d+$/) !== null;
      },
      { message: "社員数は数値で入力してください" },
    ),
    capital: z.string().refine(
      (value) => {
        value.replace(/,/g, "").match(/^\d+$/) !== null;
      },
      { message: "資本金は数値で入力してください" },
    ),
    link: z.string().url({ message: "URLが正しくありません" }),
    memo: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      employees: "",
      capital: "",
      link: "",
      memo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(values);
  }

  return (
    <>
      <FormDialog
        title="新規登録"
        description="企業の情報を入力してください"
        triggerButton={<Button>企業を登録する</Button>}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>企業名</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>社員数</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capital"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>資本金</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      onBlur={(e) => {
                        // Format the input value as a number.
                        const value = e.target.value.replace(
                          /(\d)(?=(\d{3})+$)/g,
                          "$1,",
                        );
                        form.setValue("capital", value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HP</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メモ</FormLabel>
                  <FormControl>
                    <Textarea className="h-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              登録する
            </Button>
          </form>
        </Form>
      </FormDialog>
    </>
  );
}
