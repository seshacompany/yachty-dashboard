import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/shared/icons/WhatsappIcon";
import type { TableRow } from "@/types/typesLayouts";
import { Checkbox } from "@/ui/checkbox";
import { DetailsOneCustomer } from "../components/organisms/detailsOneOrder/DetailsOneCustomer";
import { categoryValue, genderValue, headers, statusValue } from "../data/tableData";

type OneItemTableProps = {
  selected: string[];
  row: TableRow;
  setSelected: (value: React.SetStateAction<string[]>) => void;
};

export function OneItemTable({
  selected,
  row,
  setSelected,
}: OneItemTableProps) {
  const isSelected = selected.includes(row.id);
  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <tr
      key={row.id}
      className={`border-t py-2 ${isSelected ? "bg-muted" : ""}`}
    >
      <td className="p-3 py-5 text-center">
        <div className="flex justify-center">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleOne(row.id)}
          />
        </div>
      </td>

      {headers.map(({ key }, i) => (
        <td key={i} className="p-3 py-5 text-center">
          {key == "contact" ? (
            <a
              href={`https://wa.me/${row["phone_number"]}`}
              target="_blank"
              className={cn(
                "rounded-4xl flex w-fit px-3 py-2 mx-auto bg-whatsapp hover:bg-whatsapp/90 justify-center transition-colors",
              )}
            >
              <WhatsappIcon className="relative w-8" />
            </a>
          ) : (
            <PopUpLayout
              title={`تفاصيل العميل ${row["fullName"]}`}
              content={
                <>
                  {key == "status" ? (
                    <p
                      className={cn(
                        "rounded-4xl px-4 py-1 w-fit mx-auto",
                        row[key] == "active"
                          ? "text-success bg-success/15"
                          : "text-danger bg-danger/15",
                      )}
                    >
                      {statusValue[`${row[key]}`]}
                    </p>
                  ) : (
                    <>
                      <p className={cn("text-sidebar/70 dark:text-white/70", key == "client_name" ? "text-right" : "")}>
                        {key === "id"
                          ? `${String(row["id"]).slice(0, 10)}...`
                          : key === "gender"
                            ? genderValue[row[key] as keyof typeof genderValue] ?? row[key]?.toString()
                            : key === "category"
                              ? categoryValue[row[key] as keyof typeof categoryValue] ?? row[key]?.toString()
                              : row[key]?.toString()}
                      </p>
                      {key == "fullName" && (
                        <p className="text-secondary-light text-sm">
                          {row["phone"]?.toString()}
                        </p>
                      )}
                    </>
                  )}
                </>
              }
            >
              <DetailsOneCustomer row={row} />
            </PopUpLayout>
          )}
        </td>
      ))}
    </tr>
  );
}
