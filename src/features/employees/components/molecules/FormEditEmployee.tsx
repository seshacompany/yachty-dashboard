import { getApiErrorMessage } from "@/lib/axios";
import { DialogClose } from "@/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import {
  STAFF_PERMISSIONS,
  STAFF_PERMISSION_LABELS,
  type Employee,
} from "../../types";

import {
  updateEmployeeSchema,
  type UpdateEmployeeType,
} from "../../schemas/update.employee";
import { CheckboxField } from "../atoms/CheckboxField";
import { InputField } from "../atoms/InputField";
import { SelectField } from "../atoms/SelectField";

type FormEditEmployeeProps = {
  row: Employee;
  onSuccess?: () => void;
};

const employeeStatusOptions = [
  { label: "نشط", value: "approved" },
  { label: "موقوف", value: "suspended" },
];

export function FormEditEmployee({ row, onSuccess }: FormEditEmployeeProps) {
  const hasPerm = (perm: (typeof STAFF_PERMISSIONS)[number]) =>
    Boolean(row.permissions?.includes(perm));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateEmployeeType>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      staff_name: row.staff_name || "",
      email: row.email || "",
      phone: row.phone || "",
      jobTitle: row.jobTitle || "",
      status: row.status,
      users: hasPerm("users"),
      staff: hasPerm("staff"),
      notifications: hasPerm("notifications"),
      boat_sales: hasPerm("boat_sales"),
      rentals: hasPerm("rentals"),
    },
  });

  const { mutateAsync: updateEmployeeMutation, isPending } =
    useUpdateEmployee();

  const onSubmit = async (data: UpdateEmployeeType) => {
    try {
      const permissions = STAFF_PERMISSIONS.filter((perm) => data[perm]);
      const result = await updateEmployeeMutation({
        id: row.id,
        oldData: row,
        newData: {
          staff_name: data.staff_name,
          email: data.email,
          phone: data.phone ?? null,
          jobTitle: data.jobTitle ?? null,
          status: data.status,
          permissions,
        },
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
          defaultValue={row.staff_name}
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
            defaultValue={row.phone ?? ""}
            label="رقم الهاتف"
            name="phone"
            register={register}
            error={errors.phone?.message}
            type="tel"
            placeHolder="+201012345678"
            disabled={submitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            defaultValue={row.jobTitle ?? ""}
            label="المسمى الوظيفي"
            name="jobTitle"
            register={register}
            error={errors.jobTitle?.message}
            type="text"
            placeHolder="مسئول المبيعات"
            disabled={submitting}
          />

          <SelectField
            defaultValue={row.status}
            label="الحالة"
            name="status"
            register={register}
            options={employeeStatusOptions}
            error={errors.status?.message}
            disabled={submitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="md:col-span-2 text-lg text-sidebar dark:text-white">
            الصلاحيات
          </p>
          {STAFF_PERMISSIONS.map((perm) => (
            <CheckboxField
              key={perm}
              defaultValue={hasPerm(perm)}
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
