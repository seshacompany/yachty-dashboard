import type { UseFormRegister } from "react-hook-form";
import type { UpdateFrequentlyAskedQuestionsType } from "../../schemas/edit.FrequentlyAskedQuestions";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  name: keyof UpdateFrequentlyAskedQuestionsType;
  register: UseFormRegister<UpdateFrequentlyAskedQuestionsType>;
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
        className="w-full border rounded-md p-2 bg-transparent focus:outline-0 text-sidebar dark:text-white/90"
        defaultValue={defaultValue}
      >
        <option defaultChecked value="" className="bg-popover dark:bg-card-dark text-sidebar dark:text-white/90">{label}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-popover dark:bg-card-dark text-sidebar dark:text-white/90">
            {opt.label}
          </option>
        ))}
      </select>

      {
        error && (
          <p className="text-red-500 text-sm">{error}</p>
        )
      }
    </div >
  );
}