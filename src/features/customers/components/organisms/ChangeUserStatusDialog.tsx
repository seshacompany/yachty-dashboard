import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, UserCog } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Button } from "@/shared/ui/button";
import { useUpdateUserStatus } from "../../hooks/useUpdateUserStatus";
import { statusOptions } from "../../data/tableData";
import type { UserItem, UserStatus } from "../../types";
import { UserSummaryCard } from "../molecules/UserSummaryCard";

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
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | "">("");
  const { mutate: updateStatus, isPending } = useUpdateUserStatus();

  useEffect(() => {
    if (open && user) {
      setSelectedStatus((user.status as UserStatus) || "pending");
    } else if (!open) {
      setSelectedStatus("");
    }
  }, [open, user]);

  const handleOpenChange = (newOpen: boolean) => {
    if (isPending) return;
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
      { id: user.id, payload: { status: selectedStatus } },
      { onSuccess: () => onOpenChange(false) },
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
          {user && <UserSummaryCard user={user} showStatus />}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-sidebar dark:text-white">
              الحالة الجديدة <span className="text-destructive">*</span>
            </label>
            <Select
              value={selectedStatus}
              onValueChange={(val) => setSelectedStatus(val as UserStatus)}
              disabled={isPending}
            >
              <SelectTrigger className="w-full bg-white dark:bg-card-dark text-sidebar dark:text-white border-sidebar/30 dark:border-white/20">
                <SelectValue placeholder="اختر الحالة..." />
              </SelectTrigger>
              <SelectContent
                dir="rtl"
                className="bg-popover dark:bg-card-dark text-sidebar dark:text-white"
              >
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
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
