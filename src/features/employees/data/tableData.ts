import type { TableHeader } from "@/types/typesLayouts";
import type { Gender, StaffStatus } from "../types";

export const headers: TableHeader[] = [
  { key: "name", label: "الموظف" },
  { key: "jobTitle", label: "المسمى الوظيفي" },
  { key: "contact", label: "بيانات الاتصال" },
  { key: "gender", label: "الجنس" },
  { key: "status", label: "الحالة" },
  { key: "actions", label: "الإجراءات" },
];

export const statusBadgeStyles: Record<StaffStatus, string> = {
  ACTIVE:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  PENDING:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  SUSPENDED:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export const statusValue: Record<StaffStatus, string> = {
  ACTIVE: "نشط",
  PENDING: "معلق",
  SUSPENDED: "موقوف",
};

export const genderValue: Record<Gender, string> = {
  MALE: "ذكر",
  FEMALE: "أنثى",
};