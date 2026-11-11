import Cookies from "js-cookie";
import type { UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import type { VerifyOtpFormValues } from "../schemas/forgotPassword.schema";

export const handleVerifyOtp = async (
  _data: VerifyOtpFormValues,
  _setError: UseFormSetError<VerifyOtpFormValues>,
  navigate: NavigateFunction,
) => {
  try {
    Cookies.set("token-otp", "mock-verified-otp-token");
    navigate("/auth/reset-password");
  } catch {
    _setError("otp", {
      type: "server",
      message: "فشل الاتصال بالسيرفر",
    });
  }
};
