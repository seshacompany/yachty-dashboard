import { useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  Bell,
  Check,
  CreditCard,
  LifeBuoy,
  Loader2,
  Star,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/formatDate";
import { getApiErrorMessage } from "@/lib/axios";
import { useReadNotification } from "../hooks/useReadNotification";
import { useDeleteNotification } from "../hooks/useDeleteNotification";
import type { NotificationItem as NotificationItemType } from "../types";

type NotificationItemProps = {
  item: NotificationItemType;
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "REVIEW":
      return {
        icon: Star,
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      };
    case "PAYMENT":
      return {
        icon: CreditCard,
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      };
    case "SUPPORT":
      return {
        icon: LifeBuoy,
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      };
    case "REPORT":
      return {
        icon: AlertTriangle,
        color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      };
    default:
      return {
        icon: Bell,
        color: "text-primary bg-primary/10 border-primary/20",
      };
  }
};

export function NotificationItem({ item }: NotificationItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const { mutate: readNotification } = useReadNotification();
  const { mutate: deleteNotification } = useDeleteNotification();

  const iconInfo = getNotificationIcon(item.type);
  const IconComponent = iconInfo.icon;
  const timeAgo = formatTimeAgo(item.createdAt);

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.isRead || isReading) return;

    setIsReading(true);
    readNotification(item.id, {
      onSuccess: () => {
        setIsReading(false);
      },
      onError: (err) => {
        setIsReading(false);
        toast.error(getApiErrorMessage(err, "تعذر تحديث حالة الإشعار"));
      },
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;

    setIsDeleting(true);
    deleteNotification(item.id, {
      onSuccess: () => {
        setIsDeleting(false);
      },
      onError: (err) => {
        setIsDeleting(false);
        toast.error(getApiErrorMessage(err, "تعذر حذف الإشعار"));
      },
    });
  };

  const handleCardClick = () => {
    if (!item.isRead && !isReading) {
      setIsReading(true);
      readNotification(item.id, {
        onSuccess: () => {
          setIsReading(false);
        },
        onError: () => {
          setIsReading(false);
        },
      });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "group relative p-3.5 flex items-start gap-3 transition-colors cursor-pointer border-b border-border last:border-0",
        item.isRead
          ? "bg-transparent hover:bg-muted/40"
          : "bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/15"
      )}
    >
      {/* Type Icon */}
      <div
        className={cn(
          "size-9 rounded-full shrink-0 flex items-center justify-center border",
          iconInfo.color
        )}
      >
        <IconComponent className="size-4.5" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {!item.isRead && (
              <span className="size-2 rounded-full bg-primary shrink-0" />
            )}
            <h4
              className={cn(
                "text-sm font-semibold truncate text-navy dark:text-coastal-white",
                !item.isRead && "font-bold text-primary dark:text-coastal-white"
              )}
            >
              {item.title}
            </h4>
          </div>

          <span className="text-[11px] text-muted-foreground shrink-0 font-medium">
            {timeAgo}
          </span>
        </div>

        <p className="text-xs text-foreground/80 dark:text-foreground/70 whitespace-pre-line leading-relaxed line-clamp-3">
          {item.message}
        </p>
      </div>

      {/* Action Buttons (Read / Delete) */}
      <div className="flex items-center gap-1 shrink-0 self-center opacity-80 group-hover:opacity-100 transition-opacity">
        {!item.isRead && (
          <button
            type="button"
            onClick={handleMarkAsRead}
            disabled={isReading}
            title="تعيين كمقروء"
            className="size-7 rounded-md flex items-center justify-center text-primary hover:bg-primary/10 transition-colors cursor-pointer"
          >
            {isReading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Check className="size-3.5" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          title="حذف الإشعار"
          className="size-7 rounded-md flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          {isDeleting ? (
            <Loader2 className="size-3.5 animate-spin text-destructive" />
          ) : (
            <Trash2 className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
