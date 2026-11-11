import type { UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import type { ForgotPasswordFormValues } from "../schemas/forgotPassword.schema";

export const handleForgotPassword = async (
  _data: ForgotPasswordFormValues,
  _setError: UseFormSetError<ForgotPasswordFormValues>,
  navigate: NavigateFunction
) => {
  try {
    navigate("/auth/verify-otp");
  } catch {
    _setError("email", {
      type: "server",
      message: "فشل الاتصال بالسيرفر",
    });
  }
};
