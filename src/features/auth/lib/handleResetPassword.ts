import type { UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import type { resetPasswordFormValues } from "../schemas/forgotPassword.schema";

export const handleResetPassword = async (
  _data: resetPasswordFormValues,
  _setError: UseFormSetError<resetPasswordFormValues>,
  navigate: NavigateFunction,
) => {
  try {
    localStorage.removeItem("email");
    navigate("/auth/login");
  } catch {
    _setError("newPassword", {
      type: "server",
      message: "فشل الاتصال بالسيرفر",
    });
  }
};
