import { Checkbox } from "@/ui/checkbox";

type Props = {
  name: string;
  defaultValue: boolean;
  onChange?: (value: boolean) => void;
};

export function AuthorizationManagementCheckbox({
  defaultValue,
  name,
  onChange,
}: Props) {
  return (
    <Checkbox
      id={name}
      name={name}
      checked={defaultValue}
      onCheckedChange={(value) => onChange?.(value === true)}
    />
  );
}
