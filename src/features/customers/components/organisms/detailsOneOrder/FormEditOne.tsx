import { customerStatusOptions } from "@/features/customers/data/optionsData";
import { useUpdateBuyApplication } from "@/features/customers/hooks/useUpdateBuyApplication";
import {
  updateOrderSchema,
  type UpdateOrderType,
} from "@/features/customers/schemas/update.order";
import { getApiErrorMessages } from "@/lib/axios";
import { Textarea } from "@/shared/ui/textarea";
import type { TableRow } from "@/types/typesLayouts";
import { DialogClose } from "@/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SelectField } from "../../atoms/SelectField";

type FormEditOneProps = {
  data: TableRow;
  onSuccess?: () => void;
};

export function FormEditOne({ data, onSuccess }: FormEditOneProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrderType>({
    resolver: zodResolver(updateOrderSchema),
  });

  const {
    mutate: updateBuyApplication,
    isPending,
    isError,
    error,
  } = useUpdateBuyApplication();

  const onSubmit = (formData: UpdateOrderType) => {
    updateBuyApplication(
      { id: `${data["id"]}`, data: formData },
      {
        onSuccess: (result) => {
          toast.success(result?.message || "تم تحديث بيانات العميل بنجاح");
          onSuccess?.();
        },
        onError: (err) => {
          const messages = getApiErrorMessages(err, "حدث خطأ أثناء تحديث بيانات العميل");
          toast.error(
            messages.length > 1 ? (
              <ul className="list-disc pr-4 space-y-1">
                {messages.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            ) : (
              messages[0]
            ),
          );
        },
      },
    );
  };

  return (
    <form dir="rtl" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <fieldset
        disabled={isPending}
        className="space-y-4 disabled:opacity-60 disabled:pointer-events-none"
      >
        <div className="px-4 pt-4 space-y-4">
          <SelectField
            label="حالة العميل"
            name="status"
            control={control}
            options={customerStatusOptions}
            defaultValue={`${data["status"]}`}
            error={errors.status?.message}
          />
          <div className="flex flex-col gap-2 ">
            <p className="text-sidebar dark:text-white">ملاحظات الموظف</p>
            <Textarea
              {...register("employee_note")}
              defaultValue={data["employee_note"] ? `${data["employee_note"]}` : ""}
              placeholder="اكتب ملاحظات إضافية عن العميل"
              className="bg-card dark:bg-card-dark placeholder:text-sidebar text-black dark:placeholder:text-white/80 dark:text-white"
            />
            {errors.employee_note?.message && (
              <p className="text-red-500 text-sm">
                {errors.employee_note.message}
              </p>
            )}
          </div>

          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md p-2">
              {(() => {
                const messages = getApiErrorMessages(
                  error,
                  "حدث خطأ أثناء تحديث العميل",
                );
                return messages.length > 1 ? (
                  <ul className="list-disc pr-4 space-y-1">
                    {messages.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{messages[0]}</p>
                );
              })()}
            </div>
          )}
        </div>
      </fieldset>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-primary text-white rounded-md p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>جاري الحفظ...</span>
            </>
          ) : (
            "حفظ التغييرات"
          )}
        </button>

        <DialogClose asChild>
          <button
            type="button"
            disabled={isPending}
            className="flex-1 cursor-pointer p-2 disabled:opacity-50 disabled:cursor-not-allowed text-sidebar dark:text-white"
          >
            إلغاء
          </button>
        </DialogClose>
      </div>
    </form>
  );
}
