import type { ReactNode } from "react";
import DashboardLayout from "./_components/dashboard-layout";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
