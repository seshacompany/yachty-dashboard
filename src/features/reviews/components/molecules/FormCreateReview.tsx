import { getApiErrorMessage } from "@/lib/axios";
import { DialogClose } from "@/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateReview } from "../../hooks/useCreateReview";
import {
  CreateReviewSchema,
  type CreateReviewType,
} from "../../schemas/create.review";
import { InputField } from "../atoms/InputField";
import InputRatingReview from "../atoms/InputRatingReview";

type FormCreateReviewProps = {
  onSuccess?: () => void;
};

export function FormCreateReview({ onSuccess }: FormCreateReviewProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateReviewType>({
    resolver: zodResolver(CreateReviewSchema),
  });

  const { mutateAsync: createReview, isPending } = useCreateReview();

  const onSubmit = async (data: CreateReviewType) => {
    try {
      const result = await createReview(data);
      toast.success(result?.message || "تم إضافة التقييم بنجاح");
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء الإرسال"));
    }
  };

  const submitting = isSubmitting || isPending;

  return (
    <form dir="rtl" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="px-4 pt-4 space-y-4">
        <InputField
          label="اسم العميل"
          name="name"
          register={register}
          error={errors.name?.message}
          placeHolder="محمد أحمد السعيد"
        />
        <InputField
          label="المسمى الوظيفي"
          name="position"
          register={register}
          error={errors.position?.message}
          placeHolder="مستثمر عقاري"
        />
        <Controller
          name="stars"
          control={control}
          render={({ field }) => (
            <InputRatingReview
              value={Number(field.value) || 0}
              onChange={(val) => field.onChange(+val)}
              error={errors.stars?.message}
            />
          )}
        />
        <InputField
          label="التقييم"
          name="description"
          register={register}
          error={errors.description?.message}
          placeHolder="أدخل نص التقييم..."
        />
      </div>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-primary text-white rounded-md p-2 cursor-pointer disabled:opacity-50 flex justify-center items-center"
        >
          {submitting ? <Loader2 className="animate-spin" /> : "إضافة تقيم"}
        </button>

        <DialogClose asChild>
          <button
            type="button"
            disabled={submitting}
            className="flex-1 cursor-pointer p-2 disabled:opacity-50 text-sidebar/90 dark:text-white"
          >
            إلغاء
          </button>
        </DialogClose>
      </div>
    </form>
  );
}
