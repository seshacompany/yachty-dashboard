import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
import { TableLayout } from "@/layouts/table/TableLayout";
import { getApiErrorMessage } from "@/lib/axios";
import { Button } from "@/shared/ui/button";
import { headers } from "../data/tableData";
import { useUsers } from "../hooks/useUsers";
import type { UserItem, UserRole, UserStatus } from "../types";
import { OneItemTableCustomer } from "./OneItemTableCustomer";

type ContentCustomersProps = {
  onTotalChange?: (total: number) => void;
};

export function ContentCustomers({ onTotalChange }: ContentCustomersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const email = searchParams.get("email") || undefined;
  const phone = searchParams.get("phone") || undefined;
  const role = (searchParams.get("role") as UserRole) || undefined;
  const status = (searchParams.get("status") as UserStatus) || undefined;
  const fromDate = searchParams.get("fromDate") || undefined;
  const toDate = searchParams.get("toDate") || undefined;

  const { data, isLoading, isError, error, refetch, isFetching } = useUsers({
    page,
    limit,
    email,
    phone,
    role,
    status,
    fromDate,
    toDate,
  });

  const totalCount = data?.meta?.total;

  useEffect(() => {
    if (onTotalChange && totalCount !== undefined) {
      onTotalChange(totalCount);
    }
  }, [onTotalChange, totalCount]);

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
          {getApiErrorMessage(error, "تعذر تحميل بيانات المستخدمين")}
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

  const items = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-popover-dark/30 overflow-hidden shadow-xs">
        <TableLayout<UserItem>
          headers={headers}
          data={items}
          isLoading={isLoading}
          skeletonRows={10}
          emptyMessage="لا يوجد مستخدمون يطابقون خيارات البحث الحالية"
        >
          {(row, selected, setSelected) => (
            <OneItemTableCustomer
              key={row.id}
              user={row}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </TableLayout>
      </div>

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
