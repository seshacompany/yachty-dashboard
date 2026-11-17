import { useEffect } from "react";
import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
import { TableLayout } from "@/layouts/table/TableLayout";
import { getApiErrorMessage } from "@/lib/axios";
import { Button } from "@/shared/ui/button";
import { headers } from "../data/tableData";
import { useUsers } from "../hooks/useUsers";
import { useUsersFilters } from "../hooks/useUsersFilters";
import type { UserItem } from "../types";
import { OneItemTableCustomer } from "./OneItemTableCustomer";

type ContentCustomersProps = {
  onTotalChange?: (total: number) => void;
};

export function ContentCustomers({ onTotalChange }: ContentCustomersProps) {
  const { queryParams, setPage } = useUsersFilters();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useUsers(queryParams);

  const totalCount = data?.meta?.total;

  useEffect(() => {
    if (onTotalChange && totalCount !== undefined) {
      onTotalChange(totalCount);
    }
  }, [onTotalChange, totalCount]);

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
  const currentPage = queryParams.page ?? 1;

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
          currentPage={currentPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
