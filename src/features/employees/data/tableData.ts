import type { TableHeader } from "@/types/typesLayouts";
import type { StaffStatus } from "../types";

export const headers: TableHeader[] = [
  { key: "staff_name", label: "الموظف" },
  { key: "jobTitle", label: "المسمى الوظيفي" },
  { key: "contact", label: "بيانات الاتصال" },
  { key: "status", label: "الحالة" },
  { key: "created_at", label: "تاريخ الإضافة" },
  { key: "actions", label: "الإجراءات" },
];

export const statusBadgeStyles: Record<StaffStatus, string> = {
  approved:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
  suspended:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/20",
};

export const statusValue: Record<StaffStatus, string> = {
  approved: "نشط",
  suspended: "موقوف",
};
