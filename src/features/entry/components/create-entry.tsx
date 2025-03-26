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
import { createEntryInputSchema } from "../api/create-entry";

export default function CreateEntry() {
  const form = useForm({
    resolver: zodResolver(createEntryInputSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    alert(JSON.stringify(data, null, 2));
  });

  return (
    <>
      <FormDialog
        title="新規登録"
        description="企業の情報を入力してください"
        triggerButton={<Button>企業を登録する</Button>}
        onClose={() => form.reset()}
      >
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>※ 企業名</FormLabel>
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
                    <Input
                      type="text"
                      {...field}
                      onBlur={(e) => {
                        // Format the input value as a number.
                        const value = e.target.value
                          .replace(/,/g, "")
                          .replace(/(\d)(?=(\d{3})+$)/g, "$1,");
                        form.setValue("employees", value, {
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
                        const value = e.target.value
                          .replace(/,/g, "")
                          .replace(/(\d)(?=(\d{3})+$)/g, "$1,");
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
