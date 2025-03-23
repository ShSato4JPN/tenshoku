import Main from "@/components/errors/main";
import { ErrorBoundary } from "react-error-boundary";
import Entry from "./_components/entry";

export default function EntryPage() {
  return (
    <ErrorBoundary fallback={<Main />}>
      <Entry />
    </ErrorBoundary>
  );
}
