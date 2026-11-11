import { useSearchParams } from "react-router-dom";

type Option = {
  label: string;
  value: string;
};

type SelectFilterProps = {
  label: string;
  name: string;
  options: Option[];
  disabled?: boolean;
};

export function SelectFilter({
  label,
  name,
  options,
  disabled,
}: SelectFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    params.delete("page");
    setSearchParams(params);
  };

  return (
    <div className="max-w-full flex flex-col gap-2">
      <select
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get(name) || ""}
        disabled={disabled}
        className={`w-full border rounded-md p-2 text-sidebar dark:text-white/80 dark:bg-card-dark bg-card focus:outline-0 ${disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        <option value="" className="max-w-full">{label}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="max-w-full">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
