import { Building2, FileCheck2, MapPin } from "lucide-react";
import type { UserCompany } from "../../../types";
import { UserInfoRow } from "../../molecules/UserInfoRow";

type UserCompanySectionProps = {
  company: UserCompany | null;
};

export function UserCompanySection({ company }: UserCompanySectionProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
      <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
        <Building2 className="size-4" />
        <span>بيانات الشركة</span>
      </div>

      {company ? (
        <div className="flex flex-col">
          <UserInfoRow title="اسم الشركة" value={company.company_name || "—"} />
          <UserInfoRow
            title="رقم التسجيل"
            value={company.registration_number || "—"}
          />
          <UserInfoRow
            title="العنوان"
            value={company.address || "—"}
            icon={<MapPin className="size-3.5" />}
          />
          <UserInfoRow
            title="مستندات الشركة"
            value={
              company.identity_documents_submitted ? (
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
  );
}
