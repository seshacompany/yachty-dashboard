import { useDebouncedSearchParam } from "@/hooks/useDebouncedSearchParam";
import { Search } from "lucide-react";

export function SearchMessages() {
  const { value, setValue } = useDebouncedSearchParam("search", 2000);

  return (
    <div className="md:col-span-8 p-4 border border-solid rounded-lg border-sidebar/30 dark:border-white/20  flex gap-2 items-center">
      <Search size={20} className="text-sidebar/80 dark:text-white/50" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="البحث بإسم صاحب الرسالة"
        className="focus:outline-0 text-sidebar dark:text-white placeholder:text-sidebar/80 dark:placeholder:text-white/50 flex-1"
      />
    </div>
  );
}