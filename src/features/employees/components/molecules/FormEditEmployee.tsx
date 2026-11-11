import { getApiErrorMessage } from "@/lib/axios";
import { DialogClose } from "@/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { statusOptions } from "../../data/optionsData";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import type { Employee } from "../../types";

import { updateEmployeeSchema, type UpdateEmployeeType } from "../../schemas/update.employee";
import { CheckboxField } from "../atoms/CheckboxField";
import { InputField } from "../atoms/InputField";
import { SelectField } from "../atoms/SelectField";

type FormEditEmployeeProps = {
  row: Employee;
  onSuccess?: () => void;
};

export function FormEditEmployee({ row, onSuccess }: FormEditEmployeeProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateEmployeeType>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      ...row,
    },
  });

  const { mutateAsync: updateEmployeeMutation, isPending } =
    useUpdateEmployee();

  const onSubmit = async (data: UpdateEmployeeType) => {
    try {
      const result = await updateEmployeeMutation({
        id: row.id,
        oldData: row,
        newData: data,
      });
      toast.success(result?.message || "تم التعديل بنجاح");
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
          defaultValue={row.employee_name}
          label="الاسم الكامل"
          name="employee_name"
          register={register}
          error={errors.employee_name?.message}
          type="text"
          placeHolder="أدخل الاسم"
          disabled={submitting}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            defaultValue={row.email}
            label="البريد الإلكتروني"
            name="email"
            register={register}
            error={errors.email?.message}
            type="email"
            placeHolder="email@example.com"
            disabled={submitting}
          />
          <InputField
            defaultValue={row.phone_number}
            label="رقم الهاتف"
            name="phone_number"
            register={register}
            error={errors.phone_number?.message}
            type="tel"
            placeHolder="966501234567"
            disabled={submitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            defaultValue={row.job_title}
            label="الدور الوظيفي"
            name="job_title"
            register={register}
            error={errors.job_title?.message}
            type="text"
            placeHolder="مسئول المبيعات"
            disabled={submitting}
          />

          <SelectField
            defaultValue={row.status}
            label="الحالة"
            name="status"
            register={register}
            options={statusOptions}
            error={errors.status?.message}
            disabled={submitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="md:col-span-2 text-lg text-sidebar dark:text-white">الصلاحيات</p>
          <CheckboxField
            defaultValue={row.customers}
            label="العملاء"
            name="customers"
            control={control}
            error={errors.customers?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.unity_owners}
            label="أصحاب السكن"
            name="unity_owners"
            control={control}
            error={errors.unity_owners?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.units}
            label="الوحدات"
            name="units"
            control={control}
            error={errors.units?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.advertisements}
            label="الإعلانات"
            name="advertisements"
            control={control}
            error={errors.advertisements?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.payments}
            label="المدفوعات"
            name="payments"
            control={control}
            error={errors.payments?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.content}
            label="المحتوى"
            name="content"
            control={control}
            error={errors.content?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.messages}
            label="الرسائل"
            name="messages"
            control={control}
            error={errors.messages?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.frequently_asked_questions}
            label="الأسئلة الشائعة"
            name="frequently_asked_questions"
            control={control}
            error={errors.frequently_asked_questions?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.terms_and_conditions}
            label="الشروط والاحكام"
            name="terms_and_conditions"
            control={control}
            error={errors.terms_and_conditions?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.reviews}
            label="أراء العملاء"
            name="reviews"
            control={control}
            error={errors.reviews?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.employees}
            label="الموظفون"
            name="employees"
            control={control}
            error={errors.employees?.message}
            disabled={submitting}
          />
          <CheckboxField
            defaultValue={row.real_estate}
            label="العقارات"
            name="real_estate"
            control={control}
            error={errors.real_estate?.message}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-success hover:bg-success/90 text-white rounded-md p-2 cursor-pointer disabled:opacity-50 flex justify-center items-center transition-colors"
        >
          {submitting ? <Loader2 className="animate-spin" /> : "حفظ التعديلات"}
        </button>

        <DialogClose asChild>
          <button
            type="button"
            disabled={submitting}
            className="flex-1 cursor-pointer p-2 disabled:opacity-50 text-sidebar dark:text-white"
          >
            إلغاء
          </button>
        </DialogClose>
      </div>
    </form>
  );
}
