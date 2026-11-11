import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { useSearchParams } from "react-router-dom";

type Option = {
  label: string;
  value: string;
};

type SelectFilterProps = {
  label: string;
  name: string;
  options: Option[];
};

export function SelectFilter({ label, name, options }: SelectFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValue = searchParams.get(name) || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    params.delete("page");

    setSearchParams(params);
  };

  return (
    <div className="flex flex-col gap-2">
      <Select value={selectedValue || "all"} onValueChange={handleChange}>
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
