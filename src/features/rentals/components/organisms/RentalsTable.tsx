import { useEffect, useState } from "react";
import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
import { TableLayout } from "@/layouts/table/TableLayout";
import { getApiErrorMessage } from "@/lib/axios";
import { Button } from "@/shared/ui/button";
import { headers } from "../../data/tableData";
import { useRentals } from "../../hooks/useRentals";
import { useRentalsFilters } from "../../hooks/useRentalsFilters";
import type { RentalItem } from "../../types";
import { RentalDetailsDialog } from "./details/RentalDetailsDialog";
import { RentalDecisionDialog } from "./RentalDecisionDialog";
import { RentalTableRow } from "./RentalTableRow";

type RentalsTableProps = {
  onTotalChange?: (total: number) => void;
};

export function RentalsTable({ onTotalChange }: RentalsTableProps) {
  const { queryParams, setPage } = useRentalsFilters();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useRentals(queryParams);

  const [selectedForView, setSelectedForView] = useState<RentalItem | null>(
    null,
  );
  const [selectedForDecision, setSelectedForDecision] =
    useState<RentalItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [decisionOpen, setDecisionOpen] = useState(false);

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
          {getApiErrorMessage(error, "تعذر تحميل بيانات المراكب")}
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
    <>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full rounded-2xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-popover-dark/30 overflow-hidden shadow-xs">
          <TableLayout<RentalItem>
            headers={headers}
            data={items}
            isLoading={isLoading}
            skeletonRows={8}
            emptyMessage="لا توجد مراكب معروضة للإيجار تطابق خيارات البحث الحالية"
          >
            {(row, selected, setSelected) => (
              <RentalTableRow
                key={row.id}
                rental={row}
                selected={selected}
                setSelected={setSelected}
                onViewDetails={(rental) => {
                  setSelectedForView(rental);
                  setDetailsOpen(true);
                }}
                onOpenDecision={(rental) => {
                  setSelectedForDecision(rental);
                  setDecisionOpen(true);
                }}
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

      <RentalDetailsDialog
        rental={selectedForView}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <RentalDecisionDialog
        rental={selectedForDecision}
        open={decisionOpen}
        onOpenChange={setDecisionOpen}
      />
    </>
  );
}
