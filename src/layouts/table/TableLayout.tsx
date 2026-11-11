import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/shared/ui/table";
import type { TableHeader } from "@/types/typesLayouts";
import { useState } from "react";
import { HeaderTable } from "./HeaderTable";

type TableLayoutProps<T extends { id: string }> = {
  headers: TableHeader[];
  data: T[];
  isLoading?: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
  children: (
    row: T,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => React.ReactNode;
};

export function TableLayout<T extends { id: string }>({
  headers,
  data,
  isLoading = false,
  skeletonRows = 5,
  emptyMessage,
  children,
}: TableLayoutProps<T>) {
  const [selected, setSelected] = useState<string[]>([]);

  const allSelected =
    !isLoading && data.length > 0 && selected.length === data.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(data.map((row) => row.id));
    }
  };

  return (
    <div className="w-full rounded-xl">
      <Table>
        <HeaderTable
          allSelected={allSelected}
          headers={headers}
          toggleAll={toggleAll}
        />
        <TableBody>
          {isLoading ? (
            Array.from({ length: skeletonRows }).map((_, rowIdx) => (
              <TableRow key={`skeleton-${rowIdx}`}>
                <TableCell className="p-3 py-5 text-center">
                  <Skeleton className="h-4 w-4 mx-auto" />
                </TableCell>
                {headers.map((_, colIdx) => (
                  <TableCell key={colIdx} className="p-3 py-5 text-center">
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 && emptyMessage ? (
            <TableRow>
              <TableCell
                colSpan={headers.length + 1}
                className="p-6 text-center text-sidebar dark:text-white/60"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => children(row, selected, setSelected))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
