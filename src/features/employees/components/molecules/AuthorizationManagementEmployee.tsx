import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { getApiErrorMessage } from "@/lib/axios";
import { DialogClose } from "@/ui/dialog";
import { Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import type { Employee } from "../../types";
import { OneItemAuthorizationManagementEmployee } from "./OneItemAuthorizationManagementEmployee";

type PermissionsFormValues = {
  customers?: boolean;
  unity_owners?: boolean;
  units?: boolean;
  advertisements?: boolean;
  payments?: boolean;
  content?: boolean;
  messages?: boolean;
  frequently_asked_questions?: boolean;
  terms_and_conditions?: boolean;
  reviews?: boolean;
  employees?: boolean;
  real_estate?: boolean;
};

type Props = {
  row: Employee;
};

export function AuthorizationManagementEmployee({ row }: Props) {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control } = useForm<PermissionsFormValues>({
    defaultValues: {
      customers: Boolean(row.customers),
      unity_owners: Boolean(row.unity_owners),
      units: Boolean(row.units),
      advertisements: Boolean(row.advertisements),
      payments: Boolean(row.payments),
      content: Boolean(row.content),
      messages: Boolean(row.messages),
      frequently_asked_questions: Boolean(row.frequently_asked_questions),
      terms_and_conditions: Boolean(row.terms_and_conditions),
      reviews: Boolean(row.reviews),
      employees: Boolean(row.employees),
      real_estate: Boolean(row.real_estate),
    },
  });

  const { mutateAsync: updateEmployeeMutation, isPending } =
    useUpdateEmployee();

  const onSubmit = async (data: PermissionsFormValues) => {
    try {
      const result = await updateEmployeeMutation({
        id: row.id,
        oldData: row,
        newData: data,
      });
      toast.success(result?.message || "تم التعديل بنجاح");
      setOpen(false);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "حدث خطأ"));
    }
  };

  return (
    <PopUpLayout
      title="إدارة الصلاحيات"
      open={open}
      onOpenChange={setOpen}
      content={
        <div className="bg-cyan/50 p-2 rounded-xl text-cyan">
          <Shield size={18} />
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
        className="flex flex-col gap-2"
      >
        <div className="pt-4 px-4 text-sm text-secondary-light dark:text-white/70">
          اسم الموظف : {row.employee_name || `${row.firstName || ""} ${row.lastName || ""}`.trim()}
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2 px-4">
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="customers"
            title="العملاء"
            value={Boolean(row.customers)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="unity_owners"
            title="أصحاب السكن"
            value={Boolean(row.unity_owners)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="units"
            title="الوحدات"
            value={Boolean(row.units)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="advertisements"
            title="الإعلانات"
            value={Boolean(row.advertisements)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="payments"
            title="المدفوعات"
            value={Boolean(row.payments)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="content"
            title="المحتوى"
            value={Boolean(row.content)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="messages"
            title="الرسائل"
            value={Boolean(row.messages)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="frequently_asked_questions"
            title="الأسئلة الشائعة"
            value={Boolean(row.frequently_asked_questions)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="terms_and_conditions"
            title="الشروط والاحكام"
            value={Boolean(row.terms_and_conditions)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="reviews"
            title="أراء العملاء"
            value={Boolean(row.reviews)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="employees"
            title="الموظفون"
            value={Boolean(row.employees)}
          />
          <OneItemAuthorizationManagementEmployee
            control={control}
            name="real_estate"
            title="العقارات"
            value={Boolean(row.real_estate)}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 p-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-primary text-white rounded-md p-2 cursor-pointer disabled:opacity-50 flex justify-center items-center"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "حفظ المتغيرات"}
          </button>

          <DialogClose asChild>
            <button
              type="button"
              disabled={isPending}
              className="flex-1 cursor-pointer p-2 disabled:opacity-50 text-sidebar dark:text-white/70"
            >
              إلغاء
            </button>
          </DialogClose>
        </div>
      </form>
    </PopUpLayout>
  );
}
