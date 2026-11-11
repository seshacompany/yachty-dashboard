import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";
import { AuthorizationManagementCheckbox } from "../atoms/AuthorizationManagementCheckbox";

type Props<TFieldValues extends FieldValues = FieldValues> = {
  value?: boolean;
  title: string;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function OneItemAuthorizationManagementEmployee<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  title,
  value = false,
  control,
}: Props<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value as unknown as PathValue<TFieldValues, FieldPath<TFieldValues>>}
      render={({ field }) => (
        <div className="flex justify-between items-center py-2 px-4 rounded-xl border border-solid border-sidebar/70 dark:border-white/70 cursor-pointer">
          <label
            htmlFor={name}
            className="flex-1 cursor-pointer text-sidebar dark:text-white"
          >
            {title}
          </label>

          <AuthorizationManagementCheckbox
            name={name}
            defaultValue={Boolean(field.value)}
            onChange={field.onChange}
          />
        </div>
      )}
    />
  );
}