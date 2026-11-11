import { cn } from "@/lib/utils";
import { TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import type { TableHeader as TableHeaderType } from "@/types/typesLayouts";
import { Checkbox } from "@/ui/checkbox";

type HeaderTableProps = {
  headers: TableHeaderType[];
  allSelected: boolean;
  toggleAll: () => void;
};

export function HeaderTable({
  headers,
  allSelected,
  toggleAll,
}: HeaderTableProps) {
  return (
    <TableHeader className="bg-primary/50">
      <TableRow>
        <TableHead className="p-3 py-5 text-center">
          <div className="flex justify-center">
            <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
          </div>
        </TableHead>
        {headers.map(({ label }, index) => (
          <TableHead key={index} className={cn("p-3 text-center font-medium text-sidebar dark:text-white/90")}>
            {label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
