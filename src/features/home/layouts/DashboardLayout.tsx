import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/features/home/components/organisms/AppSidebar";
import ThemeToggle from "@/layouts/ThemeToggle/ThemeToggle";
import { Notification } from "@/shared/ui/notification/Notification";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider
      dir="rtl"
      lang="ar"
      className="flex min-h-svh w-full max-w-none flex-row bg-background font-sans [--sidebar:var(--color-sidebar)] [--sidebar-foreground:var(--color-sidebar-foreground)] [--sidebar-width:18rem]!"
    >
      {/* sidebar */}
      <AppSidebar />
      {/* content */}
      <SidebarInset className="m-0 flex min-h-0 min-w-0 flex-1 flex-col bg-background text-foreground transition-colors duration-300 ease-in-out px-4 md:px-8 py-6 w-full max-w-none">
        <header className="flex justify-between w-full shrink-0 items-center gap-2 border border-border px-4 py-3 bg-card text-card-foreground transition-colors duration-300 ease-in-out rounded-t-2xl shadow-xs">
          <SidebarTrigger
            size="icon"
            className="shrink-0 text-foreground/70 dark:text-foreground/80 hover:bg-muted hover:text-foreground [&_svg]:size-5 cursor-pointer"
          />
          <div className="flex gap-4 items-center">
            <Notification />
            <ThemeToggle />
          </div>
        </header>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col w-full bg-card text-card-foreground transition-colors duration-300 ease-in-out rounded-b-2xl border-x border-b border-border shadow-xs">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
