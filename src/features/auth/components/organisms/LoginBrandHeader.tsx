import { LoginLogo } from "@/features/auth/components/atoms/LoginLogo";

export function LoginBrandHeader() {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <LoginLogo />
    </header>
  );
}
