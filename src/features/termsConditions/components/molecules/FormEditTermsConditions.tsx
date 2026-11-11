import { getApiErrorMessage } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateTermsConditions } from "../../hooks/useUpdateTermsConditions";
import {
  UpdateTermsConditionsSchema,
  type UpdateTermsConditionsType,
} from "../../schemas/edit.TermsConditions";
import type { termsConditionsItemType } from "../../types";
import { InputField } from "../atoms/InputField";

type FormEditTermsConditionsProps = {
  data: termsConditionsItemType;
  onSuccess?: () => void;
};

export function FormEditTermsConditions({ data, onSuccess }: FormEditTermsConditionsProps) {
  const { question, answer } = data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTermsConditionsType>({
    resolver: zodResolver(UpdateTermsConditionsSchema),
    defaultValues: {
      question,
      answer,
    },
  });

  const { mutateAsync: updateTermsConditions, isPending } = useUpdateTermsConditions(data.id);

  const onSubmit = async (formData: UpdateTermsConditionsType) => {
    try {
      const result = await updateTermsConditions(formData);
      toast.success(result?.message || "تم تعديل الشرط بنجاح");
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
          label="العنوان"
          name="question"
          defaultValue={question}
          register={register}
          error={errors.question?.message}
          placeHolder="أدخل عنوان أو موضوع الشرط..."
        />
        <InputField
          label="المحتوى"
          name="answer"
          defaultValue={answer}
          register={register}
          error={errors.answer?.message}
          placeHolder="أدخل محتوى الشروط..."
        />
      </div>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-primary text-white rounded-md p-2 cursor-pointer disabled:opacity-50 flex justify-center items-center"
        >
          {submitting ? <Loader2 className="animate-spin" /> : "تعديل شرط"}
        </button>

        <DialogClose asChild>
          <button
            type="button"
            disabled={submitting}
            className="flex-1 cursor-pointer p-2 disabled:opacity-50 text-sidebar dark:text-white/90"
          >
            إلغاء
          </button>
        </DialogClose>
      </div>
    </form>
  );
}
