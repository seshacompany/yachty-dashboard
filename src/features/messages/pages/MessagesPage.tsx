import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageSquareOff } from "lucide-react";
import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
import {
  MessageCard,
  MessageDetailsDialog,
  MessagesFilterBar,
  MessagesSkeleton,
  ReplyMessageDialog,
  UpdateStatusDialog,
} from "../components";
import { useGetTickets } from "../hooks";
import type {
  SortOrder,
  TicketCategory,
  TicketItem,
  TicketPriority,
  TicketStatus,
} from "../types";

const SKELETON_COUNT = 6;
const ITEMS_PER_PAGE = 9;

export function MessagesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const status = (searchParams.get("status") as TicketStatus) || undefined;
  const category = (searchParams.get("category") as TicketCategory) || undefined;
  const priority = (searchParams.get("priority") as TicketPriority) || undefined;
  const sortOrder = (searchParams.get("sortOrder") as SortOrder) || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useGetTickets({
    search,
    status,
    category,
    priority,
    sortOrder,
    page,
    limit: ITEMS_PER_PAGE,
  });

  const items = data?.items ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  // Modal dialog states
  const [viewingTicket, setViewingTicket] = useState<TicketItem | null>(null);
  const [statusTicket, setStatusTicket] = useState<TicketItem | null>(null);
  const [replyTicket, setReplyTicket] = useState<TicketItem | null>(null);

  const hasFilters = Boolean(search || status || category || priority);

  return (
    <div className="w-full flex flex-col gap-6" dir="rtl">
      {/* Filters Bar */}
      <MessagesFilterBar totalItems={meta?.totalItems} />

      {/* Main Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <MessagesSkeleton key={idx} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-sidebar/20 dark:border-white/10 rounded-2xl py-20 text-center bg-card/50 dark:bg-card-dark/50">
          <div className="rounded-full bg-primary/10 p-4 text-primary">
            <MessageSquareOff className="size-8" />
          </div>
          <p className="text-lg font-bold text-sidebar dark:text-white">
            لا توجد رسائل أو تذاكر دعم
          </p>
          <p className="text-sm text-secondary-light max-w-sm">
            {hasFilters
              ? "لم يتم العثور على أي رسائل تطابق معايير البحث والفلترة الحالية."
              : "لم يتم استلام أي رسائل أو استفسارات حتى الآن."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <MessageCard
              key={item.id}
              ticket={item}
              onView={(ticket) => setViewingTicket(ticket)}
              onUpdateStatus={(ticket) => setStatusTicket(ticket)}
              onReply={(ticket) => setReplyTicket(ticket)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <PaginationLayout
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Details Dialog */}
      <MessageDetailsDialog
        open={Boolean(viewingTicket)}
        onOpenChange={(open) => {
          if (!open) setViewingTicket(null);
        }}
        ticket={viewingTicket}
        onReply={(ticket) => setReplyTicket(ticket)}
        onUpdateStatus={(ticket) => setStatusTicket(ticket)}
      />

      {/* Update Status Dialog */}
      <UpdateStatusDialog
        open={Boolean(statusTicket)}
        onOpenChange={(open) => {
          if (!open) setStatusTicket(null);
        }}
        ticket={statusTicket}
      />

      {/* Reply Message Dialog */}
      <ReplyMessageDialog
        open={Boolean(replyTicket)}
        onOpenChange={(open) => {
          if (!open) setReplyTicket(null);
        }}
        ticket={replyTicket}
      />
    </div>
  );
}

export default MessagesPage;
