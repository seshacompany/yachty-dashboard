import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { VerifyOtpFormBindings } from "../../hooks/useVerifyOtpForm";
import { LoginIconField } from "../molecules/LoginIconField";

type VerifyOtpAuthCardProps = VerifyOtpFormBindings;

export function VerifyOtpCard({
  register,
  handleSubmit,
  submitVerifyOtp,
  errors,
  isSubmitting,
  successMessage,
}: VerifyOtpAuthCardProps) {
  return (
    <Card className="md:w-3/4 w-full mx-auto gap-9 bg-card text-card-foreground border-border py-9 shadow-xl">
      <CardHeader className="space-y-1 px-6 pb-0 text-center sm:px-8">
        <CardTitle className="md:text-5xl text-2xl font-bold text-navy dark:text-coastal-white">
          لنتحقق من الرمز
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(submitVerifyOtp)} noValidate>
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
            icon={KeyRound}
            name="otp"
            label="رمز التحقق (6 أرقام)"
            errorMessage={errors.otp?.message}
            inputProps={{
              type: "text",
              inputMode: "numeric",
              maxLength: 6,
              autoComplete: "one-time-code",
              placeholder: "ادخل رمز التحقق المكوّن من 6 أرقام",
              disabled: isSubmitting,
              "aria-invalid": errors.otp ? true : undefined,
              ...register("otp"),
            }}
          />

          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
            className="py-8 w-full rounded-lg text-base font-bold cursor-pointer"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "تحقق"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
