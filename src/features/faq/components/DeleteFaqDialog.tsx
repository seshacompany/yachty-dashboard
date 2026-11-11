import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useDeleteFaq } from "../hooks";
import type { FaqItem } from "../types";

type DeleteFaqDialogProps = {
  faq: FaqItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteFaqDialog({
  faq,
  open,
  onOpenChange,
}: DeleteFaqDialogProps) {
  const { mutateAsync: deleteFaq, isPending } = useDeleteFaq();

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const handleConfirm = async () => {
    if (!faq?.id) return;
    try {
      await deleteFaq(faq.id);
      onOpenChange(false);
    } catch {
      // Handled in hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir="rtl"
        className="max-w-md bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-6" />
            <DialogTitle className="text-xl font-bold text-destructive">
              حذف السؤال
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          {faq && (
            <div className="p-3 rounded-lg bg-muted/60 dark:bg-popover-dark/60 text-sm flex flex-col gap-1 border border-sidebar/10 dark:border-white/5">
              <span className="text-secondary-light text-xs">نص السؤال:</span>
              <span className="font-semibold text-sidebar dark:text-white line-clamp-2">
                {faq.question}
              </span>
            </div>
          )}

          <p className="text-sm text-sidebar/80 dark:text-white/70">
            هل أنت متأكد من رغبتك في حذف هذا السؤال؟ لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="px-5 cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={isPending}
              className="px-5 flex items-center gap-2 cursor-pointer"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              <span>{isPending ? "جاري الحذف..." : "تأكيد الحذف"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
