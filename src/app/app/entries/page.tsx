import Main from "@/components/errors/main";
import { ErrorBoundary } from "react-error-boundary";
import Entries from "./_components/entry";

export default function EntriesPage() {
  return (
    <ErrorBoundary fallback={<Main />}>
      <Entries />
    </ErrorBoundary>
  );
}
