import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useDeleteStaff } from "../hooks/useDeleteStaff";
import type { StaffItem } from "../types/staff.types";

interface DeleteStaffDialogProps {
  staff: StaffItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteStaffDialog({
  staff,
  open,
  onOpenChange,
}: DeleteStaffDialogProps) {
  const { mutateAsync: deleteStaff, isPending } = useDeleteStaff();

  if (!staff) return null;

  const handleDelete = async () => {
    try {
      await deleteStaff(staff.id);
      onOpenChange(false);
    } catch {
      // Handled in mutation hook toast
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isPending && onOpenChange(val)}>
      <DialogContent
        dir="rtl"
        className="max-w-md bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="flex flex-col items-center gap-3 text-center border-b-0 pb-2">
          <div className="size-14 rounded-full bg-destructive/15 text-destructive flex items-center justify-center">
            <AlertTriangle className="size-7" />
          </div>
          <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
            حذف الموظف
          </DialogTitle>
          <DialogDescription className="sr-only">
            تأكيد حذف الموظف
          </DialogDescription>
        </DialogHeader>

        <div className="text-center space-y-2 py-2">
          <p className="text-sm text-sidebar/80 dark:text-white/80">
            هل أنت متأكد من رغبتك في حذف الموظف{" "}
            <span className="font-bold text-destructive">
              {staff.staff_name}
            </span>
            ؟
          </p>
          <p className="text-xs text-sidebar/60 dark:text-white/60">
            لن يتمكن هذا الموظف من تسجيل الدخول إلى لوحة التحكم بعد الحذف.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4 border-t border-sidebar/10 dark:border-white/10">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="px-5 cursor-pointer"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="px-6 flex items-center gap-2 cursor-pointer"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            <span>{isPending ? "جاري الحذف..." : "تأكيد الحذف"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

