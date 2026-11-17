import { FileCheck2, MapPin, User } from "lucide-react";
import type { UserProfile } from "../../../types";
import { UserInfoRow } from "../../molecules/UserInfoRow";

type UserProfileSectionProps = {
  profile: UserProfile | null;
};

export function UserProfileSection({ profile }: UserProfileSectionProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
      <div className="flex items-center gap-2 pb-2 border-b border-sidebar/15 dark:border-white/10 font-bold text-sm text-primary">
        <User className="size-4" />
        <span>الملف الشخصي</span>
      </div>

      {profile ? (
        <div className="flex flex-col">
          <UserInfoRow title="الاسم الكامل" value={profile.full_name || "—"} />
          <UserInfoRow
            title="العنوان"
            value={profile.address || "—"}
            icon={<MapPin className="size-3.5" />}
          />
          <UserInfoRow
            title="مستندات الهوية"
            value={
              profile.identity_documents_submitted ? (
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
  );
}
