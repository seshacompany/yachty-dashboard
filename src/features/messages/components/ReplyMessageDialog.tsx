import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2, Mail, MessageSquare, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { replyMessageSchema, type ReplyMessageFormValues } from "../schemas";
import { useSendReplyMessage } from "../hooks";
import type { TicketItem } from "../types";

type ReplyMessageDialogProps = {
  ticket: TicketItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReplyMessageDialog({
  ticket,
  open,
  onOpenChange,
}: ReplyMessageDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReplyMessageFormValues>({
    resolver: zodResolver(replyMessageSchema),
    defaultValues: {
      channel: "EMAIL",
      message: "",
    },
  });

  const { mutateAsync: sendReply, isPending: isSending } = useSendReplyMessage();
  const isPending = isSending || isSubmitting;
  const selectedChannel = watch("channel");

  useEffect(() => {
    if (open) {
      reset({
        channel: "EMAIL",
        message: "",
      });
    }
  }, [open, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (data: ReplyMessageFormValues) => {
    if (!ticket?.id || data.channel === "WHATSAPP") return;
    try {
      await sendReply({
        id: ticket.id,
        payload: {
          channel: data.channel,
          message: data.message,
        },
      });
      onOpenChange(false);
    } catch {
      // Handled in hook
    }
  };

  const isWhatsAppSelected = selectedChannel === "WHATSAPP";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir="rtl"
        className="max-w-lg bg-white dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl border border-sidebar/20 dark:border-white/10 shadow-xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <Send className="size-5" />
            <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
              إرسال رد على التذكرة
            </DialogTitle>
          </div>
        </DialogHeader>

        {ticket && (
          <div className="rounded-xl bg-slate-50 dark:bg-popover-dark/50 p-3 border border-sidebar/10 dark:border-white/5 flex flex-col gap-1 text-xs text-secondary-light">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sidebar dark:text-white">
                {ticket.userName} ({ticket.userEmail})
              </span>
              <span className="font-mono text-primary font-bold">
                {ticket.ticketNumber}
              </span>
            </div>
            <span className="truncate">الموضوع: {ticket.subject}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Channel Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-sidebar dark:text-white">
              وسيلة الإرسال <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setValue("channel", "EMAIL")}
                className={`flex items-center justify-center gap-2 rounded-xl p-3 text-sm font-medium border transition-all cursor-pointer ${
                  selectedChannel === "EMAIL"
                    ? "border-primary bg-primary/10 text-primary shadow-xs font-bold"
                    : "border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-popover-dark/40 text-sidebar dark:text-white"
                }`}
              >
                <Mail className="size-4" />
                <span>البريد الإلكتروني (EMAIL)</span>
              </button>

              <button
                type="button"
                onClick={() => setValue("channel", "WHATSAPP")}
                className={`flex items-center justify-center gap-2 rounded-xl p-3 text-sm font-medium border transition-all cursor-pointer ${
                  selectedChannel === "WHATSAPP"
                    ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-xs font-bold"
                    : "border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-popover-dark/40 text-sidebar dark:text-white"
                }`}
              >
                <MessageSquare className="size-4" />
                <span>واتساب (WHATSAPP)</span>
              </button>
            </div>
          </div>

          {/* WhatsApp Disabled Warning Banner */}
          {isWhatsAppSelected && (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                هذه الخاصية موقوفة حالياً، يرجى استخدام البريد الإلكتروني.
              </p>
            </div>
          )}

          {/* Message Textarea */}
          <div className="space-y-2">
            <Label htmlFor="reply-message" className="text-sm font-medium text-sidebar dark:text-white">
              نص الرد <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="reply-message"
              rows={5}
              placeholder="اكتب ردك الواضح والمفصل هنا..."
              {...register("message")}
              disabled={isPending || isWhatsAppSelected}
              className="bg-white dark:bg-popover-dark/40 border border-sidebar/20 dark:border-white/10 text-sidebar dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 resize-y"
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          {/* Form Actions */}
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
              disabled={isPending || isWhatsAppSelected}
              className="px-5 flex items-center gap-2 cursor-pointer"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              <span>{isPending ? "جاري الإرسال..." : "إرسال الرد"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
