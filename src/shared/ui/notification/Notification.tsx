import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Bell,
  CheckCheck,
  Inbox,
  Loader2,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getApiErrorMessage } from "@/lib/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useNotifications } from "./hooks/useNotifications";
import { useReadAllNotifications } from "./hooks/useReadAllNotifications";
import { useClearAllNotifications } from "./hooks/useClearAllNotifications";
import { NotificationItem } from "./components/NotificationItem";
import { NotificationSkeleton } from "./components/NotificationSkeleton";

export function Notification() {
  const [open, setOpen] = useState(false);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotifications({ limit: 10 });

  const { mutate: readAll, isPending: isReadingAll } = useReadAllNotifications();
  const { mutate: clearAll, isPending: isClearingAll } =
    useClearAllNotifications();

  // Flatten all paginated pages into a single chronological array
  const notifications = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page?.items ?? []);
  }, [data]);

  // Read unread count from the latest page or calculate from items
  const unreadCount = useMemo(() => {
    if (data?.pages?.[0]?.unreadCount !== undefined) {
      return data.pages[0].unreadCount;
    }
    return notifications.filter((item) => !item.isRead).length;
  }, [data, notifications]);

  // Refetch when dropdown opens or closes
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    refetch();
  };

  // Infinite scroll on reaching bottom of notification container
  const handleScroll = () => {
    if (!listContainerRef.current || !hasNextPage || isFetchingNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } =
      listContainerRef.current;

    // Detect when user scrolled to within 50px of the bottom
    if (scrollHeight - scrollTop - clientHeight < 50) {
      fetchNextPage();
    }
  };

  // Read all notifications
  const handleReadAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (unreadCount === 0 || isReadingAll) return;

    readAll(undefined, {
      onSuccess: (result) => {
        toast.success(
          result?.message || "تم تعيين جميع الإشعارات كمقروءة بنجاح"
        );
      },
      onError: (err) => {
        toast.error(
          getApiErrorMessage(err, "تعذر تعيين جميع الإشعارات كمقروءة")
        );
      },
    });
  };

  // Clear all notifications
  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notifications.length === 0 || isClearingAll) return;

    clearAll(undefined, {
      onSuccess: (result) => {
        toast.success(result?.message || "تم حذف جميع الإشعارات بنجاح");
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "تعذر حذف الإشعارات"));
      },
    });
  };

  return (
    <DropdownMenu dir="rtl" open={open} onOpenChange={handleOpenChange}>
      {/* Bell Trigger Button */}
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="الإشعارات"
          className={cn(
            "relative bg-primary dark:bg-sidebar-dark hover:bg-primary/90 dark:hover:bg-sidebar-dark/90 text-white transition-all duration-300 p-2.5 flex items-center justify-center rounded-xl cursor-pointer shadow-sm outline-none",
            open && "ring-2 ring-primary/40"
          )}
        >
          <Bell className="size-5" />

          {/* Unread Badge Count */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-destructive text-white text-[11px] font-extrabold rounded-full flex items-center justify-center border-2 border-background shadow-sm animate-in zoom-in">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      {/* Notifications Popover Content */}
      <DropdownMenuContent
        align="start"
        sideOffset={12}
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-96 max-w-sm p-0 bg-popover text-popover-foreground rounded-2xl shadow-2xl border border-border z-50 overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-muted/40">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-navy dark:text-coastal-white">
              الإشعارات
            </h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/15 text-primary">
                {unreadCount} غير مقروء
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleReadAll}
              disabled={unreadCount === 0 || isReadingAll}
              title="قراءة الكل"
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer",
                unreadCount === 0
                  ? "text-sidebar/40 dark:text-white/30 cursor-not-allowed"
                  : "text-primary hover:bg-primary/10"
              )}
            >
              {isReadingAll ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <CheckCheck className="size-3.5" />
              )}
              <span className="hidden sm:inline">قراءة الكل</span>
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              disabled={notifications.length === 0 || isClearingAll}
              title="حذف الكل"
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer",
                notifications.length === 0
                  ? "text-sidebar/40 dark:text-white/30 cursor-not-allowed"
                  : "text-destructive hover:bg-destructive/10"
              )}
            >
              {isClearingAll ? (
                <Loader2 className="size-3.5 animate-spin text-destructive" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
              <span className="hidden sm:inline">حذف الكل</span>
            </button>
          </div>
        </div>

        {/* Notification List Body with Infinite Scroll */}
        <div
          ref={listContainerRef}
          onScroll={handleScroll}
          className="max-h-80 sm:max-h-105 overflow-y-auto divide-y divide-border flex flex-col"
        >
          {/* Initial Loading Skeleton */}
          {isLoading ? (
            <NotificationSkeleton count={4} />
          ) : isError ? (
            /* Error State with Retry */
            <div className="flex flex-col items-center justify-center p-8 text-center gap-3">
              <p className="text-sm font-medium text-destructive">
                {getApiErrorMessage(error, "تعذر تحميل الإشعارات")}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <RefreshCw
                  className={cn("size-3.5", isFetching && "animate-spin")}
                />
                <span>إعادة المحاولة</span>
              </button>
            </div>
          ) : notifications.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center gap-3 text-muted-foreground">
              <div className="size-14 rounded-full bg-muted flex items-center justify-center">
                <Inbox className="size-7 text-muted-foreground/70" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-sm text-navy dark:text-coastal-white">
                  لا توجد إشعارات
                </p>
                <p className="text-xs">
                  ليس لديك أي إشعارات جديدة في الوقت الحالي
                </p>
              </div>
            </div>
          ) : (
            /* Notification Items List */
            <>
              {notifications.map((item) => (
                <NotificationItem key={item.id} item={item} />
              ))}

              {/* Next Page Loading Indicator */}
              {isFetchingNextPage && (
                <div className="flex items-center justify-center p-3 gap-2 text-xs font-medium text-muted-foreground bg-muted/20">
                  <Loader2 className="size-4 animate-spin text-primary" />
                  <span>جاري تحميل المزيد من الإشعارات...</span>
                </div>
              )}

              {/* End of Notifications Message */}
              {!hasNextPage && notifications.length > 0 && (
                <div className="py-3 px-4 text-center text-xs font-medium text-muted-foreground bg-muted/10">
                  انتهت الإشعارات
                </div>
              )}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}