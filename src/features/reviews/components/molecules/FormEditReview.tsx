import { getApiErrorMessage } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { statusOptions } from "../../data/optionsData";
import { useUpdateReview } from "../../hooks/useUpdateReview";
import {
  UpdateReviewSchema,
  type UpdateReviewType,
} from "../../schemas/edit.review";
import type { reviewItemType } from "../../types";
import { InputField } from "../atoms/InputField";
import InputRatingReview from "../atoms/InputRatingReview";
import { SelectField } from "../atoms/SelectField";

type FormEditReviewProps = {
  data: reviewItemType;
  onSuccess?: () => void;
};

export function FormEditReview({ data, onSuccess }: FormEditReviewProps) {
  const { name = "", description = "", position = "", stars = 5, status = "active" } = data;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateReviewType>({
    resolver: zodResolver(UpdateReviewSchema),
    defaultValues: {
      name,
      description,
      position,
      stars: Number(stars) || 5,
      status: String(status),
    },
  });

  const { mutateAsync: updateReview, isPending } = useUpdateReview(data.id);

  const onSubmit = async (formData: UpdateReviewType) => {
    try {
      const result = await updateReview(formData);
      toast.success(result?.message || "تم تعديل التقييم بنجاح");
      reset(formData);
      onSuccess?.();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء التعديل"));
    }
  };

  const submitting = isSubmitting || isPending;

  return (
    <form dir="rtl" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="px-4 pt-4 space-y-4">
        <InputField
          label="اسم العميل"
          defaultValue={name}
          name="name"
          register={register}
          error={errors.name?.message}
          placeHolder="محمد أحمد السعيد"
        />
        <InputField
          label="المسمى الوظيفي"
          defaultValue={position}
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
              defaultValue={Number(stars) || 5}
              value={Number(field.value) || 0}
              onChange={(val) => field.onChange(val.toString())}
              error={errors.stars?.message}
            />
          )}
        />
        <InputField
          defaultValue={description}
          label="المحتوي"
          name="description"
          register={register}
          error={errors.description?.message}
          placeHolder="أدخل نص التقييم..."
        />
        <SelectField
          label="ظهور التقيم"
          name="status"
          register={register}
          defaultValue={String(status)}
          options={statusOptions}
          error={errors.status?.message}
        />
      </div>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-primary text-white rounded-md p-2 cursor-pointer disabled:opacity-50 flex justify-center items-center"
        >
          {submitting ? <Loader2 className="animate-spin" /> : "تعديل تقيم"}
        </button>

        <DialogClose asChild>
          <button
            type="button"
            disabled={submitting}
            className="flex-1 text-sidebar dark:text-white cursor-pointer p-2 disabled:opacity-50"
          >
            إلغاء
          </button>
        </DialogClose>
      </div>
    </form>
  );
}
