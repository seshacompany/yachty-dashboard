import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import {
  genderValue,
  roleBadgeStyles,
  roleValue,
  statusBadgeStyles,
  statusValue,
} from "../../../data/tableData";
import type { UserGender, UserItem, UserRole, UserStatus } from "../../../types";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";

type DetailsCustomerProps = {
  user: UserItem;
};

type InfoRowProps = {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

function InfoRow({ title, value, icon, className }: InfoRowProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center py-2.5 border-b border-sidebar/10 dark:border-white/5 last:border-0 text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sidebar/70 dark:text-white/60">
        {icon}
        <span>{title}</span>
      </div>
      <div className="font-medium text-sidebar dark:text-white text-left">
        {value ?? "—"}
      </div>
    </div>
  );
}

export function DetailsCustomer({ user }: DetailsCustomerProps) {
  const createdAt = formatDateToDDMMYYYY(user.createdAt);
  const updatedAt = formatDateToDDMMYYYY(user.updatedAt);
  const lastLoginAt = user.lastLoginAt
    ? formatDateToDDMMYYYY(user.lastLoginAt)
    : "لم يسجل دخول بعد";
  const emailVerifiedAt = user.emailVerifiedAt
    ? formatDateToDDMMYYYY(user.emailVerifiedAt)
    : null;
  const phoneVerifiedAt = user.phoneVerifiedAt
    ? formatDateToDDMMYYYY(user.phoneVerifiedAt)
    : null;

  return (
    <div dir="rtl" className="w-full flex flex-col gap-6 p-4 text-sidebar dark:text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 dark:bg-popover-dark/50 border border-sidebar/15 dark:border-white/10">
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="size-14 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
              {user.firstName?.[0] || "U"}
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-bold text-sidebar dark:text-white">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-xs text-sidebar/70 dark:text-white/60">
              {user.email}
            </p>
            {user.phone && (
              <p className="text-xs text-secondary-light">{user.phone}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold border",
              roleBadgeStyles[user.role as UserRole] || "text-sidebar bg-muted"
            )}
          >
            {roleValue[user.role as UserRole] || user.role}
          </span>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold border",
              statusBadgeStyles[user.status as UserStatus] || "text-sidebar bg-muted"
            )}
          >
            {statusValue[user.status as UserStatus] || user.status}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
            <User className="size-4" />
            <span>البيانات الشخصية</span>
          </div>

          <div className="flex flex-col">
            <InfoRow
              title="معرف المستخدم"
              value={
                <span className="font-mono text-xs bg-sidebar/10 dark:bg-white/10 px-2 py-0.5 rounded">
                  {user.id}
                </span>
              }
            />
            <InfoRow
              title="الاسم الأول"
              value={user.firstName}
            />
            <InfoRow
              title="الاسم الأخير"
              value={user.lastName}
            />
            <InfoRow
              title="النوع"
              value={genderValue[user.gender as UserGender] || user.gender || "—"}
            />
            <InfoRow
              title="نوع المستخدم"
              value={
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                    roleBadgeStyles[user.role as UserRole] || "text-sidebar bg-muted"
                  )}
                >
                  {roleValue[user.role as UserRole] || user.role}
                </span>
              }
            />
            <InfoRow
              title="حالة الحساب"
              value={
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                    statusBadgeStyles[user.status as UserStatus] || "text-sidebar bg-muted"
                  )}
                >
                  {statusValue[user.status as UserStatus] || user.status}
                </span>
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
            <ShieldCheck className="size-4" />
            <span>بيانات التواصل والتوثيق</span>
          </div>

          <div className="flex flex-col">
            <InfoRow
              title="البريد الإلكتروني"
              value={user.email}
              icon={<Mail className="size-3.5" />}
            />
            <InfoRow
              title="توثيق البريد الإلكتروني"
              value={
                emailVerifiedAt ? (
                  <span className="flex items-center gap-1 text-accent text-xs font-semibold">
                    <CheckCircle2 className="size-3.5" />
                    <span>موثق ({emailVerifiedAt})</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sidebar/60 dark:text-white/50 text-xs">
                    <XCircle className="size-3.5" />
                    <span>غير موثق</span>
                  </span>
                )
              }
            />
            <InfoRow
              title="رقم الهاتف"
              value={user.phone || "غير متوفر"}
              icon={<Phone className="size-3.5" />}
            />
            <InfoRow
              title="توثيق رقم الهاتف"
              value={
                phoneVerifiedAt ? (
                  <span className="flex items-center gap-1 text-accent text-xs font-semibold">
                    <CheckCircle2 className="size-3.5" />
                    <span>موثق ({phoneVerifiedAt})</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sidebar/60 dark:text-white/50 text-xs">
                    <XCircle className="size-3.5" />
                    <span>غير موثق</span>
                  </span>
                )
              }
            />
            <InfoRow
              title="آخر تسجيل دخول"
              value={lastLoginAt}
              icon={<Clock className="size-3.5" />}
            />
            <InfoRow
              title="تاريخ الإنشاء"
              value={createdAt}
              icon={<Calendar className="size-3.5" />}
            />
            <InfoRow
              title="تاريخ التحديث"
              value={updatedAt}
              icon={<Clock className="size-3.5" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
