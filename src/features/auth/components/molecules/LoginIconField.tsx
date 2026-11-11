import type { LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { FieldErrorMessage } from "@/features/auth/components/atoms/FieldErrorMessage";
import { cn } from "@/lib/utils";
import { Input } from "@/shared/ui/input";
import { Link } from "react-router-dom";

type LoginIconFieldProps = {
  icon: LucideIcon;
  errorMessage?: string;
  inputProps: ComponentProps<typeof Input>;
  name: string;
  label: string;
  titleLink?: string;
  link?: string;
  trailing?: ReactNode;
};

export function LoginIconField({
  icon: Icon,
  errorMessage,
  inputProps,
  name,
  label,
  link,
  titleLink,
  trailing,
}: LoginIconFieldProps) {
  const { className, ...rest } = inputProps;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="text-base font-medium text-navy dark:text-coastal-white">
          {label}
        </label>
        {
          link && titleLink ?
            <Link to={link} className="text-primary font-light">
              {titleLink}
            </Link> : null
        }

      </div>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute top-1/2 right-3 size-4.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          name={name}
          className={cn("pr-11", trailing && "pl-11", className)}
          {...rest}
        />
        {trailing ? (
          <div className="absolute top-1/2 left-2 -translate-y-1/2">
            {trailing}
          </div>
        ) : null}
      </div>
      <FieldErrorMessage message={errorMessage} />
    </div>
  );
}
