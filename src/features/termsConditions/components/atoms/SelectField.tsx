import type { UseFormRegister } from "react-hook-form";
import type { UpdateTermsConditionsType } from "../../schemas/edit.TermsConditions";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  name: keyof UpdateTermsConditionsType;
  register: UseFormRegister<UpdateTermsConditionsType>;
  options: Option[];
  error?: string;
  defaultValue?: string
};

export function SelectField({
  label,
  name,
  register,
  options,
  error,
  defaultValue
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">

      <select
        {...register(name)}
        className="w-full border rounded-md p-2 bg-card focus:outline-0 text-sidebar dark:text-white/80 dark:bg-card-dark"
        defaultValue={defaultValue}
      >
        <option defaultChecked value="">{label}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}