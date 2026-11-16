import {
  STAFF_PERMISSIONS,
  STAFF_PERMISSION_LABELS,
  type TableRow,
} from "../../types";
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
        {STAFF_PERMISSIONS.map((perm) => (
          <PowersOneEmployeeDetails
            key={perm}
            title={STAFF_PERMISSION_LABELS[perm]}
            value={Boolean(row.permissions?.includes(perm))}
          />
        ))}
      </div>
    </div>
  );
}
