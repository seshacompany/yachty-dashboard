import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: Option[];
  error?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export function SelectField<T extends FieldValues>({
  label,
  name,
  register,
  options,
  error,
  defaultValue,
  disabled,
}: SelectFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>

      <select
        {...register(name)}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`w-full border rounded-md p-2 bg-card text-sidebar dark:text-white/80 dark:bg-card-dark focus:outline-0 ${disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        <option value="" disabled>
          اختر {label}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
