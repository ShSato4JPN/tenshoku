"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { useEntry } from "@/features/entry/api/get-entry";
import { EntryView } from "@/features/entry/components/entry-view";

type EntryProps = {
  entryId: string;
};

export default function Entry({ entryId }: EntryProps) {
  const { data } = useEntry({ entryId });

  return (
    <ContentLayout title={data?.entry.name}>
      <EntryView entryId={entryId} />
    </ContentLayout>
  );
}
