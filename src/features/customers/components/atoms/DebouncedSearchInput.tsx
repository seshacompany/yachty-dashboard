import { X, type LucideIcon } from "lucide-react";
import { useDebouncedParam } from "../../hooks/useDebouncedParam";
import type { UserFilterKey } from "../../hooks/useUsersFilters";

type DebouncedSearchInputProps = {
  paramKey: UserFilterKey;
  placeholder: string;
  icon: LucideIcon;
};

export function DebouncedSearchInput({
  paramKey,
  placeholder,
  icon: Icon,
}: DebouncedSearchInputProps) {
  const { value, setValue, clear } = useDebouncedParam(paramKey);

  return (
    <div className="p-2 border rounded-lg border-sidebar/20 dark:border-white/20 bg-white dark:bg-card-dark flex gap-2 items-center">
      <Icon
        size={17}
        className="text-sidebar/60 dark:text-white/60 shrink-0"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="focus:outline-none text-sidebar dark:text-white placeholder:text-sidebar/50 dark:placeholder:text-white/40 flex-1 text-sm bg-transparent min-w-0"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="text-sidebar/50 dark:text-white/40 hover:text-sidebar dark:hover:text-white cursor-pointer"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
