// import { useDebouncedSearchParam } from "@/hooks/useDebouncedSearchParam";
import { Search } from "lucide-react";

export function SearchFrequentlyAskedQuestions() {
  // const { value, setValue } = useDebouncedSearchParam("search", 2000);

  return (
    <div className="md:col-span-6 p-4 border border-solid rounded-lg border-sidebar/40 dark:border-white/20 flex gap-2 items-center">
      <Search size={20} className="text-sidebar/50 dark:text-white/50" />
      <input
        type="text"
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        placeholder="البحث بالسؤال"
        className="focus:outline-0 text-sidebar/90 dark:text-white placeholder:text-sidebar/50 dark:placeholder:text-white/50 flex-1"
      />
    </div>
  );
}