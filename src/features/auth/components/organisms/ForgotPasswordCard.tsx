import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Loader2, User } from "lucide-react";
import type { ForgotPasswordFormBindings } from "../../hooks/useForgotPasswordForm";
import { LoginIconField } from "../molecules/LoginIconField";

type ForgotPasswordAuthCardProps = ForgotPasswordFormBindings;

export function ForgotPasswordCard({
  register,
  handleSubmit,
  submitForgotPassword,
  errors,
  isSubmitting,
}: ForgotPasswordAuthCardProps) {
  return (
      <Card className="md:w-3/4 w-full mx-auto gap-9 bg-card text-card-foreground border-border py-9 shadow-xl">
        <CardHeader className="space-y-1 px-6 pb-0 text-center sm:px-8">
            <CardTitle className="md:text-5xl text-2xl font-normal text-navy dark:text-coastal-white">
              نسيت كلمة المرور
            </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(submitForgotPassword)}>
          <CardContent className="flex flex-col gap-6">
            <LoginIconField
              icon={User}
              name="email"
              label="البريد الالكتروني"
              errorMessage={errors.email?.message}
              inputProps={{
                type: "email",
                autoComplete: "username",
                placeholder: "ادخل البريد الالكتروني",
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
