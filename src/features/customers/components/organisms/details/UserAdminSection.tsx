import { ShieldCheck } from "lucide-react";
import { adminTypeValue, roleValue } from "../../../data/tableData";
import type { UserItem, UserRole } from "../../../types";
import { UserInfoRow } from "../../molecules/UserInfoRow";

type UserAdminSectionProps = {
  user: UserItem;
};

export function UserAdminSection({ user }: UserAdminSectionProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
      <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
        <ShieldCheck className="size-4" />
        <span>تفاصيل الإدارة</span>
      </div>

      <div className="flex flex-col">
        <UserInfoRow
          title="نوع الإدارة"
          value={
            user.admin_type
              ? adminTypeValue[user.admin_type] || user.admin_type
              : "—"
          }
        />
        <UserInfoRow
          title="الدور"
          value={roleValue[user.role as UserRole] || user.role}
        />
      </div>
    </div>
  );
}
