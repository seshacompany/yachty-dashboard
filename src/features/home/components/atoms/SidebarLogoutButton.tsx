import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

type SidebarLogoutButtonProps = {
  className?: string;
};

export function SidebarLogoutButton({ className }: SidebarLogoutButtonProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="lg"
      className={cn(
        "h-11 w-full justify-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 text-sidebar-foreground px-3 shadow-none",
        "hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30 cursor-pointer transition-colors duration-200",
        "[&_svg]:size-4.5",
        className,
      )}
      onClick={handleLogoutClick}
    >
      <LogOut aria-hidden />
      <span className="font-medium">تسجيل الخروج</span>
    </Button>
  );
}
