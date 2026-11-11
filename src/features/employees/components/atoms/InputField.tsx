import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: "text" | "email" | "tel" | "password";
  register: UseFormRegister<T>;
  error?: string;
  placeHolder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export function InputField<T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  placeHolder,
  defaultValue,
  disabled,
}: InputFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-sm font-light text-sidebar dark:text-white">{label}</label>

      <div className="relative">
        <input
          type={type}
          defaultValue={defaultValue}
          {...register(name)}
          placeholder={placeHolder}
          disabled={disabled}
          className={`w-full border rounded-md p-2 focus:outline-0 bg-card placeholder:text-sidebar dark:placeholder:text-white text-sidebar dark:text-white/80 dark:bg-card-dark ${disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
