import { getUserDisplayName, type UserItem } from "../../types";
import { UserStatusBadge } from "../atoms/UserStatusBadge";

type UserSummaryCardProps = {
  user: UserItem;
  showStatus?: boolean;
};

export function UserSummaryCard({
  user,
  showStatus = false,
}: UserSummaryCardProps) {
  return (
    <div className="p-3 rounded-lg bg-muted/60 dark:bg-popover-dark/60 text-sm flex flex-col gap-2 border border-sidebar/10 dark:border-white/5">
      <div className="flex justify-between items-center">
        <span className="text-sidebar/70 dark:text-white/60">الاسم:</span>
        <span className="font-semibold text-sidebar dark:text-white">
          {getUserDisplayName(user)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sidebar/70 dark:text-white/60">
          البريد الإلكتروني:
        </span>
        <span className="text-sidebar/90 dark:text-white/80 text-xs">
          {user.email}
        </span>
      </div>
      {showStatus && (
        <div className="flex justify-between items-center">
          <span className="text-sidebar/70 dark:text-white/60">
            الحالة الحالية:
          </span>
          <UserStatusBadge
            status={user.status}
            className="px-2.5 py-0.5"
          />
        </div>
      )}
    </div>
  );
}
