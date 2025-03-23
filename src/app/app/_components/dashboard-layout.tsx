"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer/drawer";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/config/paths";
import { logout } from "@/lib/actions/auth";
import { useUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  Building2,
  Calendar,
  Footprints,
  HomeIcon,
  PanelLeft,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type React from "react";

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const user = useUser();
  const pathname = usePathname();
  // const router = useRouter();

  const navigation = [
    { name: "ホーム", to: paths.app.root.getHref(), icon: HomeIcon },
    { name: "エントリー企業", to: paths.app.entry.getHref(), icon: Building2 },
    { name: "カレンダー", to: paths.app.calendar.getHref(), icon: Calendar },
    { name: "進捗確認", to: paths.app.progress.getHref(), icon: Footprints },
    { name: "メモ", to: paths.app.memo.getHref(), icon: StickyNote },
  ] as SideNavigationItem[];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.name}
                href={item.to}
                className={cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium",
                  isActive && "bg-gray-900 text-white",
                )}
              >
                <item.icon
                  className={cn(
                    "text-gray-400 group-hover:text-gray-300",
                    "mr-4 size-6 shrink-0",
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-black pt-10 text-white sm:max-w-60">
              <nav className="grid gap-6 text-lg font-medium">
                {navigation.map((item) => {
                  const isActive = pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      href={item.to}
                      className={cn(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium",
                        isActive && "bg-gray-900 text-white",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "text-gray-400 group-hover:text-gray-300",
                          "mr-4 size-6 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src={user.data?.image || undefined}
                    alt="avatar"
                  />
                  <AvatarFallback>YOU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                // onClick={() => router.push(paths.app.profile.getHref())}
                className={cn("block px-4 py-2 text-sm text-gray-700")}
              >
                プロフィール
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn("block px-4 py-2 text-sm text-gray-700 w-full")}
                onClick={() => logout()}
              >
                サインアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
