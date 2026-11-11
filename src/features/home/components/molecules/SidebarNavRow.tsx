import { Link, useMatch } from "react-router-dom";

import type { SidebarNavItemConfig } from "@/features/home/data/sidebarNav";
import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";

type SidebarNavRowProps = {
  item: SidebarNavItemConfig;
};

export function SidebarNavRow({ item }: SidebarNavRowProps) {
  const { icon: Icon, label, to } = item;
  const match = useMatch({ path: to, end: to === "/" });
  const isActive = Boolean(match);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        size="lg"
        className={cn(
          "h-11 justify-start gap-3 rounded-lg px-3 text-sidebar-foreground/80",
          "hover:bg-sidebar-accent hover:text-sidebar-foreground",
          "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
          "data-[active=true]:hover:bg-primary/90 data-[active=true]:hover:text-primary-foreground",
          "[&>svg]:size-4.5 [&>svg]:shrink-0",
          "active:bg-transparent"
        )}
      >
        <Link to={to}>
          <Icon aria-hidden />
          <span className="truncate font-medium">{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
