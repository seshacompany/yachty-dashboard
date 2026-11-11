import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  placeHolder?: string;
  defaultValue?: string;
};

export function InputField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  placeHolder,
  defaultValue,
}: InputFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-light text-sidebar dark:text-white">{label}</label>

      <textarea
        {...register(name)}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        className="w-full border rounded-md p-2 focus:outline-0 bg-card placeholder:text-sidebar dark:placeholder:text-white text-sidebar dark:text-white/80 dark:bg-card-dark max-h-[25vh]"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}