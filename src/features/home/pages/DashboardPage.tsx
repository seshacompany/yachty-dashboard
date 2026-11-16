import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { SIDEBAR_NAV_ITEMS } from "@/features/home/data/sidebarNav";

export default function DashboardPage() {
  const { pathname } = useLocation();

  const item = useMemo(() => {
    const found = SIDEBAR_NAV_ITEMS.find((i) => i.to === pathname);
    return found;
  }, [pathname]);

  const Component = item?.Children;

  return (
    <div className="m-0 flex min-h-0 w-full max-w-none flex-1 flex-col gap-6 py-4 px-4">
      <div className="flex flex-col gap-3">
        <p className="text-4xl md:text-5xl font-bold text-navy dark:text-coastal-white">
          {item?.title ? item?.title : item?.label}
        </p>
        <p className="text-muted-foreground">
          {item?.description}
        </p>
      </div>

      {Component && <Component />}
    </div>
  );
}
