"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import CreateEntry from "@/features/entry/components/create-entry";
import EntriesList from "@/features/entry/components/entry-list";

export default function Entries() {
  return (
    <ContentLayout title="エントリー企業">
      <div className="flex justify-end">
        <CreateEntry />
      </div>
      <div>エントリーフォーム</div>
      <EntriesList />
    </ContentLayout>
  );
}
