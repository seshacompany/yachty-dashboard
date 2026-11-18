import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import type { ForgotPasswordFormValues } from "../schemas/forgotPassword.schema";
import { authApi } from "../services/authApi";
import { setForgotPasswordEmail } from "./forgotPasswordCookies";

const SUCCESS_MESSAGE =
  "إذا كان البريد الإلكتروني مسجلاً لدينا، فقد تم إرسال رمز تحقق مكوّن من 6 أرقام. يرجى التحقق من بريدك الإلكتروني.";
const FALLBACK_ERROR_MESSAGE = "حدث خطأ ما، يرجى المحاولة مرة أخرى.";

export const handleForgotPassword = async (
  data: ForgotPasswordFormValues,
  setError: UseFormSetError<ForgotPasswordFormValues>,
  onSuccess: (message: string) => void,
): Promise<void> => {
  try {
    const email = data.email.trim();
    const response = await authApi.requestForgotPasswordOtp({ email });

    if (!response?.success) {
      throw new Error(FALLBACK_ERROR_MESSAGE);
    }

    setForgotPasswordEmail(email);
    toast.success(SUCCESS_MESSAGE);
    onSuccess(SUCCESS_MESSAGE);
  } catch (error) {
    const apiMessage = getApiErrorMessage(error, FALLBACK_ERROR_MESSAGE);
    const errorMessage = /[\u0600-\u06FF]/.test(apiMessage)
      ? apiMessage
      : FALLBACK_ERROR_MESSAGE;

    setError("email", {
      type: "server",
      message: errorMessage,
    });
    toast.error(errorMessage);
  }
};
