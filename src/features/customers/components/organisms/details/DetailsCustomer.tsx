import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import {
  Ban,
  Building2,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import {
  adminTypeValue,
  roleBadgeStyles,
  roleValue,
  statusBadgeStyles,
  statusValue,
} from "../../../data/tableData";
import {
  getUserDisplayName,
  type UserItem,
  type UserRole,
  type UserStatus,
} from "../../../types";

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
        "flex justify-between items-center gap-4 py-2.5 border-b border-sidebar/10 dark:border-white/5 last:border-0 text-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sidebar/70 dark:text-white/60 shrink-0">
        {icon}
        <span>{title}</span>
      </div>
      <div className="font-medium text-sidebar dark:text-white text-left break-all">
        {value ?? "—"}
      </div>
    </div>
  );
}

export function DetailsCustomer({ user }: DetailsCustomerProps) {
  const displayName = getUserDisplayName(user);
  const initial = displayName[0]?.toUpperCase() || "U";

  const formatOptionalDate = (date?: string | null) =>
    date ? formatDateToDDMMYYYY(date) : "—";

  const showProfileSection =
    user.role === "user" || user.profile !== null;
  const showCompanySection =
    user.role === "company" || user.company !== null;
  const showAdminSection = user.role === "admin";

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col gap-6 p-4 text-sidebar dark:text-white"
    >
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 dark:bg-popover-dark/50 border border-sidebar/15 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
            {initial}
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-bold text-sidebar dark:text-white">
              {displayName}
            </h3>
            <p className="text-xs text-sidebar/70 dark:text-white/60" dir="ltr">
              {user.email}
            </p>
            {user.phone && (
              <p className="text-xs text-secondary-light" dir="ltr">
                {user.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold border",
              roleBadgeStyles[user.role as UserRole] || "text-sidebar bg-muted",
            )}
          >
            {roleValue[user.role as UserRole] || user.role}
          </span>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold border",
              statusBadgeStyles[user.status as UserStatus] ||
                "text-sidebar bg-muted",
            )}
          >
            {statusValue[user.status as UserStatus] || user.status}
          </span>
          {user.deleted_at !== null && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-destructive/15 text-destructive border-destructive/30">
              محذوف
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Common Account Details */}
        <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
            <ShieldCheck className="size-4" />
            <span>بيانات الحساب الأساسية</span>
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
              title="البريد الإلكتروني"
              value={<span dir="ltr">{user.email}</span>}
              icon={<Mail className="size-3.5" />}
            />
            <InfoRow
              title="رقم الهاتف"
              value={<span dir="ltr">{user.phone || "غير متوفر"}</span>}
              icon={<Phone className="size-3.5" />}
            />
            <InfoRow
              title="توثيق البريد"
              value={
                user.email_verified ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="size-3.5" />
                    <span>
                      موثق ({formatOptionalDate(user.email_verified_at)})
                    </span>
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
              title="تاريخ الإنشاء"
              value={formatOptionalDate(user.created_at)}
              icon={<Calendar className="size-3.5" />}
            />
            <InfoRow
              title="تاريخ الاعتماد"
              value={formatOptionalDate(user.approved_at)}
              icon={<CheckCircle2 className="size-3.5 text-emerald-500" />}
            />
            <InfoRow
              title="تاريخ الإيقاف"
              value={formatOptionalDate(user.suspended_at)}
              icon={<Ban className="size-3.5 text-rose-500" />}
            />
            <InfoRow
              title="تاريخ الحذف"
              value={formatOptionalDate(user.deleted_at)}
              icon={<Trash2 className="size-3.5 text-destructive" />}
            />
          </div>
        </div>

        {/* Role-Specific Details */}
        <div className="flex flex-col gap-4">
          {showProfileSection && (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
              <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
                <User className="size-4" />
                <span>الملف الشخصي</span>
              </div>

              {user.profile ? (
                <div className="flex flex-col">
                  <InfoRow
                    title="الاسم الكامل"
                    value={user.profile.full_name || "—"}
                  />
                  <InfoRow
                    title="العنوان"
                    value={user.profile.address || "—"}
                    icon={<MapPin className="size-3.5" />}
                  />
                  <InfoRow
                    title="مستندات الهوية"
                    value={
                      user.profile.identity_documents_submitted ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                          <FileCheck2 className="size-3.5" />
                          <span>تم التقديم</span>
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          لم يتم التقديم
                        </span>
                      )
                    }
                  />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground py-2">
                  لا توجد بيانات ملف شخصي مسجلة
                </p>
              )}
            </div>
          )}

          {showCompanySection && (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
              <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
                <Building2 className="size-4" />
                <span>بيانات الشركة</span>
              </div>

              {user.company ? (
                <div className="flex flex-col">
                  <InfoRow
                    title="اسم الشركة"
                    value={user.company.company_name || "—"}
                  />
                  <InfoRow
                    title="رقم التسجيل"
                    value={user.company.registration_number || "—"}
                  />
                  <InfoRow
                    title="العنوان"
                    value={user.company.address || "—"}
                    icon={<MapPin className="size-3.5" />}
                  />
                  <InfoRow
                    title="مستندات الشركة"
                    value={
                      user.company.identity_documents_submitted ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                          <FileCheck2 className="size-3.5" />
                          <span>تم التقديم</span>
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          لم يتم التقديم
                        </span>
                      )
                    }
                  />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground py-2">
                  لا توجد بيانات شركة مسجلة
                </p>
              )}
            </div>
          )}

          {showAdminSection && (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
              <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
                <ShieldCheck className="size-4" />
                <span>تفاصيل الإدارة</span>
              </div>

              <div className="flex flex-col">
                <InfoRow
                  title="نوع الإدارة"
                  value={
                    user.admin_type
                      ? adminTypeValue[user.admin_type] || user.admin_type
                      : "—"
                  }
                />
                <InfoRow
                  title="الدور"
                  value={roleValue[user.role as UserRole] || user.role}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
