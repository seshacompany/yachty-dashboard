import { getApiErrorMessage } from "@/lib/axios";
import { DialogClose } from "@/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateFrequentlyAskedQuestions } from "../../hooks/useCreateFrequentlyAskedQuestions";
import {
  CreateFrequentlyAskedQuestionsSchema,
  type CreateFrequentlyAskedQuestionsType,
} from "../../schemas/create.FrequentlyAskedQuestions";
import { InputField } from "../atoms/InputField";

type FormCreateFrequentlyAskedQuestionsProps = {
  onSuccess?: () => void;
};

export function FormCreateFrequentlyAskedQuestions({ onSuccess }: FormCreateFrequentlyAskedQuestionsProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateFrequentlyAskedQuestionsType>({
    resolver: zodResolver(CreateFrequentlyAskedQuestionsSchema),
  });

  const { mutateAsync: createFrequentlyAskedQuestion, isPending } = useCreateFrequentlyAskedQuestions();

  const onSubmit = async (data: CreateFrequentlyAskedQuestionsType) => {
    try {
      const result = await createFrequentlyAskedQuestion(data);
      toast.success(result?.message || "تم إضافة السؤال بنجاح");
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
          label="السؤال"
          name="question"
          register={register}
          error={errors.question?.message}
          placeHolder="ما هو سؤالك؟"
        />
        <InputField
          label="الإجابة"
          name="answer"
          register={register}
          error={errors.answer?.message}
          placeHolder="أدخل إجابتك..."
        />
      </div>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-primary text-white rounded-md p-2 cursor-pointer disabled:opacity-50 flex justify-center items-center"
        >
          {submitting ? <Loader2 className="animate-spin" /> : "إضافة سؤال"}
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
