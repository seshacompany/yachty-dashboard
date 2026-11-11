import axios, {
  type AxiosInstance,
  isAxiosError,
} from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const Axios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Backwards-compatible alias for existing codebase
export const api = Axios;

export function getApiErrorMessage(
  error: unknown,
  fallback = "حدث خطأ غير متوقع"
): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
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
