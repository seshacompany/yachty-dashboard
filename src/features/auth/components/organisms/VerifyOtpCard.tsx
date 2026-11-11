import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Loader2, User } from "lucide-react";
import type { VerifyOtpFormBindings } from "../../hooks/useVerifyOtpForm";
import { LoginIconField } from "../molecules/LoginIconField";

type VerifyOtpAuthCardProps = VerifyOtpFormBindings;

export function VerifyOtpCard({
  register,
  handleSubmit,
  submitVerifyOtp,
  errors,
  isSubmitting,
}: VerifyOtpAuthCardProps) {
  return (
      <Card className="md:w-3/4 w-full mx-auto gap-9 bg-card text-card-foreground border-border py-9 shadow-xl">
        <CardHeader className="space-y-1 px-6 pb-0 text-center sm:px-8">
            <CardTitle className="md:text-5xl text-2xl font-normal text-navy dark:text-coastal-white">
              لنتحقق من الرمز
            </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(submitVerifyOtp)}>
          <CardContent className="flex flex-col gap-6">
            <LoginIconField
              icon={User}
              name="otp"
              label="رمز التحقق"
              errorMessage={errors.otp?.message}
              inputProps={{
                type: "number",
                autoComplete: "username",
                placeholder: "ادخل رمز التحقق",
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
