import { getApiErrorMessage } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { statusOptions } from "../../data/optionsData";
import { useUpdateFrequentlyAskedQuestions } from "../../hooks/useUpdateFrequentlyAskedQuestions";
import {
  UpdateFrequentlyAskedQuestionsSchema,
  type UpdateFrequentlyAskedQuestionsType,
} from "../../schemas/edit.FrequentlyAskedQuestions";
import type { frequentlyAskedQuestionsItemType } from "../../types";
import { InputField } from "../atoms/InputField";
import { SelectField } from "../atoms/SelectField";

type FormEditFrequentlyAskedQuestionsProps = {
  data: frequentlyAskedQuestionsItemType;
  onSuccess?: () => void;
};

export function FormEditFrequentlyAskedQuestions({ data, onSuccess }: FormEditFrequentlyAskedQuestionsProps) {
  const { answer, question, status } = data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFrequentlyAskedQuestionsType>({
    resolver: zodResolver(UpdateFrequentlyAskedQuestionsSchema),
    defaultValues: {
      answer,
      question,
      status,
    },
  });

  const { mutateAsync: updateFrequentlyAskedQuestions, isPending } = useUpdateFrequentlyAskedQuestions(data.id);

  const onSubmit = async (formData: UpdateFrequentlyAskedQuestionsType) => {
    try {
      const result = await updateFrequentlyAskedQuestions(formData);
      toast.success(result?.message || "تم تعديل السؤال بنجاح");
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
          label="السؤال"
          name="question"
          defaultValue={question}
          register={register}
          error={errors.question?.message}
          placeHolder="ما هو سؤالك؟"
        />
        <InputField
          label="الإجابة"
          name="answer"
          defaultValue={answer}
          register={register}
          error={errors.answer?.message}
          placeHolder="أدخل إجابتك..."
        />
        <SelectField
          label="ظهور السؤال"
          name="status"
          register={register}
          defaultValue={status}
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
          {submitting ? <Loader2 className="animate-spin" /> : "تعديل سؤال"}
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
