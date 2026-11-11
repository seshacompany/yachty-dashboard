import { useState } from "react";
import { toast } from "sonner";
import { Loader2, UserCog } from "lucide-react";
import { getApiErrorMessage } from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Button } from "@/shared/ui/button";
import { cn } from "@/lib/utils";
import { useUpdateUserStatus } from "../../hooks/useUpdateUserStatus";
import { statusBadgeStyles, statusValue } from "../../data/tableData";
import type { UserItem, UserStatus } from "../../types";

type ChangeUserStatusDialogProps = {
  user: UserItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ChangeUserStatusDialog({
  user,
  open,
  onOpenChange,
}: ChangeUserStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<"ACTIVE" | "SUSPENDED" | "">(
    ""
  );

  const { mutate: updateStatus, isPending } = useUpdateUserStatus();

  const handleOpenChange = (newOpen: boolean) => {
    if (isPending) return;
    if (newOpen && user) {
      const initialStatus =
        user.status === "ACTIVE" || user.status === "SUSPENDED"
          ? user.status
          : "ACTIVE";
      setSelectedStatus(initialStatus);
    } else {
      setSelectedStatus("");
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStatus) {
      toast.error("يرجى اختيار حالة المستخدم");
      return;
    }

    if (!user?.id) {
      toast.error("معرف المستخدم غير متوفر");
      return;
    }

    updateStatus(
      {
        id: user.id,
        payload: { status: selectedStatus },
      },
      {
        onSuccess: (result) => {
          toast.success(result?.message || "تم تغيير حالة المستخدم بنجاح");
          onOpenChange(false);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "تعذر تغيير حالة المستخدم"));
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-w-md bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b border-sidebar/20 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <UserCog className="size-6 text-primary" />
            <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
              تغيير حالة المستخدم
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
          {user && (
            <div className="p-3 rounded-lg bg-muted/60 dark:bg-popover-dark/60 text-sm flex flex-col gap-2 border border-sidebar/10 dark:border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-sidebar/70 dark:text-white/60">الاسم:</span>
                <span className="font-semibold text-sidebar dark:text-white">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sidebar/70 dark:text-white/60">البريد الإلكتروني:</span>
                <span className="text-sidebar/90 dark:text-white/80 text-xs">
                  {user.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sidebar/70 dark:text-white/60">الحالة الحالية:</span>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                    statusBadgeStyles[user.status as UserStatus] || "text-sidebar bg-muted"
                  )}
                >
                  {statusValue[user.status as UserStatus] || user.status}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-sidebar dark:text-white">
              الحالة الجديدة <span className="text-destructive">*</span>
            </label>
            <Select
              value={selectedStatus}
              onValueChange={(val) =>
                setSelectedStatus(val as "ACTIVE" | "SUSPENDED")
              }
              disabled={isPending}
            >
              <SelectTrigger className="w-full bg-white dark:bg-card-dark text-sidebar dark:text-white border-sidebar/30 dark:border-white/20">
                <SelectValue placeholder="اختر الحالة..." />
              </SelectTrigger>
              <SelectContent className="bg-popover dark:bg-card-dark text-sidebar dark:text-white">
                <SelectItem value="ACTIVE">نشط</SelectItem>
                <SelectItem value="SUSPENDED">موقوف</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
              className="px-5 py-2 cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isPending || !selectedStatus}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 flex items-center gap-2 cursor-pointer"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              <span>{isPending ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
