import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { faqFormSchema, type FaqFormValues } from "../schemas";
import { useCreateFaq, useUpdateFaq } from "../hooks";
import type { FaqItem } from "../types";

type FaqFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faq?: FaqItem | null;
};

export function FaqFormDialog({
  open,
  onOpenChange,
  faq,
}: FaqFormDialogProps) {
  const isEditMode = Boolean(faq?.id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: "",
      answer: "",
      isActive: true,
    },
  });

  const { mutateAsync: createFaq, isPending: isCreating } = useCreateFaq();
  const { mutateAsync: updateFaq, isPending: isUpdating } = useUpdateFaq();

  const isPending = isCreating || isUpdating || isSubmitting;
  const isActiveValue = watch("isActive");

  useEffect(() => {
    if (open) {
      if (faq) {
        reset({
          question: faq.question,
          answer: faq.answer,
          isActive: faq.isActive,
          sortOrder: faq.sortOrder,
        });
      } else {
        reset({
          question: "",
          answer: "",
          isActive: true,
        });
      }
    }
  }, [open, faq, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (data: FaqFormValues) => {
    try {
      if (isEditMode && faq) {
        await updateFaq({ id: faq.id, payload: data });
      } else {
        await createFaq(data);
      }
      onOpenChange(false);
    } catch {
      // Handled in hooks
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
            {isEditMode ? "تعديل السؤال" : "إضافة سؤال جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="faq-question" className="text-sm font-medium">
              السؤال <span className="text-destructive">*</span>
            </Label>
            <Input
              id="faq-question"
              placeholder="أدخل نص السؤال..."
              {...register("question")}
              disabled={isPending}
              className="bg-muted/40 dark:bg-popover-dark/40"
            />
            {errors.question && (
              <p className="text-xs text-destructive">{errors.question.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="faq-answer" className="text-sm font-medium">
              الإجابة <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="faq-answer"
              rows={4}
              placeholder="أدخل إجابة السؤال بالتفصيل..."
              {...register("answer")}
              disabled={isPending}
              className="bg-muted/40 dark:bg-popover-dark/40"
            />
            {errors.answer && (
              <p className="text-xs text-destructive">{errors.answer.message}</p>
            )}
          </div>

          <div className="flex items-center gap-3 py-2">
            <Checkbox
              id="faq-isActive"
              checked={isActiveValue}
              onCheckedChange={(checked) => setValue("isActive", Boolean(checked))}
              disabled={isPending}
            />
            <Label
              htmlFor="faq-isActive"
              className="text-sm cursor-pointer text-sidebar/90 dark:text-white/90"
            >
              تفعيل السؤال وعرضه في المنصة
            </Label>
          </div>

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
                  : "إضافة السؤال"}
              </span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
