import { cn } from "@/lib/utils";

type LoginLogoProps = {
  className?: string;
};

export function LoginLogo({ className }: LoginLogoProps) {
  return (
    <span
      className={cn(
        "font-display font-extrabold tracking-widest text-3xl md:text-4xl select-none transition-colors duration-300 text-navy dark:text-coastal-white",
        className
      )}
    >
      YACHTY
    </span>
  );
}
