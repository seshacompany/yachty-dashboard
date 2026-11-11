import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Loader2, User } from "lucide-react";
import type { ResetPasswordFormBindings } from "../../hooks/useResetPasswordForm";
import { LoginIconField } from "../molecules/LoginIconField";

type VerifyOtpAuthCardProps = ResetPasswordFormBindings;

export function ResetPasswordCard({
  register,
  handleSubmit,
  submitResetPassword,
  errors,
  isSubmitting,
}: VerifyOtpAuthCardProps) {
  return (
    <Card className="md:w-3/4 w-full mx-auto gap-9 bg-card text-card-foreground border-border py-9 shadow-xl">
      <CardHeader className="space-y-1 px-6 pb-0 text-center sm:px-8">
        <CardTitle className="md:text-5xl text-2xl font-normal text-navy dark:text-coastal-white">
          تعين كلمة المرور
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(submitResetPassword)}>
        <CardContent className="flex flex-col gap-6">
          <LoginIconField
            icon={User}
            name="newPassword"
            label="كلمة المرور الجديدة"
            errorMessage={errors.newPassword?.message}
            inputProps={{
              type: "password",
              autoComplete: "password",
              placeholder: "ادخل كلمةالمرور الجديدة",
              "aria-invalid": errors.newPassword ? true : undefined,
              ...register("newPassword"),
            }}
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
