import type { TableHeader } from "@/types/typesLayouts";
import type { RentalDecisionStatus, RentalStatus } from "../types";

export const headers: TableHeader[] = [
  { key: "boat", label: "المركب / النوع" },
  { key: "owner_name", label: "اسم صاحب المركب" },
  { key: "owner_phone", label: "رقم الهاتف" },
  { key: "status", label: "الحالة" },
  { key: "actions", label: "الإجراءات" },
];

export const rentalStatusValue: Record<RentalStatus | string, string> = {
  pending: "قيد المراجعة",
  approved: "مقبول",
  rejected: "مرفوض",
  suspended: "موقوف",
};

export const rentalStatusBadgeStyles: Record<RentalStatus | string, string> = {
  approved:
    "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  pending:
    "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  rejected:
    "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
  suspended: "text-destructive bg-destructive/10 border-destructive/25",
};

export const rentalStatusOptions: { label: string; value: RentalStatus }[] = [
  { label: "قيد المراجعة (pending)", value: "pending" },
  { label: "مقبول (approved)", value: "approved" },
  { label: "مرفوض (rejected)", value: "rejected" },
  { label: "موقوف (suspended)", value: "suspended" },
];

export const rentalDecisionOptions: {
  label: string;
  value: RentalDecisionStatus;
}[] = [
  { label: "اعتماد وقبول (approved)", value: "approved" },
  { label: "رفض (rejected)", value: "rejected" },
  { label: "إيقاف (suspended)", value: "suspended" },
];
