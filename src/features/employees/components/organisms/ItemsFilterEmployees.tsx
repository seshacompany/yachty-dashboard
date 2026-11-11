import { jobTitleEmployeeOptions, statusEmployeeOptions } from "@/data/temp/employeeData/optionData";
// import { useFilterProperties } from "../../hooks/useFilterProperties";
import { SelectFilter } from "../atoms/SelectFilter";

type ItemsFilterEmployeesProps = {
  show: boolean;
};

// const statusLabels: Record<string, string> = {
//   active: "نشط",
//   inactive: "موقوف",
// };

// const toOptions = (values: Array<string | number>) =>
//   values.map((value) => ({ label: String(value), value: String(value) }));

export function ItemsFilterEmployees({ show }: ItemsFilterEmployeesProps) {
  // const { data, isLoading } = useFilterProperties();

  if (!show) return null;

  // const jobTitleOptions = toOptions(data?.jobTitles ?? []);
  // const statusOptions = (data?.statuses ?? []).map((value) => ({
  //   label: statusLabels[value] ?? value,
  //   value,
  // }));

  const isLoading = false;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      <SelectFilter
        label="الدور"
        name="job_title"
        options={jobTitleEmployeeOptions}
        disabled={isLoading}
      />
      <SelectFilter
        label="الحالة"
        name="status"
        options={statusEmployeeOptions}
        disabled={isLoading}
      />
    </div>
  );
}
