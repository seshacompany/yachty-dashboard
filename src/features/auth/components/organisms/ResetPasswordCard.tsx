import { CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { ResetPasswordFormBindings } from "../../hooks/useResetPasswordForm";
import { LoginIconField } from "../molecules/LoginIconField";

type ResetPasswordAuthCardProps = ResetPasswordFormBindings;

export function ResetPasswordCard({
  register,
  handleSubmit,
  submitResetPassword,
  errors,
  isSubmitting,
  successMessage,
}: ResetPasswordAuthCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="md:w-3/4 w-full mx-auto gap-9 bg-card text-card-foreground border-border py-9 shadow-xl">
      <CardHeader className="space-y-1 px-6 pb-0 text-center sm:px-8">
        <CardTitle className="md:text-5xl text-2xl font-bold text-navy dark:text-coastal-white">
          تعيين كلمة المرور
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(submitResetPassword)} noValidate>
        <CardContent className="flex flex-col gap-6">
          {successMessage && (
            <div
              role="status"
              className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium leading-relaxed"
            >
              <CheckCircle2 className="size-4.5 shrink-0 mt-0.5" aria-hidden />
              <span>{successMessage}</span>
            </div>
          )}

          <LoginIconField
            icon={Lock}
            name="newPassword"
            label="كلمة المرور الجديدة"
            errorMessage={errors.newPassword?.message}
            inputProps={{
              type: showPassword ? "text" : "password",
              autoComplete: "new-password",
              placeholder: "ادخل كلمة المرور الجديدة",
              disabled: isSubmitting,
              "aria-invalid": errors.newPassword ? true : undefined,
              ...register("newPassword"),
            }}
            trailing={
              <Button
                type="button"
                variant="ghost"
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
              <Loader2 className="animate-spin" />
            ) : (
              "إعادة تعيين كلمة المرور"
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
