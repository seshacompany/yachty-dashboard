import type { UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import type { ResetPasswordFormValues } from "../schemas/forgotPassword.schema";
import { authApi } from "../services/authApi";
import { getResetToken, removeResetToken } from "./forgotPasswordCookies";

const SUCCESS_MESSAGE =
  "تم استعادة وتغيير كلمة المرور بنجاح! جاري تحويلك لتسجيل الدخول...";
const FALLBACK_ERROR_MESSAGE =
  "حدث خطأ ما أثناء تغيير كلمة المرور، يرجى المحاولة مرة أخرى.";

export const handleResetPassword = async (
  data: ResetPasswordFormValues,
  setError: UseFormSetError<ResetPasswordFormValues>,
  navigate: NavigateFunction,
  onSuccess: (message: string) => void,
): Promise<void> => {
  const resetToken = getResetToken();
  if (!resetToken) {
    toast.error(
      "رمز إعادة تعيين كلمة المرور غير موجود أو منتهي الصلاحية، يرجى إعادة المحاولة.",
    );
    navigate("/auth/forgot-password", { replace: true });
    return;
  }

  try {
    const response = await authApi.resetPassword({
      reset_token: resetToken,
      new_password: data.newPassword,
    });

    if (!response?.success) {
      throw new Error(FALLBACK_ERROR_MESSAGE);
    }

    removeResetToken();
    toast.success(SUCCESS_MESSAGE);
    onSuccess(SUCCESS_MESSAGE);
  } catch (error) {
    const apiMessage = getApiErrorMessage(error, FALLBACK_ERROR_MESSAGE);
    const errorMessage = /[\u0600-\u06FF]/.test(apiMessage)
      ? apiMessage
      : FALLBACK_ERROR_MESSAGE;

    setError("newPassword", {
      type: "server",
      message: errorMessage,
    });
    toast.error(errorMessage);
  }
};
