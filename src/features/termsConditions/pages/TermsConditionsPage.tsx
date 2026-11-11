import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
import {
  DeleteTermDialog,
  TermCard,
  TermDetailsDialog,
  TermFormDialog,
  TermsFilterBar,
  TermsSkeleton,
} from "../components";
import { useGetTerms } from "../hooks";
import type { TermItem } from "../types";

const SKELETON_COUNT = 6;
const ITEMS_PER_PAGE = 9;

export function TermsConditionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const sortOrder = (searchParams.get("sortOrder") as "ASC" | "DESC") || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useGetTerms({
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
  const [editingTerm, setEditingTerm] = useState<TermItem | null>(null);
  const [deletingTerm, setDeletingTerm] = useState<TermItem | null>(null);
  const [viewingTerm, setViewingTerm] = useState<TermItem | null>(null);

  return (
    <div className="w-full flex flex-col gap-6" dir="rtl">
      {/* Top Filter and Action Bar */}
      <TermsFilterBar
        onAddNew={() => setIsCreateOpen(true)}
        totalItems={meta?.totalItems}
      />

      {/* Main Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <TermsSkeleton key={idx} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-sidebar/20 dark:border-white/10 rounded-2xl py-20 text-center bg-card/50 dark:bg-card-dark/50">
          <div className="rounded-full bg-primary/10 p-4 text-primary">
            <ShieldAlert className="size-8" />
          </div>
          <p className="text-lg font-bold text-sidebar dark:text-white">
            لا توجد شروط وأحكام
          </p>
          <p className="text-sm text-secondary-light max-w-sm">
            {search
              ? "لم يتم العثور على أي شروط تطابق معايير البحث الحالية."
              : "لم يتم إضافة أي شروط وأحكام حتى الآن. اضغط على زر الإضافة للبدء."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <TermCard
              key={item.id}
              term={item}
              onView={(term) => setViewingTerm(term)}
              onEdit={(term) => setEditingTerm(term)}
              onDelete={(term) => setDeletingTerm(term)}
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
      <TermFormDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        term={null}
      />

      {/* Edit Modal Dialog */}
      <TermFormDialog
        open={Boolean(editingTerm)}
        onOpenChange={(open) => {
          if (!open) setEditingTerm(null);
        }}
        term={editingTerm}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteTermDialog
        open={Boolean(deletingTerm)}
        onOpenChange={(open) => {
          if (!open) setDeletingTerm(null);
        }}
        term={deletingTerm}
      />

      {/* Details View Modal */}
      <TermDetailsDialog
        open={Boolean(viewingTerm)}
        onOpenChange={(open) => {
          if (!open) setViewingTerm(null);
        }}
        term={viewingTerm}
      />
    </div>
  );
}

export default TermsConditionsPage;
