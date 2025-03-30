import { getEntryQueryOptions } from "@/features/entry/api/get-entry";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Entry from "./_components/entry";

const preloadData = async (entryId: string) => {
  // 最新のデータを取得するために、QueryClientを作成
  const queryClient = new QueryClient();

  await Promise.all([queryClient.prefetchQuery(getEntryQueryOptions(entryId))]);

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

export default async function EntryPage({
  params,
}: { params: Promise<{ entryId: string }> }) {
  const entryId = (await params).entryId;

  const { dehydratedState, queryClient } = await preloadData(entryId);

  // サーバーサイドでキャッシュデータの存在を確認する;
  const entry = queryClient.getQueryData(
    getEntryQueryOptions(entryId).queryKey,
  );

  if (!entry) return <div>entry not found</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Entry entryId={entryId} />
    </HydrationBoundary>
  );
}
