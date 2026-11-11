import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { termFormSchema, type TermFormValues } from "../schemas";
import { useCreateTerm, useUpdateTerm } from "../hooks";
import type { TermItem } from "../types";

type TermFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  term?: TermItem | null;
};

export function TermFormDialog({
  open,
  onOpenChange,
  term,
}: TermFormDialogProps) {
  const isEditMode = Boolean(term?.id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TermFormValues>({
    resolver: zodResolver(termFormSchema),
    defaultValues: {
      title: "",
      content: "",
      isActive: false,
    },
  });

  const { mutateAsync: createTerm, isPending: isCreating } = useCreateTerm();
  const { mutateAsync: updateTerm, isPending: isUpdating } = useUpdateTerm();

  const isPending = isCreating || isUpdating || isSubmitting;
  const isActiveValue = watch("isActive");

  useEffect(() => {
    if (open) {
      if (term) {
        reset({
          title: term.title,
          content: term.content,
          isActive: term.isActive,
        });
      } else {
        reset({
          title: "",
          content: "",
          isActive: false,
        });
      }
    }
  }, [open, term, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (data: TermFormValues) => {
    try {
      if (isEditMode && term) {
        await updateTerm({ id: term.id, payload: data });
      } else {
        await createTerm(data);
      }
      onOpenChange(false);
    } catch {
      // Error handling is managed inside hooks
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir="rtl"
        className="max-w-lg bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
            {isEditMode ? "تعديل الشرط" : "إضافة شرط جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="term-title" className="text-sm font-medium">
              العنوان <span className="text-destructive">*</span>
            </Label>
            <Input
              id="term-title"
              placeholder="أدخل عنوان الشرط (مثال: التعريف بالمنصة، مسؤولية صاحب السكن)..."
              {...register("title")}
              disabled={isPending}
              className="bg-muted/40 dark:bg-popover-dark/40"
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Content Field with Helper Hint */}
          <div className="space-y-2">
            <Label htmlFor="term-content" className="text-sm font-medium">
              المحتوى / النص <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="term-content"
              rows={5}
              placeholder="أدخل تفاصيل ومحتوى الشرط..."
              {...register("content")}
              disabled={isPending}
              className="bg-muted/40 dark:bg-popover-dark/40 resize-y"
            />
            {/* Arabic Helper Hint */}
            <div className="flex items-start gap-1.5 rounded-lg bg-primary/5 dark:bg-primary/10 p-2.5 text-xs text-primary dark:text-primary-foreground/90 border border-primary/10">
              <Info className="size-4 shrink-0 mt-0.5" />
              <span>
                إذا كان هناك أكثر من وصف أو نقطة، يرجى وضع فاصلة (,) بين كل عنصر والآخر ليتم عرضها كقائمة في التطبيق.
              </span>
            </div>
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content.message}</p>
            )}
          </div>

          {/* Active Status Checkbox */}
          <div className="flex items-center gap-3 py-2">
            <Checkbox
              id="term-isActive"
              checked={isActiveValue}
              onCheckedChange={(checked) => setValue("isActive", Boolean(checked))}
              disabled={isPending}
            />
            <Label
              htmlFor="term-isActive"
              className="text-sm cursor-pointer text-sidebar/90 dark:text-white/90"
            >
              تفعيل الشرط وعرضه في المنصة
            </Label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-sidebar/10 dark:border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="px-5 cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="px-5 flex items-center gap-2 cursor-pointer"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              <span>
                {isPending
                  ? "جاري الحفظ..."
                  : isEditMode
                  ? "حفظ التعديلات"
                  : "إضافة الشرط"}
              </span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
