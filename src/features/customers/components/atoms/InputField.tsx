import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type InputFieldProps<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  type?: "text" | "email" | "tel" | "password";
  register: UseFormRegister<TFieldValues>;
  error?: string;
  placeHolder?: string;
  defaultValue?: string;
};

export function InputField<TFieldValues extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  placeHolder,
  defaultValue,
}: InputFieldProps<TFieldValues>) {
  return (
    <div className="flex flex-col gap-2 ">
      <Label className="text-sm font-light">{label}</Label>

      <Input
        type={type}
        {...register(name)}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        className="w-full border rounded-md p-2 focus:outline-0 bg-card"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
