import type { TableRow } from "../../types";
import { PowersOneEmployeeDetails } from "./PowersOneEmployeeDetails";

type PowersOneEmployeeProps = {
  row: TableRow;
};

export function PowersOneEmployee({ row }: PowersOneEmployeeProps) {
  return (
    <div className="w-full px-4 flex flex-col gap-2">
      <p className="text-sidebar/90 dark:text-white/90">
        الصلاحيات الحالية
      </p>
      <div className="grid md:grid-cols-2 gap-2">
        <PowersOneEmployeeDetails title="العملاء" value={Boolean(row.customers)} />
        <PowersOneEmployeeDetails title=" أصحاب الوحدات" value={Boolean(row.unity_owners)} />
        <PowersOneEmployeeDetails title="الوحدات" value={Boolean(row.units)} />
        <PowersOneEmployeeDetails title="الإعلانات" value={Boolean(row.advertisements)} />
        <PowersOneEmployeeDetails title="المدفوعات" value={Boolean(row.payments)} />
        <PowersOneEmployeeDetails title="المحتوى" value={Boolean(row.content)} />
        <PowersOneEmployeeDetails title="الرسائل" value={Boolean(row.messages)} />
        <PowersOneEmployeeDetails title="الأسئلة الشائعة" value={Boolean(row.frequently_asked_questions)} />
        <PowersOneEmployeeDetails title="الشروط والأحكام" value={Boolean(row.terms_and_conditions)} />
        <PowersOneEmployeeDetails title="المراجعات" value={Boolean(row.reviews)} />
        <PowersOneEmployeeDetails title="الموظفون" value={Boolean(row.employees)} />
        <PowersOneEmployeeDetails title="العقارات" value={Boolean(row.real_estate)} />
      </div>
    </div>
  );
}
