import type { UseFormRegister } from "react-hook-form";

type FormValues = {
  name: string;
  position: string;
  stars: number;
  description: string;
  status?: string;
};

type InputFieldProps = {
  label: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  error?: string;
  placeHolder?: string,
  defaultValue?: string,
};

export function InputField({
  label,
  name,
  register,
  error,
  placeHolder,
  defaultValue
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-light text-sidebar dark:text-white">{label}</label>

      <input
        type="text"
        {...register(name)}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        className="w-full border rounded-md p-2 focus:outline-0 bg-card placeholder:text-sidebar dark:placeholder:text-white text-sidebar dark:text-white/80 dark:bg-card-dark"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}