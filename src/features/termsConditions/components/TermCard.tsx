import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import { Button } from "@/shared/ui/button";
import type { TermItem } from "../types";

type TermCardProps = {
  term: TermItem;
  onView: (term: TermItem) => void;
  onEdit: (term: TermItem) => void;
  onDelete: (term: TermItem) => void;
};

export function TermCard({ term, onView, onEdit, onDelete }: TermCardProps) {
  const { title, content, isActive, createdAt } = term;
  const formattedDate = createdAt ? formatDateToDDMMYYYY(createdAt) : "";

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-sidebar dark:text-white line-clamp-2 leading-relaxed">
            {title}
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onView(term)}
              title="عرض التفاصيل"
              className="text-sidebar/70 hover:text-primary dark:text-white/70 dark:hover:text-primary cursor-pointer"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onEdit(term)}
              title="تعديل"
              className="text-sidebar/70 hover:text-primary dark:text-white/70 dark:hover:text-primary cursor-pointer"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onDelete(term)}
              title="حذف"
              className="text-sidebar/70 hover:text-destructive dark:text-white/70 dark:hover:text-destructive cursor-pointer"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-secondary-light line-clamp-3 leading-relaxed">
          {content}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-sidebar/10 dark:border-white/10 pt-3 text-xs">
        <span className="text-secondary-light">{formattedDate}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 font-medium ${
            isActive
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
          }`}
        >
          {isActive ? "نشط" : "غير نشط"}
        </span>
      </div>
    </div>
  );
}

// Alias for backwards compatibility
export const TermsCard = TermCard;
