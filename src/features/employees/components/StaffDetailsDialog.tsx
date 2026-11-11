import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Calendar, CheckCircle2, Mail, Phone, Shield, User } from "lucide-react";
import { genderValue, statusBadgeStyles, statusValue } from "../data/tableData";
import {
  STAFF_PERMISSION_LABELS,
  type Gender,
  type StaffItem,
  type StaffStatus,
} from "../types/staff.types";

interface StaffDetailsDialogProps {
  staff: StaffItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StaffDetailsDialog({
  staff,
  open,
  onOpenChange,
}: StaffDetailsDialogProps) {
  if (!staff) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const initial =
    staff.firstName && staff.firstName.length > 0
      ? staff.firstName[0].toUpperCase()
      : "M";

  const permissionsList = Array.isArray(staff.permissions)
    ? staff.permissions
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-sidebar dark:text-white">
            <User className="size-5 text-primary" />
            الملف التعريفي للموظف
          </DialogTitle>
          <DialogDescription className="sr-only">
            تفاصيل وبيانات الموظف
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/10 dark:border-white/10">
            <div className="size-16 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-2xl shrink-0">
              {initial}
            </div>

            <div className="flex-1 text-center sm:text-right space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold text-sidebar dark:text-white">
                  {staff.firstName} {staff.lastName}
                </h3>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold border",
                    staff.status && staff.status in statusBadgeStyles
                      ? statusBadgeStyles[staff.status as StaffStatus]
                      : "bg-muted text-sidebar"
                  )}
                >
                  {(staff.status && staff.status in statusValue
                    ? statusValue[staff.status as StaffStatus]
                    : staff.status) || "—"}
                </span>
              </div>

              <p className="text-sm text-sidebar/70 dark:text-white/70">
                {staff.jobTitle || "موظف إداري"}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card dark:bg-card-dark/40 border border-sidebar/10 dark:border-white/10">
              <Mail className="size-4.5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5 overflow-hidden">
                <p className="text-xs text-sidebar/60 dark:text-white/60">البريد الإلكتروني</p>
                <p className="text-sm font-medium truncate text-sidebar dark:text-white" dir="ltr">
                  {staff.email || "غير محدد"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card dark:bg-card-dark/40 border border-sidebar/10 dark:border-white/10">
              <Phone className="size-4.5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5 overflow-hidden">
                <p className="text-xs text-sidebar/60 dark:text-white/60">رقم الهاتف</p>
                <p className="text-sm font-medium text-sidebar dark:text-white" dir="ltr">
                  {staff.phone || "غير محدد"}
                </p>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card dark:bg-card-dark/40 border border-sidebar/10 dark:border-white/10">
              <User className="size-4.5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs text-sidebar/60 dark:text-white/60">الجنس</p>
                <p className="text-sm font-medium text-sidebar dark:text-white">
                  {(staff.gender && staff.gender in genderValue
                    ? genderValue[staff.gender as Gender]
                    : staff.gender) || "—"}
                </p>
              </div>
            </div>

            {/* Created At */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card dark:bg-card-dark/40 border border-sidebar/10 dark:border-white/10">
              <Calendar className="size-4.5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs text-sidebar/60 dark:text-white/60">تاريخ الإضافة</p>
                <p className="text-xs font-medium text-sidebar dark:text-white">
                  {formatDate(staff.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Granted Permissions List */}
          <div className="space-y-3 rounded-xl border border-sidebar/10 dark:border-white/10 p-4 bg-muted/20 dark:bg-popover-dark/20">
            <div className="flex items-center gap-2">
              <Shield className="size-4.5 text-primary" />
              <h4 className="text-sm font-bold text-sidebar dark:text-white">
                الصلاحيات الممنوحة
              </h4>
              <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
                {permissionsList.length} صلاحيات
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
              {permissionsList.length > 0 ? (
                permissionsList.map((perm) => (
                  <div
                    key={perm}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-card dark:bg-card-dark border border-primary/20 text-sidebar dark:text-white text-xs font-medium"
                  >
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span className="truncate">
                      {STAFF_PERMISSION_LABELS[perm] || perm}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-sidebar/60 dark:text-white/60 col-span-full py-2">
                  لا توجد صلاحيات ممنوحة لهذا الموظف
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end border-t border-sidebar/10 dark:border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6 cursor-pointer"
            >
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
