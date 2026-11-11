import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { updateStatusSchema, type UpdateStatusFormValues } from "../schemas";
import { useUpdateTicketStatus } from "../hooks";
import { STATUS_CONFIG } from "./MessageCard";
import type { TicketItem, TicketStatus } from "../types";

type UpdateStatusDialogProps = {
  ticket: TicketItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const STATUS_ITEMS: { value: TicketStatus; description: string }[] = [
  { value: "OPEN", description: "التذكرة قيد الانتظار ولم يتم البدء في معالجتها" },
  { value: "IN_PROGRESS", description: "جاري العمل على متابعة وحل المشكلة" },
  { value: "RESOLVED", description: "تم حل المشكلة والرد على العميل بنجاح" },
  { value: "CLOSED", description: "تم إغلاق التذكرة نهائياً" },
];

export function UpdateStatusDialog({
  ticket,
  open,
  onOpenChange,
}: UpdateStatusDialogProps) {
  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateStatusFormValues>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      status: "OPEN",
    },
  });

  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateTicketStatus();

  const isPending = isUpdating || isSubmitting;
  const currentStatus = watch("status");

  useEffect(() => {
    if (open && ticket) {
      reset({
        status: ticket.status,
      });
    }
  }, [open, ticket, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (data: UpdateStatusFormValues) => {
    if (!ticket?.id) return;
    try {
      await updateStatus({ id: ticket.id, payload: data });
      onOpenChange(false);
    } catch {
      // Handled in hook
    }
  };

  const isCurrentStatusUnchanged = Boolean(ticket && currentStatus === ticket.status);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir="rtl"
        className="max-w-md bg-white dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl border border-sidebar/20 dark:border-white/10 shadow-xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <RefreshCw className="size-5" />
            <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
              تحديث حالة التذكرة
            </DialogTitle>
          </div>
        </DialogHeader>

        {ticket && (
          <div className="rounded-xl bg-slate-50 dark:bg-popover-dark/50 p-3 border border-sidebar/10 dark:border-white/5 flex items-center justify-between text-xs">
            <span className="text-secondary-light">رقم التذكرة:</span>
            <span className="font-mono text-primary font-bold">
              {ticket.ticketNumber}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-2.5">
            <Label className="text-sm font-medium text-sidebar dark:text-white">اختر الحالة الجديدة:</Label>

            <div className="space-y-2">
              {STATUS_ITEMS.map((item) => {
                const config = STATUS_CONFIG[item.value];
                const isSelected = currentStatus === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setValue("status", item.value)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-right cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-xs font-bold"
                        : "border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-popover-dark/40"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-sidebar dark:text-white">
                        {config.label}
                      </span>
                      <span className="text-xs text-secondary-light">
                        {item.description}
                      </span>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border ${config.className}`}
                    >
                      {config.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-sidebar/10 dark:border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="px-5 border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark text-sidebar dark:text-white hover:bg-slate-50 dark:hover:bg-popover-dark/40 cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isPending || isCurrentStatusUnchanged}
              className="px-5 flex items-center gap-2 cursor-pointer"
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
