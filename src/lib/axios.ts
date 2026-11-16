import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/tokenStorage";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { RefreshResponse } from "@/types/auth";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "";

export const Axios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type QueuedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  for (const promise of failedQueue) {
    if (error || !token) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  }
  failedQueue = [];
};

const redirectToLogin = () => {
  if (
    typeof window !== "undefined" &&
    !window.location.pathname.startsWith("/auth/")
  ) {
    window.location.replace("/auth/login");
  }
};

const AUTH_BYPASS_PATHS = [
  "/auth/login",
  "/auth/refresh",
  "/auth/logout",
  "/auth/logout-all",
];

Axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;
    const requestUrl = originalRequest?.url || "";

    const shouldSkipRefresh =
      !originalRequest ||
      status !== 401 ||
      originalRequest._retry ||
      AUTH_BYPASS_PATHS.some((path) => requestUrl.includes(path));

    if (shouldSkipRefresh) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return Axios(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      processQueue(error, null);
      isRefreshing = false;
      redirectToLogin();
      return Promise.reject(error);
    }

    try {
      const response = await axios.post<RefreshResponse>(
        `${BASE_URL}/auth/refresh`,
        { refresh_token: refreshToken },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const newAccessToken = response.data?.data?.access_token;
      const newRefreshToken = response.data?.data?.refresh_token;
      const returnedUser = response.data?.data?.user;

      if (!newAccessToken) {
        throw new Error("No access token returned from refresh");
      }

      setAccessToken(newAccessToken);

      if (returnedUser) {
        useAuthStore.getState().setUser(returnedUser);
      }

      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }

      processQueue(null, newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      return Axios(originalRequest);
    } catch (refreshError) {
      clearTokens();
      processQueue(refreshError, null);
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

// Backwards-compatible alias for existing codebase
export const api = Axios;

export function getApiErrorMessage(
  error: unknown,
  fallback = "حدث خطأ غير متوقع"
): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string | string[] } | undefined;
    if (Array.isArray(data?.message) && data.message.length > 0) {
      return data.message[0];
    }
    if (typeof data?.message === "string" && data.message) {
      return data.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

type ApiErrorPayload = {
  message?: string | string[];
  errors?:
    | Record<string, string | string[]>
    | string[]
    | { message?: string }[];
};

export function getApiErrorMessages(
  error: unknown,
  fallback = "حدث خطأ غير متوقع"
): string[] {
  if (!isAxiosError(error)) return [fallback];

  const data = error.response?.data as ApiErrorPayload | undefined;
  if (!data) return [fallback];

  const messages: string[] = [];

  if (Array.isArray(data.errors)) {
    for (const item of data.errors) {
      if (typeof item === "string") messages.push(item);
      else if (
        item &&
        typeof item === "object" &&
        "message" in item &&
        item.message
      )
        messages.push(item.message);
    }
  } else if (data.errors && typeof data.errors === "object") {
    for (const value of Object.values(data.errors)) {
      if (Array.isArray(value)) messages.push(...value);
      else if (typeof value === "string") messages.push(value);
    }
  }

  if (messages.length === 0) {
    if (Array.isArray(data.message)) messages.push(...data.message);
    else if (typeof data.message === "string") messages.push(data.message);
  }

  return messages.length > 0 ? messages : [fallback];
}

export default Axios;
