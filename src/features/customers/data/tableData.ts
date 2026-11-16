import type { TableHeader } from "@/types/typesLayouts";
import type { UserRole, UserStatus } from "../types";

export const headers: TableHeader[] = [
  { key: "name", label: "الاسم" },
  { key: "email", label: "البريد الإلكتروني" },
  { key: "role", label: "نوع المستخدم" },
  { key: "status", label: "الحالة" },
  { key: "actions", label: "الإجراءات" },
];

export const roleValue: Record<UserRole | string, string> = {
  user: "مستخدم",
  company: "شركة",
  admin: "مسؤول",
};

export const roleBadgeStyles: Record<UserRole | string, string> = {
  user: "text-info bg-info/15 border-info/30",
  company: "text-purple bg-purple/15 border-purple/30",
  admin: "text-warning bg-warning/15 border-warning/30",
};

export const adminTypeValue: Record<string, string> = {
  admin: "مدير عام",
  staff: "موظف إداري",
};

export const statusValue: Record<UserStatus | string, string> = {
  pending: "قيد الانتظار",
  approved: "مقبول",
  rejected: "مرفوض",
  suspended: "موقوف",
};

export const statusBadgeStyles: Record<UserStatus | string, string> = {
  approved: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  pending: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  rejected: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
  suspended: "text-destructive bg-destructive/10 border-destructive/25",
};

export const roleOptions: { label: string; value: UserRole }[] = [
  { label: "مستخدم (user)", value: "user" },
  { label: "شركة (company)", value: "company" },
  { label: "مسؤول (admin)", value: "admin" },
];

export const statusOptions: { label: string; value: UserStatus }[] = [
  { label: "قيد الانتظار (pending)", value: "pending" },
  { label: "مقبول (approved)", value: "approved" },
  { label: "مرفوض (rejected)", value: "rejected" },
  { label: "موقوف (suspended)", value: "suspended" },
];
