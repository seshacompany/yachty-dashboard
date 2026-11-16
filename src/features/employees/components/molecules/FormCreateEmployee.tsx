import { getApiErrorMessage } from "@/lib/axios";
import { DialogClose } from "@/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import {
  createEmployeeSchema,
  type CreateEmployeeType,
} from "../../schemas/create.employee";
import { STAFF_PERMISSIONS, STAFF_PERMISSION_LABELS } from "../../types";
import { CheckboxField } from "../atoms/CheckboxField";
import { InputField } from "../atoms/InputField";
import { SelectField } from "../atoms/SelectField";

type FormCreateEmployeeProps = {
  onSuccess?: () => void;
};

const employeeStatusOptions = [
  { label: "نشط", value: "approved" },
  { label: "موقوف", value: "suspended" },
];

export function FormCreateEmployee({ onSuccess }: FormCreateEmployeeProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEmployeeType>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      staff_name: "",
      email: "",
      password: "",
      phone: "",
      jobTitle: "",
      status: "approved",
      users: false,
      staff: false,
      notifications: false,
      boat_sales: false,
      rentals: false,
    },
  });

  const { mutateAsync: createEmployee, isPending } = useCreateEmployee();

  const onSubmit = async (data: CreateEmployeeType) => {
    try {
      const result = await createEmployee(data);
      toast.success(result?.message || "تم إضافة الموظف بنجاح");
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء إضافة الموظف"));
    }
  };

  const submitting = isSubmitting || isPending;

  return (
    <form dir="rtl" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="px-4 pt-4 space-y-4">
        <InputField
          label="الاسم الكامل"
          name="staff_name"
          register={register}
          error={errors.staff_name?.message}
          type="text"
          placeHolder="أدخل الاسم"
          disabled={submitting}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="البريد الإلكتروني"
            name="email"
            register={register}
            error={errors.email?.message}
            type="email"
            placeHolder="email@example.com"
            disabled={submitting}
          />
          <InputField
            label="كلمة السر"
            name="password"
            register={register}
            error={errors.password?.message}
            type="password"
            placeHolder="قم بكتابة كلمة السر"
            disabled={submitting}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="رقم الهاتف"
            name="phone"
            register={register}
            error={errors.phone?.message}
            type="tel"
            placeHolder="+201012345678"
            disabled={submitting}
          />
          <SelectField
            label="الحالة"
            name="status"
            register={register}
            options={employeeStatusOptions}
            error={errors.status?.message}
            disabled={submitting}
          />
        </div>
        <InputField
          label="المسمى الوظيفي"
          name="jobTitle"
          register={register}
          error={errors.jobTitle?.message}
          type="text"
          placeHolder="مسئول المبيعات"
          disabled={submitting}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="md:col-span-2 text-lg">الصلاحيات</p>
          {STAFF_PERMISSIONS.map((perm) => (
            <CheckboxField
              key={perm}
              label={STAFF_PERMISSION_LABELS[perm]}
              name={perm}
              control={control}
              error={errors[perm]?.message}
              disabled={submitting}
            />
          ))}
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-success hover:bg-success/90 text-white rounded-md p-2 cursor-pointer disabled:opacity-50 flex justify-center items-center transition-colors"
        >
          {submitting ? <Loader2 className="animate-spin" /> : "إضافة موظف"}
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
