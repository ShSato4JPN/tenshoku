import { ContentLayout } from "@/components/layouts/content-layout";
import CreateEntry from "@/features/entry/components/create-entry";

export default function Entry() {
  return (
    <ContentLayout title="エントリー企業">
      <div className="flex justify-end">
        <CreateEntry />
      </div>
      <div>エントリーフォーム</div>
    </ContentLayout>
  );
}
