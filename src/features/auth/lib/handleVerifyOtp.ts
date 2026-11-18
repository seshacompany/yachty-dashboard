import type { UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import type { VerifyOtpFormValues } from "../schemas/forgotPassword.schema";
import { authApi } from "../services/authApi";
import {
  getForgotPasswordEmail,
  removeForgotPasswordEmail,
  setResetToken,
} from "./forgotPasswordCookies";

const SUCCESS_MESSAGE =
  "تم التحقق من الرمز بنجاح، جاري تحويلك لإعادة تعيين كلمة المرور...";
const FALLBACK_ERROR_MESSAGE =
  "رمز التحقق غير صحيح أو منتهي الصلاحية، يرجى المحاولة مرة أخرى.";

export const handleVerifyOtp = async (
  data: VerifyOtpFormValues,
  setError: UseFormSetError<VerifyOtpFormValues>,
  navigate: NavigateFunction,
  onSuccess: (message: string) => void,
): Promise<void> => {
  const email = getForgotPasswordEmail();
  if (!email) {
    toast.warning(
      "انتهت صلاحية الجلسة أو البريد الإلكتروني غير موجود، يرجى إعادة الطلب.",
    );
    navigate("/auth/forgot-password", { replace: true });
    return;
  }

  try {
    const response = await authApi.verifyForgotPasswordOtp({
      email,
      otp: data.otp.trim(),
    });

    const resetToken = response?.data?.reset_token;
    if (!response?.success || !resetToken) {
      throw new Error(FALLBACK_ERROR_MESSAGE);
    }

    setResetToken(resetToken);
    removeForgotPasswordEmail();
    toast.success(SUCCESS_MESSAGE);
    onSuccess(SUCCESS_MESSAGE);
  } catch (error) {
    const apiMessage = getApiErrorMessage(error, FALLBACK_ERROR_MESSAGE);
    const errorMessage = /[\u0600-\u06FF]/.test(apiMessage)
      ? apiMessage
      : FALLBACK_ERROR_MESSAGE;

    setError("otp", {
      type: "server",
      message: errorMessage,
    });
    toast.error(errorMessage);
  }
};
