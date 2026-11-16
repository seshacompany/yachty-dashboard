import { isAxiosError } from "axios";
import type { UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import type { LoginFormValues } from "../schemas/login.schema";
import { authApi } from "../services/authApi";
import type { User } from "@/types/auth";
import { setRefreshToken } from "@/lib/tokenStorage";
import { useAuthStore } from "../store/authStore";

export const handelLogin = async (
  data: LoginFormValues,
  setError: UseFormSetError<LoginFormValues>,
  navigate: NavigateFunction,
  onLoginSuccess?: (authData: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => void
): Promise<void> => {
  try {
    const payload = {
      email: data.email.trim(),
      password: data.password,
    };

    const response = await authApi.login(payload);
    const responseData = response?.data;
    const accessToken = responseData?.access_token;
    const refreshToken = responseData?.refresh_token;
    const user = responseData?.user;

    if (!accessToken || !user) {
      throw new Error("Invalid login response");
    }

    // 1. Save refreshToken securely in browser cookies
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }

    // 2. Store accessToken (in-memory only) and user object in Zustand store
    useAuthStore.getState().setAuth({ accessToken, user });

    if (onLoginSuccess) {
      onLoginSuccess({ accessToken, refreshToken, user });
    }

    // 3. Show success feedback
    toast.success("تم تسجيل الدخول بنجاح");

    // 4. Redirect to root route "/"
    navigate("/", { replace: true });
  } catch (error) {
    let errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة";

    if (isAxiosError(error)) {
      const status = error.response?.status;
      const serverMsg = (
        error.response?.data as { message?: string | string[] } | undefined
      )?.message;
      const normalizedServerMsg = Array.isArray(serverMsg)
        ? serverMsg[0]
        : serverMsg;

      if (status === 401 || status === 400) {
        if (normalizedServerMsg && /[\u0600-\u06FF]/.test(normalizedServerMsg)) {
          errorMessage = normalizedServerMsg;
        } else {
          errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
        }
      } else if (!error.response) {
        errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
      } else if (
        normalizedServerMsg &&
        /[\u0600-\u06FF]/.test(normalizedServerMsg)
      ) {
        errorMessage = normalizedServerMsg;
      }
    }

    setError("password", {
      type: "server",
      message: errorMessage,
    });

    toast.error(errorMessage);
  }
};
