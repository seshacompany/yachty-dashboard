import { cn } from "@/lib/utils";
import { adminTypeValue, roleBadgeStyles, roleValue } from "../../data/tableData";
import type { UserRole } from "../../types";

type UserRoleBadgeProps = {
  role: UserRole | string;
  adminType?: string | null;
  showAdminType?: boolean;
  className?: string;
};

export function UserRoleBadge({
  role,
  adminType,
  showAdminType = false,
  className,
}: UserRoleBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold border inline-block",
          roleBadgeStyles[role as UserRole] || "text-sidebar bg-muted",
          className,
        )}
      >
        {roleValue[role as UserRole] || role}
      </span>
      {showAdminType && role === "admin" && adminType && (
        <span className="text-[11px] text-muted-foreground">
          {adminTypeValue[adminType] || adminType}
        </span>
      )}
    </div>
  );
}
