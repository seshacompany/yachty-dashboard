import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { useState } from "react";

import { LoginIconField } from "@/features/auth/components/molecules/LoginIconField";
import type { LoginFormBindings } from "@/features/auth/hooks/useLoginForm";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/shared/ui/card";

type LoginAuthCardProps = LoginFormBindings;

export function LoginAuthCard({
  register,
  handleSubmit,
  submitLogin,
  errors,
  isSubmitting,
}: LoginAuthCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="md:w-3/4 w-full mx-auto gap-9 bg-card text-card-foreground border-border py-9 shadow-xl">
      <CardHeader className="space-y-1 px-6 pb-0 text-center sm:px-8">
        <CardTitle className="md:text-5xl text-2xl font-bold text-navy dark:text-coastal-white">
          تسجيل الدخول
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(submitLogin)} noValidate>
        <CardContent className="flex flex-col gap-9 px-6 pt-0 sm:px-8">
          <LoginIconField
            icon={User}
            label="البريد الالكتروني"
            name="email"
            errorMessage={errors.email?.message}
            inputProps={{
              type: "email",
              autoComplete: "username",
              placeholder: "ادخل البريد الالكتروني",
              "aria-invalid": errors.email ? true : undefined,
              ...register("email"),
            }}
          />

          <LoginIconField
            icon={Lock}
            errorMessage={errors.password?.message}
            label="كلمة المرور"
            name="password"
            link="/auth/forgot-password"
            titleLink="نسيت كلمة المرور؟"
            inputProps={{
              type: showPassword ? "text" : "password",
              autoComplete: "current-password",
              placeholder: "كلمة المرور",
              "aria-invalid": errors.password ? true : undefined,
              ...register("password"),
            }}
            trailing={
              <Button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                }
                aria-pressed={showPassword}
                className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="size-[18px]" aria-hidden />
                ) : (
                  <Eye className="size-[18px]" aria-hidden />
                )}
              </Button>
            }
          />

          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
            className="py-8 w-full rounded-lg text-base font-bold cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin size-5" />
                <span>جاري تسجيل الدخول...</span>
              </>
            ) : (
              "دخول"
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
