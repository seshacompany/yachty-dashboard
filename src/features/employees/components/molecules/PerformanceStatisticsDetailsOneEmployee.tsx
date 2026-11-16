import type { TableRow } from "../../types";

type PerformanceStatisticsDetailsOneEmployeeProps = {
  row: TableRow;
};

export function PerformanceStatisticsDetailsOneEmployee({
  row,
}: PerformanceStatisticsDetailsOneEmployeeProps) {
  return (
    <div className="w-full px-4 flex flex-col gap-2">
      <p>إحصائيات الموظف</p>
      <div className="grid md:grid-cols-2 gap-2">
        <div className="bg-card dark:bg-popover-dark p-2 rounded-xl flex flex-col gap-1">
          <p className="text-sm text-sidebar/90 dark:text-white">
            عدد الصلاحيات
          </p>
          <p className="text-cyan text-lg">
            {Array.isArray(row.permissions) ? `${row.permissions.length} صلاحيات` : "—"}
          </p>
        </div>
        <div className="bg-card dark:bg-popover-dark text-sidebar/90 p-2 rounded-xl flex flex-col gap-1">
          <p className="text-sm text-sidebar/90 dark:text-white">الحالة</p>
          <p className="text-lg text-sidebar/70 dark:text-white">
            {row.status === "approved" ? "نشط" : "موقوف"}
          </p>
        </div>
      </div>
    </div>
  );
}
