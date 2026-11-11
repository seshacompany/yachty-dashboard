import { Calendar, Info, Mail, MessageSquareQuote, Phone, RefreshCw, User } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import { CATEGORY_CONFIG, STATUS_CONFIG } from "./MessageCard";
import type { TicketItem } from "../types";

type MessageDetailsDialogProps = {
  ticket: TicketItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReply?: (ticket: TicketItem) => void;
  onUpdateStatus?: (ticket: TicketItem) => void;
};

export function MessageDetailsDialog({
  ticket,
  open,
  onOpenChange,
  onReply,
  onUpdateStatus,
}: MessageDetailsDialogProps) {
  if (!ticket) return null;

  const formattedCreatedAt = ticket.createdAt
    ? formatDateToDDMMYYYY(ticket.createdAt)
    : "-";
  const formattedUpdatedAt = ticket.updatedAt
    ? formatDateToDDMMYYYY(ticket.updatedAt)
    : "-";
  const formattedClosedAt = ticket.closedAt
    ? formatDateToDDMMYYYY(ticket.closedAt)
    : null;

  const statusInfo = STATUS_CONFIG[ticket.status] || {
    label: ticket.status,
    className: "bg-muted text-foreground",
  };
  const categoryLabel = CATEGORY_CONFIG[ticket.category] || ticket.category;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-w-xl bg-white dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl border border-sidebar/20 dark:border-white/10 shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Info className="size-5" />
              <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
                تفاصيل التذكرة
              </DialogTitle>
            </div>
            <span className="font-mono text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
              {ticket.ticketNumber}
            </span>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-popover-dark/50 border border-sidebar/10 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-light">الحالة:</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${statusInfo.className}`}
              >
                {statusInfo.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-light">القسم:</span>
              <span className="text-xs font-semibold text-sidebar dark:text-white">
                {categoryLabel}
              </span>
            </div>
          </div>

          {/* User Information */}
          <div className="rounded-xl border border-sidebar/10 dark:border-white/10 p-4 space-y-2.5 bg-slate-50/70 dark:bg-card-dark/50">
            <h4 className="text-xs font-bold text-secondary-light">معلومات العميل:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                <User className="size-3.5 text-primary shrink-0" />
                <span className="text-secondary-light">الاسم:</span>
                <span className="font-semibold text-sidebar dark:text-white">
                  {ticket.userName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-primary shrink-0" />
                <span className="text-secondary-light">البريد:</span>
                <span className="font-semibold text-sidebar dark:text-white truncate" title={ticket.userEmail}>
                  {ticket.userEmail}
                </span>
              </div>

              {ticket.userPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-primary shrink-0" />
                  <span className="text-secondary-light">الهاتف:</span>
                  <span className="font-semibold text-sidebar dark:text-white" dir="ltr">
                    {ticket.userPhone}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="size-3.5 text-primary shrink-0" />
                <span className="text-secondary-light">تاريخ الإنشاء:</span>
                <span className="font-semibold text-sidebar dark:text-white">
                  {formattedCreatedAt}
                </span>
              </div>
            </div>
          </div>

          {/* Subject & Message Content */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-secondary-light">موضوع الاستفسار:</h4>
            <p className="text-base font-bold text-sidebar dark:text-white leading-relaxed">
              {ticket.subject}
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-secondary-light">نص الرسالة:</h4>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-popover-dark/40 border border-sidebar/10 dark:border-white/5 text-sm text-sidebar/90 dark:text-white/90 leading-relaxed whitespace-pre-wrap">
              {ticket.message}
            </div>
          </div>

          {/* Additional Dates */}
          <div className="flex flex-wrap justify-between gap-2 text-xs text-secondary-light pt-1">
            <span>آخر تحديث: {formattedUpdatedAt}</span>
            {formattedClosedAt && <span>تاريخ الإغلاق: {formattedClosedAt}</span>}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-sidebar/10 dark:border-white/10 pt-4">
            <div className="flex items-center gap-2">
              {onReply && (
                <Button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    onReply(ticket);
                  }}
                  className="flex items-center gap-1.5 px-4 text-xs cursor-pointer"
                >
                  <MessageSquareQuote className="size-4" />
                  <span>إرسال رد</span>
                </Button>
              )}

              {onUpdateStatus && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false);
                    onUpdateStatus(ticket);
                  }}
                  className="flex items-center gap-1.5 px-3.5 text-xs border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark text-sidebar dark:text-white hover:bg-slate-50 dark:hover:bg-popover-dark/40 cursor-pointer"
                >
                  <RefreshCw className="size-3.5" />
                  <span>تغيير الحالة</span>
                </Button>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-5 text-xs border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark text-sidebar dark:text-white hover:bg-slate-50 dark:hover:bg-popover-dark/40 cursor-pointer"
            >
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
