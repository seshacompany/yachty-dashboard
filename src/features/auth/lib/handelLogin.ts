import type { UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import type { LoginFormValues } from "../schemas/login.schema";
import { authApi } from "../services/authApi";
import { getApiErrorMessage } from "@/lib/axios";
import type { User } from "@/types/auth";
import {
  setAccessToken,
  setRefreshToken,
} from "@/lib/tokenStorage";

export const handelLogin = async (
  data: LoginFormValues,
  setError: UseFormSetError<LoginFormValues>,
  navigate: NavigateFunction,
  onLoginSuccess?: (authData: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => void
) => {
  try {
    const payload = {
      identifier: data.email.trim(),
      password: data.password,
    };

    const response = await authApi.login(payload);

    if (response?.data?.accessToken) {
      const { accessToken, refreshToken, user } = response.data;

      // 1. Role validation: Must be ADMIN or STAFF
      if (user?.adminType !== "ADMIN" && user?.adminType !== "STAFF") {
        toast.error("لا يمكنك الوصول إلى هذه المنصة");
        return;
      }

      // 2. Strict Status Check: Account must be ACTIVE
      if (user?.status !== "ACTIVE") {
        toast.error("الحساب غير نشط أو تم إيقافه، يرجى مراجعة الإدارة");
        return;
      }

      // 3. Store accessToken temporarily so subsequent API calls include Authorization header
      setAccessToken(accessToken);

      // 4. If user is STAFF, fetch staff profile and permissions from /admin/staff/me
      if (user?.adminType === "STAFF") {
        try {
          const staffMeResponse = await authApi.getStaffMe();
          if (staffMeResponse?.data) {
            user.permissions = staffMeResponse.data.permissions || [];
            user.jobTitle = staffMeResponse.data.jobTitle || null;
          }
        } catch (staffError) {
          console.error("Failed to fetch staff permissions:", staffError);
        }
      }

      // 5. Store refreshToken in 1-day Cookie
      setRefreshToken(refreshToken);

      // 6. Update auth state in Zustand store & context
      if (onLoginSuccess) {
        onLoginSuccess({ accessToken, refreshToken, user });
      }

      // 7. Show success toast notification
      toast.success(response.message || "تم تسجيل الدخول بنجاح");

      // 8. Navigate to dashboard
      navigate("/", { replace: true });
    }
  } catch (error) {
    const errorMessage = getApiErrorMessage(
      error,
      "البريد الإلكتروني أو كلمة المرور غير صحيحة"
    );

    setError("password", {
      type: "server",
      message: errorMessage,
    });

    toast.error(errorMessage);
  }
};