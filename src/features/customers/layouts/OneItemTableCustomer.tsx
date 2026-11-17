import { useState } from "react";
import { RotateCcw, UserCog } from "lucide-react";
import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/ui/checkbox";
import { headers } from "../data/tableData";
import { UserAvatar } from "../components/atoms/UserAvatar";
import { UserRoleBadge } from "../components/atoms/UserRoleBadge";
import { UserStatusBadge } from "../components/atoms/UserStatusBadge";
import { DetailsCustomer } from "../components/organisms/details/DetailsCustomer";
import { ChangeUserStatusDialog } from "../components/organisms/ChangeUserStatusDialog";
import { RestoreUserDialog } from "../components/organisms/RestoreUserDialog";
import { getUserDisplayName, type UserItem } from "../types";

type OneItemTableCustomerProps = {
  user: UserItem;
  selected: string[];
  setSelected: (value: React.SetStateAction<string[]>) => void;
};

export function OneItemTableCustomer({
  user,
  selected,
  setSelected,
}: OneItemTableCustomerProps) {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  const isSelected = selected.includes(user.id);
  const displayName = getUserDisplayName(user);
  const isDeleted = user.deleted_at !== null;

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const renderCellContent = (key: string) => {
    switch (key) {
      case "name":
        return (
          <div className="flex items-center justify-center gap-2.5">
            <UserAvatar name={displayName} />
            <span className="font-semibold text-sidebar dark:text-white text-sm">
              {displayName}
            </span>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col items-center gap-0.5" dir="ltr">
            <span className="text-sidebar/90 dark:text-white/90 text-sm">
              {user.email}
            </span>
            {user.phone && (
              <span className="text-sidebar/60 dark:text-white/60 text-xs">
                {user.phone}
              </span>
            )}
          </div>
        );
      case "role":
        return (
          <UserRoleBadge
            role={user.role}
            adminType={user.admin_type}
            showAdminType
          />
        );
      case "status":
        return (
          <UserStatusBadge
            status={user.status}
            deletedAt={user.deleted_at}
            showDeleted
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <tr
        className={cn(
          "border-t py-2 border-sidebar/20 dark:border-white/10 transition-colors",
          isSelected
            ? "bg-muted/60 dark:bg-popover-dark/40"
            : "hover:bg-muted/30 dark:hover:bg-card-dark/40",
        )}
      >
        <td className="p-3 py-5 text-center">
          <div className="flex justify-center">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleOne(user.id)}
            />
          </div>
        </td>

        {headers.map(({ key }) => (
          <td key={key} className="p-3 py-5 text-center">
            {key === "actions" ? (
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStatusDialogOpen(true);
                  }}
                  className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer bg-primary/15 text-primary hover:bg-primary hover:text-white"
                  title="تغيير حالة المستخدم"
                >
                  <UserCog className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRestoreDialogOpen(true);
                  }}
                  className={cn(
                    "size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer",
                    isDeleted
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/40 hover:bg-emerald-500 hover:text-white"
                      : "bg-success/15 text-success hover:bg-success hover:text-white",
                  )}
                  title={
                    isDeleted ? "استعادة الحساب المحذوف" : "استعادة المستخدم"
                  }
                >
                  <RotateCcw className="size-4" />
                </button>
              </div>
            ) : (
              <PopUpLayout
                title={`تفاصيل المستخدم - ${displayName}`}
                content={renderCellContent(key)}
              >
                <DetailsCustomer user={user} />
              </PopUpLayout>
            )}
          </td>
        ))}
      </tr>

      <ChangeUserStatusDialog
        user={user}
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
      />

      <RestoreUserDialog
        user={user}
        open={restoreDialogOpen}
        onOpenChange={setRestoreDialogOpen}
      />
    </>
  );
}
