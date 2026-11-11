import { Checkbox } from "@/ui/checkbox";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

type CheckboxFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  defaultValue?: boolean;
  disabled?: boolean;
};

export function CheckboxField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  defaultValue,
  disabled,
}: CheckboxFieldProps<T>) {
  return (
    <div className="p-2 rounded-lg w-full flex flex-col gap-2 bg-card dark:bg-popover-dark">
      <div className="w-full flex justify-between gap-2 items-center">
        <label
          htmlFor={name}
          className={`flex-1 text-sm font-light text-sidebar dark:text-white/90 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
        >
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue as never}
          render={({ field }) => (
            <Checkbox
              id={name}
              checked={!!field.value}
              onCheckedChange={(value) => field.onChange(value === true)}
              disabled={disabled}
            />
          )}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
