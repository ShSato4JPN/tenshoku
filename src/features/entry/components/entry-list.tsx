"use client";

import { Table } from "@/components/ui/table";
import { paths } from "@/config/paths";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEntries } from "../api/get-entries";
import { getEntryQueryOptions } from "../api/get-entry";

type EntryListProps = {
  onEntryPrefetch?: (id: string) => void;
};

export default function EntriesList({ onEntryPrefetch }: EntryListProps) {
  const entryQueries = useEntries({ page: 1 });

  const queryClient = useQueryClient();

  if (entryQueries.isLoading) {
    return <div>...loading</div>;
  }
  const entries = entryQueries.data?.entries;

  if (!entries) {
    return null;
  }

  return (
    <Table
      data={entries}
      columns={[
        {
          title: "Title",
          field: "name",
        },
        {
          title: "Created At",
          field: "createdAt",
          Cell({ entry: { createdAt } }) {
            return <span>{createdAt.toString()}</span>;
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id } }) {
            return (
              <Link
                onMouseEnter={() => {
                  queryClient.prefetchQuery(getEntryQueryOptions(id));
                  onEntryPrefetch?.(id);
                }}
                href={paths.app.entry.getHref(id)}
              >
                View
              </Link>
            );
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id } }) {
            // return <DeleteDiscussion id={id} />;
            return <p>{id}</p>;
          },
        },
      ]}
      // pagination={
      //   meta && {
      //     totalPages: meta.totalPages,
      //     currentPage: meta.page,
      //     rootUrl: "",
      //   }
      // }
    />
  );
}
