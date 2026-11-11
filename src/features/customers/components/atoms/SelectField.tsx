import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  options: Option[];
  error?: string;
  defaultValue?: string;
};

export function SelectField<TFieldValues extends FieldValues>({
  label,
  name,
  control,
  options,
  error,
  defaultValue,
}: SelectFieldProps<TFieldValues>) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-light text-sidebar dark:text-white">{label}</Label>
      <Controller
        name={name}
        control={control}
        defaultValue={(defaultValue ?? "") as never}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange} dir="rtl">
            <SelectTrigger className="w-full text-sidebar dark:text-white bg-white dark:bg-card-dark">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent className="w-full text-sidebar dark:text-white bg-popover dark:bg-card-dark">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
