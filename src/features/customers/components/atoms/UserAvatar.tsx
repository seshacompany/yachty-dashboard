import { cn } from "@/lib/utils";

type UserAvatarProps = {
  name: string;
  size?: "sm" | "lg";
  className?: string;
};

export function UserAvatar({
  name,
  size = "sm",
  className,
}: UserAvatarProps) {
  const initial = name[0]?.toUpperCase() || "U";

  return (
    <div
      className={cn(
        "rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0",
        size === "lg" ? "size-14 text-xl" : "size-8 text-xs",
        className,
      )}
    >
      {initial}
    </div>
  );
}
