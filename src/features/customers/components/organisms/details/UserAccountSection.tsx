import {
  Ban,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  Trash2,
  XCircle,
} from "lucide-react";
import type { UserItem } from "../../../types";
import { formatOptionalDate } from "../../../utils/formatUserDate";
import { UserInfoRow } from "../../molecules/UserInfoRow";

type UserAccountSectionProps = {
  user: UserItem;
};

export function UserAccountSection({ user }: UserAccountSectionProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
      <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
        <ShieldCheck className="size-4" />
        <span>بيانات الحساب الأساسية</span>
      </div>

      <div className="flex flex-col">
        <UserInfoRow
          title="معرف المستخدم"
          value={
            <span className="font-mono text-xs bg-sidebar/10 dark:bg-white/10 px-2 py-0.5 rounded">
              {user.id}
            </span>
          }
        />
        <UserInfoRow
          title="البريد الإلكتروني"
          value={<span dir="ltr">{user.email}</span>}
          icon={<Mail className="size-3.5" />}
        />
        <UserInfoRow
          title="رقم الهاتف"
          value={<span dir="ltr">{user.phone || "غير متوفر"}</span>}
          icon={<Phone className="size-3.5" />}
        />
        <UserInfoRow
          title="توثيق البريد"
          value={
            user.email_verified ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="size-3.5" />
                <span>موثق ({formatOptionalDate(user.email_verified_at)})</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-sidebar/60 dark:text-white/50 text-xs">
                <XCircle className="size-3.5" />
                <span>غير موثق</span>
              </span>
            )
          }
        />
        <UserInfoRow
          title="تاريخ الإنشاء"
          value={formatOptionalDate(user.created_at)}
          icon={<Calendar className="size-3.5" />}
        />
        <UserInfoRow
          title="تاريخ الاعتماد"
          value={formatOptionalDate(user.approved_at)}
          icon={<CheckCircle2 className="size-3.5 text-emerald-500" />}
        />
        <UserInfoRow
          title="تاريخ الإيقاف"
          value={formatOptionalDate(user.suspended_at)}
          icon={<Ban className="size-3.5 text-rose-500" />}
        />
        <UserInfoRow
          title="تاريخ الحذف"
          value={formatOptionalDate(user.deleted_at)}
          icon={<Trash2 className="size-3.5 text-destructive" />}
        />
      </div>
    </div>
  );
}
