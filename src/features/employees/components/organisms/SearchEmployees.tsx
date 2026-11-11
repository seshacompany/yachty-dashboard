import { useDebouncedSearchParam } from "@/hooks/useDebouncedSearchParam";
import { Search } from "lucide-react";

export function SearchEmployees() {
  const { value, setValue } = useDebouncedSearchParam("employee_name", 2000);

  return (
    <div className="flex-1 p-2 border border-solid rounded-lg border-sidebar/40 dark:border-white/20 flex gap-1 items-center">
      <Search size={20} className="text-sidebar dark:text-white" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="search"
        placeholder="البحث بإسم الموظف.."
        className="focus:outline-0 text-sidebar dark:text-white placeholder:text-sidebar/90 dark:placeholder:text-white/50 flex-1"
      />
    </div>
  );
}
