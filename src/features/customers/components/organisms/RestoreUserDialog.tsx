import { toast } from "sonner";
import { Loader2, RotateCcw } from "lucide-react";
import { getApiErrorMessage } from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useRestoreUser } from "../../hooks/useRestoreUser";
import { getUserDisplayName, type UserItem } from "../../types";

type RestoreUserDialogProps = {
  user: UserItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RestoreUserDialog({
  user,
  open,
  onOpenChange,
}: RestoreUserDialogProps) {
  const { mutate: restore, isPending } = useRestoreUser();

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const handleConfirm = () => {
    if (!user?.id) {
      toast.error("معرف المستخدم غير متوفر");
      return;
    }

    restore(user.id, {
      onSuccess: (result) => {
        toast.success(result?.message || "تم استعادة المستخدم بنجاح");
        onOpenChange(false);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "تعذر استعادة المستخدم"));
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir="rtl"
        className="max-w-md bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b border-sidebar/20 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <RotateCcw className="size-6 text-primary" />
            <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
              تأكيد استعادة المستخدم
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          {user && (
            <div className="p-3 rounded-lg bg-muted/60 dark:bg-popover-dark/60 text-sm flex flex-col gap-2 border border-sidebar/10 dark:border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-sidebar/70 dark:text-white/60">
                  الاسم:
                </span>
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
            </div>
          )}

          <p className="text-sm text-sidebar/80 dark:text-white/70">
            هل أنت متأكد من رغبتك في استعادة هذا المستخدم وإلغاء الحذف؟
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="px-5 py-2 cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 flex items-center gap-2 cursor-pointer"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              <span>{isPending ? "جاري الاستعادة..." : "تأكيد الاستعادة"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
