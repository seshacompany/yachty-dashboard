import { getApiErrorMessage } from "@/lib/axios";
import { DialogClose } from "@/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateTermsConditions } from "../../hooks/useCreateTermsConditions";
import {
  CreateTermsConditionsSchema,
  type CreateTermsConditionsType,
} from "../../schemas/create.TermsConditions";
import { InputField } from "../atoms/InputField";

type FormCreateTermsConditionsProps = {
  onSuccess?: () => void;
};

export function FormCreateTermsConditions({ onSuccess }: FormCreateTermsConditionsProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTermsConditionsType>({
    resolver: zodResolver(CreateTermsConditionsSchema),
    defaultValues: {
      question: "",
      answer: "",
      isActive: true,
    },
  });

  const { mutateAsync: createTermsCondition, isPending } = useCreateTermsConditions();

  const onSubmit = async (data: CreateTermsConditionsType) => {
    try {
      const result = await createTermsCondition(data);
      toast.success(result?.message || "تم إضافة الشرط بنجاح");
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
          label="العنوان"
          name="question"
          register={register}
          error={errors.question?.message}
          placeHolder="أدخل عنوان أو موضوع الشرط..."
        />
        <InputField
          label="المحتوى"
          name="answer"
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
          {submitting ? <Loader2 className="animate-spin" /> : "إضافة شرط"}
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
