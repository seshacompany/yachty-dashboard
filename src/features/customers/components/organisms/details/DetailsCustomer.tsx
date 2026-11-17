import { getUserDisplayName, type UserItem } from "../../../types";
import { UserAvatar } from "../../atoms/UserAvatar";
import { UserRoleBadge } from "../../atoms/UserRoleBadge";
import { UserStatusBadge } from "../../atoms/UserStatusBadge";
import { UserAccountSection } from "./UserAccountSection";
import { UserAdminSection } from "./UserAdminSection";
import { UserCompanySection } from "./UserCompanySection";
import { UserProfileSection } from "./UserProfileSection";

type DetailsCustomerProps = {
  user: UserItem;
};

export function DetailsCustomer({ user }: DetailsCustomerProps) {
  const displayName = getUserDisplayName(user);
  const showProfileSection = user.role === "user" || user.profile !== null;
  const showCompanySection = user.role === "company" || user.company !== null;
  const showAdminSection = user.role === "admin";

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col gap-6 p-4 text-sidebar dark:text-white"
    >
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 dark:bg-popover-dark/50 border border-sidebar/15 dark:border-white/10">
        <div className="flex items-center gap-3">
          <UserAvatar name={displayName} size="lg" />
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-bold text-sidebar dark:text-white">
              {displayName}
            </h3>
            <p className="text-xs text-sidebar/70 dark:text-white/60" dir="ltr">
              {user.email}
            </p>
            {user.phone && (
              <p className="text-xs text-secondary-light" dir="ltr">
                {user.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <UserRoleBadge role={user.role} />
          <UserStatusBadge
            status={user.status}
            deletedAt={user.deleted_at}
            showDeleted
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <UserAccountSection user={user} />

        <div className="flex flex-col gap-4">
          {showProfileSection && <UserProfileSection profile={user.profile} />}
          {showCompanySection && <UserCompanySection company={user.company} />}
          {showAdminSection && <UserAdminSection user={user} />}
        </div>
      </div>
    </div>
  );
}
