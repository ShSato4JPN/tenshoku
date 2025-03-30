"use client";

import { useEntry } from "../api/get-entry";
import UpdateEntry from "./update-entry";

export const EntryView = ({ entryId }: { entryId: string }) => {
  const entryQuery = useEntry({
    entryId,
  });

  if (entryQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        {/* <Spinner size="lg" /> */}
        <div>...loading</div>
      </div>
    );
  }

  const entry = entryQuery?.data?.entry;

  if (!entry) return null;

  return (
    <div>
      <div className="flex justify-between">
        <span>
          <span className="text-xs font-bold">{"test"}</span>
          {entry.registerId && (
            <span className="ml-2 text-sm font-bold">
              by {entry.registerId}
            </span>
          )}
        </span>
      </div>
      <div className="mt-6 flex flex-col space-y-16">
        <div className="flex justify-end">
          <UpdateEntry entryId={entryId} />
        </div>
        <div>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm text-gray-500">
                {/* <MDPreview value={discussion.body} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
