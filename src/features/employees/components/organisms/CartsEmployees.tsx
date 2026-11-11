import { CheckCircle, CircleX, Users } from "lucide-react";
// import { useSearchParams } from "react-router-dom";
// import { useEmployees } from "../../hooks/useEmployees";
import { OneCartEmployees } from "../molecules/OneCartEmployees";
// import { OneCartEmployeesSkeleton } from "../molecules/OneCartEmployeesSkeleton";

export function CartsEmployees() {
  // const [searchParams] = useSearchParams();
  // const search = searchParams.get("employee_name") || "";
  // const { data, isLoading, isError } = useEmployees({
  //   search,
  //   page: 1,
  //   limit: 1,
  // });

  // if (isLoading) {
  //   return (
  //     <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
  //       <OneCartEmployeesSkeleton />
  //       <OneCartEmployeesSkeleton />
  //       <OneCartEmployeesSkeleton />
  //       <OneCartEmployeesSkeleton />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div
  //       dir="rtl"
  //       className="w-full rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-500 text-sm"
  //     >
  //       تعذر تحميل إحصائيات الموظفين
  //     </div>
  //   );
  // }

  // const totalMembers = data?.totalMembers ?? 0;
  // const activeEmployees = data?.activeEmployees ?? 0;
  // const totalApplications = data?.totalApplications ?? 0;

  const totalMembers = 10
  const activeEmployees = 10
  const totalApplications = 10

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      <OneCartEmployees
        type="number"
        title="إجمالي الموظفين"
        value={totalMembers}
        Icon={Users}
      />
      <OneCartEmployees
        type="number"
        title="موظفين نشطين"
        value={activeEmployees}
        Icon={CheckCircle}
      />
      <OneCartEmployees
        type="number"
        title="موظفين موقفون"
        value={totalApplications}
        Icon={CircleX}
      />
      <OneCartEmployees
        type="number"
        title="الرسائل"
        value={91}
        Icon={CheckCircle}
      />
    </div>
  );
}
