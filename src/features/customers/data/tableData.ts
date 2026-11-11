import type { TableHeader } from "@/types/typesLayouts";
import type { SortOrder, UserGender, UserRole, UserStatus } from "../types";

export const headers: TableHeader[] = [
  { key: "name", label: "الاسم" },
  { key: "email", label: "البريد الإلكتروني" },
  { key: "gender", label: "النوع" },
  { key: "role", label: "نوع المستخدم" },
  { key: "status", label: "الحالة" },
  { key: "actions", label: "الإجراءات" },
];

export const roleValue: Record<UserRole | string, string> = {
  SEEKER: "باحث عن سكن",
  OWNER: "صاحب سكن",
  ADMIN: "مسؤول",
};

export const roleBadgeStyles: Record<UserRole | string, string> = {
  SEEKER: "text-info bg-info/15 border-info/30",
  OWNER: "text-purple bg-purple/15 border-purple/30",
  ADMIN: "text-warning bg-warning/15 border-warning/30",
};

export const statusValue: Record<UserStatus | string, string> = {
  PENDING: "قيد الانتظار",
  ACTIVE: "نشط",
  SUSPENDED: "موقوف",
};

export const statusBadgeStyles: Record<UserStatus | string, string> = {
  ACTIVE: "text-success bg-success/15 border-success/30",
  PENDING: "text-pending bg-pending/15 border-pending/30",
  SUSPENDED: "text-danger bg-danger/15 border-danger/30",
};

export const genderValue: Record<UserGender | string, string> = {
  MALE: "ذكر",
  FEMALE: "أنثى",
};

export const categoryValue: Record<string, string> = {
  student: "طالب",
  graduate: "خريج",
};

export const roleOptions: { label: string; value: UserRole }[] = [
  { label: "باحث عن سكن", value: "SEEKER" },
  { label: "صاحب سكن", value: "OWNER" },
  { label: "مسؤول", value: "ADMIN" },
];

export const statusOptions: { label: string; value: UserStatus }[] = [
  { label: "نشط", value: "ACTIVE" },
  { label: "قيد الانتظار", value: "PENDING" },
  { label: "موقوف", value: "SUSPENDED" },
];

export const sortOrderOptions: { label: string; value: SortOrder }[] = [
  { label: "الأحدث أولاً (تنازلي)", value: "DESC" },
  { label: "الأقدم أولاً (تصاعدي)", value: "ASC" },
];
