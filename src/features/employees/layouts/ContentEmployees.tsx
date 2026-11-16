import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
import { getApiErrorMessage } from "@/lib/axios";
import { Button } from "@/shared/ui/button";
import { useGetStaff } from "../hooks/useGetStaff";
import { StaffTable } from "../components/StaffTable";
import type { StaffStatus } from "../types/staff.types";

interface ContentEmployeesProps {
  onTotalItemsChange?: (total: number) => void;
}

export function ContentEmployees({ onTotalItemsChange }: ContentEmployeesProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const staff_name = searchParams.get("staff_name") || undefined;
  const email = searchParams.get("email") || undefined;
  const jobTitle = searchParams.get("jobTitle") || undefined;
  const status = (searchParams.get("status") as StaffStatus) || undefined;

  const { data, isLoading, isError, error, refetch, isFetching } = useGetStaff({
    page,
    limit,
    staff_name,
    email,
    jobTitle,
    status,
  });

  const totalItems = data?.meta?.total;
  const totalPages = data?.meta?.totalPages ?? 1;
  const items = data?.data ?? [];

  useEffect(() => {
    if (onTotalItemsChange && totalItems !== undefined) {
      onTotalItemsChange(totalItems);
    }
  }, [onTotalItemsChange, totalItems]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  if (isError) {
    return (
      <div
        dir="rtl"
        className="w-full rounded-2xl border border-destructive/30 bg-destructive/10 p-8 flex flex-col items-center justify-center gap-4 text-center"
      >
        <p className="text-destructive font-bold text-base">
          {getApiErrorMessage(error, "تعذر تحميل بيانات الموظفين")}
        </p>
        <Button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="bg-primary text-white rounded-lg px-6 py-2 cursor-pointer"
        >
          {isFetching ? "جاري إعادة المحاولة..." : "إعادة المحاولة"}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <StaffTable
        data={items}
        isLoading={isLoading}
        emptyMessage="لا يوجد موظفون يطابقون خيارات البحث الحالية"
      />

      {totalPages > 1 && (
        <PaginationLayout
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
