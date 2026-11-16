import { cn } from "@/lib/utils";
import { Checkbox } from "@/ui/checkbox";
import { headers } from "../../data/tableData";
import type { Employee } from "../../types";
import { ActionsEmployee } from "./ActionsEmployee";

type OneItemTableEmployeeProps = {
  selected: string[];
  row: Employee;
  setSelected: (value: React.SetStateAction<string[]>) => void;
};

export function OneItemTableEmployee({
  selected,
  row,
  setSelected,
}: OneItemTableEmployeeProps) {
  const isSelected = selected.includes(row.id);
  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <tr
      key={row.id}
      className={`border-t py-2 transition-all duration-300 ease-in-out ${isSelected ? "bg-card dark:bg-popover-dark" : ""}`}
    >
      <td className="p-3 py-5 text-center">
        <div className="flex justify-center">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleOne(row.id)}
          />
        </div>
      </td>

      {headers
        .filter((header) => header.key !== "actions")
        .map((header) => (
          <td key={header.key}>
            {header.key === "staff_name" ? (
              <div className="flex gap-3 items-center">
                <div className="bg-primary/20 text-primary rounded-full w-12 h-12 flex justify-center items-center">
                  <p>{(row.staff_name || row.email || "M")[0]}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar dark:text-white">
                    {row.staff_name || "—"}
                  </p>
                  <p className="text-sm text-sidebar/70 dark:text-white/70">
                    {row.id.slice(0, 4)}
                  </p>
                </div>
              </div>
            ) : header.key === "status" ? (
              <div>
                <p
                  className={cn(
                    "py-1 px-2 rounded-full w-fit mx-auto",
                    row.status === "approved"
                      ? "bg-success/50 text-success"
                      : "bg-warning/50 text-warning",
                  )}
                >
                  {row.status === "approved" ? "نشط" : "موقوف"}
                </p>
              </div>
            ) : (
              <p className="text-center text-sidebar dark:text-white">
                {String(row[header.key as keyof Employee] ?? "—")}
              </p>
            )}
          </td>
        ))}

      <td>
        <ActionsEmployee row={row} />
      </td>
    </tr>
  );
}
