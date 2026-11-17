import { cn } from "@/lib/utils";
import { statusBadgeStyles, statusValue } from "../../data/tableData";
import type { UserStatus } from "../../types";

type UserStatusBadgeProps = {
  status: UserStatus | string;
  deletedAt?: string | null;
  showDeleted?: boolean;
  className?: string;
};

export function UserStatusBadge({
  status,
  deletedAt,
  showDeleted = false,
  className,
}: UserStatusBadgeProps) {
  const isDeleted = deletedAt !== null && deletedAt !== undefined;

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold border inline-block",
          statusBadgeStyles[status as UserStatus] || "text-sidebar bg-muted",
          className,
        )}
      >
        {statusValue[status as UserStatus] || status}
      </span>
      {showDeleted && isDeleted && (
        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-destructive/15 text-destructive border border-destructive/30">
          محذوف
        </span>
      )}
    </div>
  );
}
