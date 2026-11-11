import { Eye, MessageSquareQuote, RefreshCw, User } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import { Button } from "@/shared/ui/button";
import type { TicketCategory, TicketItem, TicketPriority, TicketStatus } from "../types";

type MessageCardProps = {
  ticket: TicketItem;
  onView: (ticket: TicketItem) => void;
  onUpdateStatus: (ticket: TicketItem) => void;
  onReply: (ticket: TicketItem) => void;
};

export const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; className: string }
> = {
  OPEN: {
    label: "مفتوحة",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  IN_PROGRESS: {
    label: "قيد المعالجة",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  RESOLVED: {
    label: "تم الحل",
    className: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  },
  CLOSED: {
    label: "مغلقة",
    className: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  },
};

export const CATEGORY_CONFIG: Record<TicketCategory, string> = {
  ACCOUNT: "الحساب",
  PROPERTY: "العقارات",
  PAYMENT: "المدفوعات",
  SUBSCRIPTION: "الاشتراكات",
  TECHNICAL: "مشكلة تقنية",
  COMPLAINT: "شكوى",
  OTHER: "أخرى",
};

export const PRIORITY_CONFIG: Record<
  TicketPriority,
  { label: string; className: string }
> = {
  LOW: {
    label: "منخفضة",
    className: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  },
  MEDIUM: {
    label: "متوسطة",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  HIGH: {
    label: "عالية",
    className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  },
  URGENT: {
    label: "عاجلة",
    className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 font-bold",
  },
};

export function MessageCard({
  ticket,
  onView,
  onUpdateStatus,
  onReply,
}: MessageCardProps) {
  const {
    userName,
    subject,
    message,
    category,
    status,
    createdAt,
  } = ticket;

  const formattedDate = createdAt ? formatDateToDDMMYYYY(createdAt) : "";
  const statusInfo = STATUS_CONFIG[status] || {
    label: status,
    className: "bg-muted text-foreground border-border",
  };
  const categoryLabel = CATEGORY_CONFIG[category] || category;

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex flex-col gap-3">
        {/* Card Header: Category & Status Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted/60 dark:bg-popover-dark/60 text-secondary-light border border-sidebar/10 dark:border-white/5">
            {categoryLabel}
          </span>

          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${statusInfo.className}`}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* User Info Header with Avatar */}
        <div className="flex items-center gap-2 text-sm text-sidebar dark:text-white pt-1 border-b border-sidebar/10 dark:border-white/10 pb-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {userName ? userName.charAt(0) : <User className="size-3.5" />}
          </div>
          <span className="font-semibold text-sidebar dark:text-white truncate">
            {userName}
          </span>
        </div>

        {/* Subject & Message Preview */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-sidebar dark:text-white line-clamp-1">
            {subject}
          </h3>
          <p className="text-sm text-secondary-light line-clamp-3 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {/* Card Footer: Date & Actions */}
      <div className="flex items-center justify-between border-t border-sidebar/10 dark:border-white/10 pt-3 text-xs">
        <span className="text-secondary-light">{formattedDate}</span>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onView(ticket)}
            className="flex items-center gap-1 text-xs text-sidebar/80 dark:text-white/80 hover:text-primary cursor-pointer px-2 py-1"
            title="عرض التفاصيل"
          >
            <Eye className="size-3.5" />
            <span>عرض</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onUpdateStatus(ticket)}
            className="flex items-center gap-1 text-xs text-sidebar/80 dark:text-white/80 hover:text-primary cursor-pointer px-2 py-1"
            title="تغيير الحالة"
          >
            <RefreshCw className="size-3.5" />
            <span>الحالة</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onReply(ticket)}
            className="flex items-center gap-1 text-xs text-primary hover:bg-primary/10 cursor-pointer px-2 py-1 font-medium"
            title="إرسال رد"
          >
            <MessageSquareQuote className="size-3.5" />
            <span>رد</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const MessageItem = MessageCard;
export const TicketCard = MessageCard;
