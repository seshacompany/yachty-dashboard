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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  updateStaffSchema,
  type UpdateStaffFormValues,
} from "../schemas/staff.schema";
import { useUpdateStaff } from "../hooks/useUpdateStaff";
import {
  STAFF_PERMISSIONS,
  STAFF_PERMISSION_LABELS,
  type Gender,
  type StaffItem,
  type StaffPermission,
  type StaffStatus,
  type UpdateStaffPayload,
} from "../types/staff.types";

interface UpdateStaffDialogProps {
  staff: StaffItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
      firstName: staff?.firstName || "",
      lastName: staff?.lastName || "",
      email: staff?.email || "",
      phone: staff?.phone || "",
      status: (staff?.status as StaffStatus) || "ACTIVE",
      gender: (staff?.gender as Gender) || "MALE",
      jobTitle: staff?.jobTitle || "",
      permissions: Array.isArray(staff?.permissions) ? staff.permissions : [],
    },
  });

  const rawPermissions = watch("permissions");
  const selectedPermissions = Array.isArray(rawPermissions) ? rawPermissions : [];
  const selectedGender = watch("gender");
  const selectedStatus = watch("status");

  useEffect(() => {
    if (open && staff) {
      reset({
        firstName: staff.firstName || "",
        lastName: staff.lastName || "",
        email: staff.email || "",
        phone: staff.phone || "",
        status: (staff.status as StaffStatus) || "ACTIVE",
        gender: (staff.gender as Gender) || "MALE",
        jobTitle: staff.jobTitle || "",
        permissions: Array.isArray(staff.permissions) ? staff.permissions : [],
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
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email ? data.email.trim() : undefined,
        phone: data.phone ? data.phone.trim() : undefined,
        status: data.status as StaffStatus,
        gender: data.gender as Gender,
        jobTitle: data.jobTitle ? data.jobTitle.trim() : undefined,
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
            تعديل بيانات الموظف: {staff?.firstName} {staff?.lastName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            نموذج تعديل بيانات وصلاحيات الموظف
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-firstName" className="text-xs font-semibold">
                الاسم الأول <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-firstName"
                placeholder="أدخل الاسم الأول..."
                {...register("firstName")}
                disabled={isPending}
                className="bg-muted/40 dark:bg-popover-dark/40"
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-lastName" className="text-xs font-semibold">
                اسم العائلة <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-lastName"
                placeholder="أدخل اسم العائلة..."
                {...register("lastName")}
                disabled={isPending}
                className="bg-muted/40 dark:bg-popover-dark/40"
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-email" className="text-xs font-semibold">
                البريد الإلكتروني
              </Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="example@domain.com"
                {...register("email")}
                disabled={isPending}
                className="bg-muted/40 dark:bg-popover-dark/40"
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-phone" className="text-xs font-semibold">
                رقم الهاتف
              </Label>
              <Input
                id="edit-phone"
                placeholder="01xxxxxxxxx"
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
                المسمى الوظيفي
              </Label>
              <Input
                id="edit-jobTitle"
                placeholder="مثال: مطور برمجيات، مسؤول دعم..."
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

            {/* Gender */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                الجنس <span className="text-destructive">*</span>
              </Label>
              <Select
                value={selectedGender}
                onValueChange={(val) =>
                  setValue("gender", val as Gender, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                disabled={isPending}
              >
                <SelectTrigger className="bg-muted/40 dark:bg-popover-dark/40">
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  <SelectItem value="MALE">ذكر</SelectItem>
                  <SelectItem value="FEMALE">أنثى</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-xs text-destructive">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-xs font-semibold">
                حالة الحساب <span className="text-destructive">*</span>
              </Label>
              <Select
                value={selectedStatus}
                onValueChange={(val) =>
                  setValue("status", val as StaffStatus, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                disabled={isPending}
              >
                <SelectTrigger className="bg-muted/40 dark:bg-popover-dark/40">
                  <SelectValue placeholder="اختر حالة الحساب" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  <SelectItem value="ACTIVE">نشط (ACTIVE)</SelectItem>
                  <SelectItem value="PENDING">معلق (PENDING)</SelectItem>
                  <SelectItem value="SUSPENDED">موقوف (SUSPENDED)</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-xs text-destructive">
                  {errors.status.message}
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

            {/* Permission Checkboxes Grid */}
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
