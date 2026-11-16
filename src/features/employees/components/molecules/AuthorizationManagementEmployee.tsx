import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { getApiErrorMessage } from "@/lib/axios";
import { DialogClose } from "@/ui/dialog";
import { Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import {
  STAFF_PERMISSIONS,
  STAFF_PERMISSION_LABELS,
  type Employee,
  type StaffPermission,
} from "../../types";
import { OneItemAuthorizationManagementEmployee } from "./OneItemAuthorizationManagementEmployee";

type PermissionsFormValues = Record<StaffPermission, boolean>;

type Props = {
  row: Employee;
};

export function AuthorizationManagementEmployee({ row }: Props) {
  const [open, setOpen] = useState(false);

  const hasPerm = (perm: StaffPermission) =>
    Boolean(row.permissions?.includes(perm));

  const { handleSubmit, control } = useForm<PermissionsFormValues>({
    defaultValues: {
      users: hasPerm("users"),
      staff: hasPerm("staff"),
      notifications: hasPerm("notifications"),
      boat_sales: hasPerm("boat_sales"),
      rentals: hasPerm("rentals"),
    },
  });

  const { mutateAsync: updateEmployeeMutation, isPending } =
    useUpdateEmployee();

  const onSubmit = async (data: PermissionsFormValues) => {
    try {
      const updatedPermissions = STAFF_PERMISSIONS.filter((perm) => data[perm]);
      const result = await updateEmployeeMutation({
        id: row.id,
        oldData: row,
        newData: { permissions: updatedPermissions },
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
          اسم الموظف : {row.staff_name || row.email}
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2 px-4">
          {STAFF_PERMISSIONS.map((perm) => (
            <OneItemAuthorizationManagementEmployee
              key={perm}
              control={control}
              name={perm}
              title={STAFF_PERMISSION_LABELS[perm]}
              value={hasPerm(perm)}
            />
          ))}
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
