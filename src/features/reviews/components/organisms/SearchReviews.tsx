import { useDebouncedSearchParam } from "@/hooks/useDebouncedSearchParam";
import { Search } from "lucide-react";

export function SearchReviews() {
  const { value, setValue } = useDebouncedSearchParam("search", 2000);

  return (
    <div className="md:col-span-6 p-4 border border-solid rounded-lg border-sidebar/40 dark:border-white/20 flex gap-2 items-center">
      <Search size={20} className="text-sidebar dark:text-white" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="البحث بإسم العميل"
        className="focus:outline-0 text-sidebar dark:text-white placeholder:text-sidebar/90 dark:placeholder:text-white/50 flex-1"
      />
    </div>
  );
}