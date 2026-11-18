import { CheckCircle2, Loader2, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { ForgotPasswordFormBindings } from "../../hooks/useForgotPasswordForm";
import { LoginIconField } from "../molecules/LoginIconField";

type ForgotPasswordAuthCardProps = ForgotPasswordFormBindings;

export function ForgotPasswordCard({
  register,
  handleSubmit,
  submitForgotPassword,
  errors,
  isSubmitting,
  successMessage,
}: ForgotPasswordAuthCardProps) {
  return (
    <Card className="md:w-3/4 w-full mx-auto gap-9 bg-card text-card-foreground border-border py-9 shadow-xl">
      <CardHeader className="space-y-1 px-6 pb-0 text-center sm:px-8">
        <CardTitle className="md:text-5xl text-2xl font-bold text-navy dark:text-coastal-white">
          نسيت كلمة المرور
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(submitForgotPassword)} noValidate>
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
            icon={User}
            name="email"
            label="البريد الالكتروني"
            errorMessage={errors.email?.message}
            inputProps={{
              type: "email",
              autoComplete: "username",
              placeholder: "ادخل البريد الالكتروني",
              disabled: isSubmitting,
              "aria-invalid": errors.email ? true : undefined,
              ...register("email"),
            }}
          />

          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
            className="py-8 w-full rounded-lg text-base font-bold cursor-pointer"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "إرسال"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
