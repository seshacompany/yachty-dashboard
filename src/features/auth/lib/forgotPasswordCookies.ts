import Cookies from "js-cookie";

const FORGOT_PASSWORD_EMAIL_KEY = "email-forgot-password";
const RESET_TOKEN_KEY = "reset_token";
const ONE_HOUR_IN_DAYS = 1 / 24;

const getCookieOptions = () => ({
  expires: ONE_HOUR_IN_DAYS,
  path: "/",
  sameSite: "strict" as const,
  secure:
    typeof window !== "undefined" && window.location.protocol === "https:",
});

export const setForgotPasswordEmail = (email: string): void => {
  Cookies.set(FORGOT_PASSWORD_EMAIL_KEY, email, getCookieOptions());
};

export const getForgotPasswordEmail = (): string | null => {
  return Cookies.get(FORGOT_PASSWORD_EMAIL_KEY) || null;
};

export const removeForgotPasswordEmail = (): void => {
  Cookies.remove(FORGOT_PASSWORD_EMAIL_KEY, { path: "/" });
};

export const setResetToken = (token: string): void => {
  Cookies.set(RESET_TOKEN_KEY, token, getCookieOptions());
};

export const getResetToken = (): string | null => {
  return Cookies.get(RESET_TOKEN_KEY) || null;
};

export const removeResetToken = (): void => {
  Cookies.remove(RESET_TOKEN_KEY, { path: "/" });
};
