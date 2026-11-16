import { useState } from "react";
import { RotateCcw, UserCog } from "lucide-react";
import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/ui/checkbox";
import {
  adminTypeValue,
  headers,
  roleBadgeStyles,
  roleValue,
  statusBadgeStyles,
  statusValue,
} from "../data/tableData";
import { DetailsCustomer } from "../components/organisms/details/DetailsCustomer";
import { ChangeUserStatusDialog } from "../components/organisms/ChangeUserStatusDialog";
import { RestoreUserDialog } from "../components/organisms/RestoreUserDialog";
import {
  getUserDisplayName,
  type UserItem,
  type UserRole,
  type UserStatus,
} from "../types";

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
  const initial = displayName[0]?.toUpperCase() || "U";
  const isDeleted = user.deleted_at !== null;

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleOpenStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatusDialogOpen(true);
  };

  const handleOpenRestore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRestoreDialogOpen(true);
  };

  return (
    <>
      <tr
        key={user.id}
        className={`border-t py-2 border-sidebar/20 dark:border-white/10 transition-colors ${
          isSelected
            ? "bg-muted/60 dark:bg-popover-dark/40"
            : "hover:bg-muted/30 dark:hover:bg-card-dark/40"
        }`}
      >
        <td className="p-3 py-5 text-center">
          <div className="flex justify-center">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleOne(user.id)}
            />
          </div>
        </td>

        {headers.map(({ key }, i) => (
          <td key={i} className="p-3 py-5 text-center">
            {key === "actions" ? (
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenStatus}
                  className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer bg-primary/15 text-primary hover:bg-primary hover:text-white"
                  title="تغيير حالة المستخدم"
                >
                  <UserCog className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={handleOpenRestore}
                  className={cn(
                    "size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer",
                    isDeleted
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/40 hover:bg-emerald-500 hover:text-white"
                      : "bg-success/15 text-success hover:bg-success hover:text-white",
                  )}
                  title={isDeleted ? "استعادة الحساب المحذوف" : "استعادة المستخدم"}
                >
                  <RotateCcw className="size-4" />
                </button>
              </div>
            ) : (
              <PopUpLayout
                title={`تفاصيل المستخدم - ${displayName}`}
                content={
                  <>
                    {key === "name" ? (
                      <div className="flex items-center justify-center gap-2.5">
                        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {initial}
                        </div>
                        <span className="font-semibold text-sidebar dark:text-white text-sm">
                          {displayName}
                        </span>
                      </div>
                    ) : key === "email" ? (
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
                    ) : key === "role" ? (
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-semibold border mx-auto inline-block",
                            roleBadgeStyles[user.role as UserRole] ||
                              "text-sidebar bg-muted",
                          )}
                        >
                          {roleValue[user.role as UserRole] || user.role}
                        </span>
                        {user.role === "admin" && user.admin_type && (
                          <span className="text-[11px] text-muted-foreground">
                            {adminTypeValue[user.admin_type] || user.admin_type}
                          </span>
                        )}
                      </div>
                    ) : key === "status" ? (
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-semibold border mx-auto inline-block",
                            statusBadgeStyles[user.status as UserStatus] ||
                              "text-sidebar bg-muted",
                          )}
                        >
                          {statusValue[user.status as UserStatus] || user.status}
                        </span>
                        {isDeleted && (
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-destructive/15 text-destructive border border-destructive/30">
                            محذوف
                          </span>
                        )}
                      </div>
                    ) : null}
                  </>
                }
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
