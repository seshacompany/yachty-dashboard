import type { UseFormRegister } from "react-hook-form";

type FormValues = {
  question: string;
  answer: string;
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
      <label className="text-sm font-light text-sidebar/90 dark:text-white">{label}</label>

      <input
        type="text"
        {...register(name)}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        className="w-full border border-sidebar/30 dark:border-white/20 rounded-md p-2 focus:outline-0 text-sidebar/90 dark:text-white placeholder:text-sidebar/50 dark:placeholder:text-white/50 bg-transparent"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}