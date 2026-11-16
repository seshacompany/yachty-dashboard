import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/shared/ui/label";
import {
  updateStaffSchema,
  type UpdateStaffFormValues,
} from "../schemas/staff.schema";
import { useUpdateStaff } from "../hooks/useUpdateStaff";
import {
  STAFF_PERMISSIONS,
  STAFF_PERMISSION_LABELS,
  type StaffItem,
  type StaffPermission,
  type UpdateStaffPayload,
} from "../types/staff.types";

interface UpdateStaffDialogProps {
  staff: StaffItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const filterValidPermissions = (
  perms?: readonly string[],
): StaffPermission[] => {
  if (!Array.isArray(perms)) return [];
  return perms.filter((p): p is StaffPermission =>
    (STAFF_PERMISSIONS as readonly string[]).includes(p),
  );
};

export function UpdateStaffDialog({
  staff,
  open,
  onOpenChange,
}: UpdateStaffDialogProps) {
  const { mutateAsync: updateStaff, isPending } = useUpdateStaff();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<UpdateStaffFormValues>({
    resolver: zodResolver(updateStaffSchema),
    defaultValues: {
      staff_name: staff?.staff_name || "",
      phone: staff?.phone || "",
      jobTitle: staff?.jobTitle || "",
      permissions: filterValidPermissions(staff?.permissions),
    },
  });

  const rawPermissions = watch("permissions");
  const selectedPermissions = Array.isArray(rawPermissions)
    ? rawPermissions
    : [];

  useEffect(() => {
    if (open && staff) {
      reset({
        staff_name: staff.staff_name || "",
        phone: staff.phone || "",
        jobTitle: staff.jobTitle || "",
        permissions: filterValidPermissions(staff.permissions),
      });
    }
  }, [open, staff, reset]);

  const handleTogglePermission = (permission: StaffPermission) => {
    const current = Array.isArray(getValues("permissions"))
      ? getValues("permissions")
      : [];

    const updated = current.includes(permission)
      ? current.filter((p) => p !== permission)
      : [...current, permission];

    setValue("permissions", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSelectAllPermissions = () => {
    setValue("permissions", [...STAFF_PERMISSIONS], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDeselectAllPermissions = () => {
    setValue("permissions", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (data: UpdateStaffFormValues) => {
    if (!staff) return;
    try {
      const payload: UpdateStaffPayload = {
        staff_name: data.staff_name.trim(),
        phone: data.phone.trim(),
        jobTitle: data.jobTitle.trim(),
        permissions: data.permissions as StaffPermission[],
      };

      await updateStaff({ id: staff.id, payload });
      handleClose();
    } catch {
      // Handled in mutation hook toast
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir="rtl"
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-sidebar dark:text-white">
            <Edit className="size-5 text-primary" />
            تعديل بيانات الموظف: {staff?.staff_name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            نموذج تعديل بيانات وصلاحيات الموظف
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Staff Name */}
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="edit-staff_name" className="text-xs font-semibold">
                الاسم <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-staff_name"
                placeholder="أدخل اسم الموظف..."
                {...register("staff_name")}
                disabled={isPending}
                className="bg-muted/40 dark:bg-popover-dark/40"
              />
              {errors.staff_name && (
                <p className="text-xs text-destructive">
                  {errors.staff_name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-phone" className="text-xs font-semibold">
                رقم الهاتف <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-phone"
                placeholder="+201012345678"
                {...register("phone")}
                disabled={isPending}
                className="bg-muted/40 dark:bg-popover-dark/40"
              />
              {errors.phone && (
                <p className="text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Job Title */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-jobTitle" className="text-xs font-semibold">
                المسمى الوظيفي <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-jobTitle"
                placeholder="مثال: Account Verification Specialist"
                {...register("jobTitle")}
                disabled={isPending}
                className="bg-muted/40 dark:bg-popover-dark/40"
              />
              {errors.jobTitle && (
                <p className="text-xs text-destructive">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-3 rounded-xl border border-sidebar/10 dark:border-white/10 p-4 bg-muted/20 dark:bg-popover-dark/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4.5 text-primary" />
                <Label className="text-sm font-bold text-sidebar dark:text-white">
                  صلاحيات الموظف <span className="text-destructive">*</span>
                </Label>
                <span className="text-xs text-sidebar/60 dark:text-white/60">
                  ({selectedPermissions.length} من {STAFF_PERMISSIONS.length})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllPermissions}
                  disabled={isPending}
                  className="text-xs font-medium text-primary hover:underline cursor-pointer"
                >
                  تحديد الكل
                </button>
                <span className="text-sidebar/30 dark:text-white/30">|</span>
                <button
                  type="button"
                  onClick={handleDeselectAllPermissions}
                  disabled={isPending}
                  className="text-xs font-medium text-destructive hover:underline cursor-pointer"
                >
                  إلغاء التحديد
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
              {STAFF_PERMISSIONS.map((perm) => {
                const isChecked = Boolean(selectedPermissions.includes(perm));
                return (
                  <label
                    key={perm}
                    htmlFor={`edit-perm-${perm}`}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer select-none ${
                      isChecked
                        ? "border-primary bg-primary/10 text-sidebar dark:text-white font-medium shadow-2xs"
                        : "bg-card dark:bg-card-dark/60 border-sidebar/10 dark:border-white/10 text-sidebar/70 dark:text-white/70 hover:border-primary/20"
                    }`}
                  >
                    <Checkbox
                      id={`edit-perm-${perm}`}
                      checked={isChecked}
                      disabled={isPending}
                      onCheckedChange={() => {
                        if (!isPending) handleTogglePermission(perm);
                      }}
                    />
                    <span className="text-xs font-medium truncate">
                      {STAFF_PERMISSION_LABELS[perm]}
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.permissions && (
              <p className="text-xs text-destructive font-medium">
                {errors.permissions.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-sidebar/10 dark:border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="px-5 cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="px-6 flex items-center gap-2 cursor-pointer bg-primary text-white hover:bg-primary/90"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              <span>{isPending ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
