import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type FilterCustomersProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
};

export function FilterCustomers({ setShow, show }: FilterCustomersProps) {
  return (
    <button
      type="button"
      onClick={() => setShow(!show)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 border border-sidebar/20 dark:border-white/20",
        show
          ? "bg-primary text-white border-primary"
          : "bg-white text-sidebar hover:bg-muted dark:bg-card-dark dark:text-white"
      )}
      title="تصفية النتائج"
    >
      <Filter size={18} />
      <span className="text-sm font-medium">تصفية</span>
    </button>
  );
}
