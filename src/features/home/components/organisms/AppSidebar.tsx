import { useMemo } from "react";
import { LoginLogo } from "@/features/auth/components/atoms/LoginLogo";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SidebarLogoutButton } from "@/features/home/components/atoms/SidebarLogoutButton";
import { SidebarNavRow } from "@/features/home/components/molecules/SidebarNavRow";
import { SIDEBAR_NAV_ITEMS } from "@/features/home/data/sidebarNav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/shared/ui/sidebar";

export function AppSidebar() {
  const { user } = useAuth();

  const filteredNavItems = useMemo(() => {
    if (!user) return SIDEBAR_NAV_ITEMS;

    // ADMIN has full access to all navigation items
    if (user.adminType === "ADMIN") {
      return SIDEBAR_NAV_ITEMS;
    }

    // STAFF only sees items they have explicit permissions for (plus items without permission requirement like Home)
    if (user.adminType === "STAFF") {
      const userPermissions = user.permissions || [];
      return SIDEBAR_NAV_ITEMS.filter((item) => {
        if (!item.permission) return true;
        return userPermissions.includes(item.permission);
      });
    }

    return SIDEBAR_NAV_ITEMS;
  }, [user]);

  return (
    <Sidebar
      side="right"
      dir="rtl"
      collapsible="offcanvas"
      className="text-sidebar-foreground bg-sidebar border-sidebar-border"
    >
      <SidebarHeader className="px-4 pb-4 pt-6 bg-sidebar transition-colors duration-300 ease-in-out">
        <div className="flex justify-center">
          <LoginLogo className="text-coastal-white text-2xl md:text-3xl tracking-widest py-2" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 bg-sidebar transition-colors duration-300 ease-in-out">
        <SidebarMenu className="gap-1.5">
          {filteredNavItems.map((item) => (
            <SidebarNavRow key={item.id} item={item} />
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto p-4 bg-sidebar transition-colors duration-300 ease-in-out">
        <SidebarLogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
