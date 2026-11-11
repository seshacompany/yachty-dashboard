import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
import {
  DeleteFaqDialog,
  FaqCard,
  FaqDetailsDialog,
  FaqFormDialog,
  FaqsFilterBar,
  FaqsSkeleton,
} from "../components";
import { useGetFaqs } from "../hooks";
import type { FaqItem } from "../types";

const SKELETON_COUNT = 6;
const ITEMS_PER_PAGE = 9;

export function FrequentlyAskedQuestionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const sortOrder = (searchParams.get("sortOrder") as "ASC" | "DESC") || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useGetFaqs({
    search,
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<FaqItem | null>(null);
  const [viewingFaq, setViewingFaq] = useState<FaqItem | null>(null);

  return (
    <div className="w-full flex flex-col gap-6" dir="rtl">
      {/* Top Filter and Action Bar */}
      <FaqsFilterBar
        onAddNew={() => setIsCreateOpen(true)}
        totalItems={meta?.totalItems}
      />

      {/* Main Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <FaqsSkeleton key={idx} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-sidebar/20 dark:border-white/10 rounded-2xl py-20 text-center bg-card/50 dark:bg-card-dark/50">
          <div className="rounded-full bg-primary/10 p-4 text-primary">
            <HelpCircle className="size-8" />
          </div>
          <p className="text-lg font-bold text-sidebar dark:text-white">
            لا توجد أسئلة شائعة
          </p>
          <p className="text-sm text-secondary-light max-w-sm">
            {search
              ? "لم يتم العثور على أي أسئلة تطابق معايير البحث الحالية."
              : "لم يتم إضافة أي أسئلة شائعة حتى الآن. اضغط على زر الإضافة للبدء."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <FaqCard
              key={item.id}
              faq={item}
              onView={(faq) => setViewingFaq(faq)}
              onEdit={(faq) => setEditingFaq(faq)}
              onDelete={(faq) => setDeletingFaq(faq)}
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

      {/* Create Modal Dialog */}
      <FaqFormDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        faq={null}
      />

      {/* Edit Modal Dialog */}
      <FaqFormDialog
        open={Boolean(editingFaq)}
        onOpenChange={(open) => {
          if (!open) setEditingFaq(null);
        }}
        faq={editingFaq}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteFaqDialog
        open={Boolean(deletingFaq)}
        onOpenChange={(open) => {
          if (!open) setDeletingFaq(null);
        }}
        faq={deletingFaq}
      />

      {/* Details View Modal */}
      <FaqDetailsDialog
        open={Boolean(viewingFaq)}
        onOpenChange={(open) => {
          if (!open) setViewingFaq(null);
        }}
        faq={viewingFaq}
      />
    </div>
  );
}

export default FrequentlyAskedQuestionsPage;
