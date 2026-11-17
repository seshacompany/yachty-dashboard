import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { useUsersFilters, type UserFilterKey } from "../../hooks/useUsersFilters";

type Option = {
  label: string;
  value: string;
};

type SelectFilterProps = {
  label: string;
  name: UserFilterKey;
  options: Option[];
};

export function SelectFilter({ label, name, options }: SelectFilterProps) {
  const { searchParams, setFilterParam } = useUsersFilters();
  const selectedValue = searchParams.get(name) || "";

  return (
    <div className="flex flex-col gap-2">
      <Select
        value={selectedValue || "all"}
        onValueChange={(value) => setFilterParam(name, value)}
      >
        <SelectTrigger className="w-full bg-secondary text-sidebar dark:bg-popover-dark dark:text-white">
          <SelectValue placeholder={label} />
        </SelectTrigger>

        <SelectContent className="w-full bg-secondary text-sidebar dark:bg-popover-dark dark:text-white">
          <SelectItem value="all">{label}</SelectItem>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
