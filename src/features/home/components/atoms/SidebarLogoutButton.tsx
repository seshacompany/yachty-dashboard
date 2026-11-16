import { useState } from "react";
import { AlertCircle, Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { authApi } from "@/features/auth/services/authApi";
import { clearTokens, getRefreshToken } from "@/lib/tokenStorage";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

type SidebarLogoutButtonProps = {
  className?: string;
};

type LogoutMode = "single" | "all" | null;

export function SidebarLogoutButton({ className }: SidebarLogoutButtonProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loadingMode, setLoadingMode] = useState<LogoutMode>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoading = loadingMode !== null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (isLoading) return;
    setOpen(nextOpen);
    if (!nextOpen) {
      setErrorMessage(null);
    }
  };

  const handleLogout = async (mode: "single" | "all") => {
    setErrorMessage(null);
    setLoadingMode(mode);

    try {
      if (mode === "single") {
        const refreshToken = getRefreshToken();
        await authApi.logout(refreshToken);
      } else {
        await authApi.logoutAll();
      }

      clearTokens();
      setLoadingMode(null);
      setOpen(false);
      navigate("/auth/login", { replace: true });
    } catch {
      setErrorMessage("حدث خطأ ما، يرجى المحاولة مرة أخرى");
      setLoadingMode(null);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="lg"
        className={cn(
          "h-11 w-full justify-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 text-sidebar-foreground px-3 shadow-none",
          "hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30 cursor-pointer transition-colors duration-200",
          "[&_svg]:size-4.5",
          className,
        )}
        onClick={() => {
          setErrorMessage(null);
          setOpen(true);
        }}
      >
        <LogOut aria-hidden />
        <span className="font-medium">تسجيل الخروج</span>
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          dir="rtl"
          className="max-w-md bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-xl font-sans"
        >
          <DialogHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-2.5 text-destructive">
              <LogOut className="size-5 shrink-0" aria-hidden />
              <DialogTitle className="text-xl font-bold text-navy dark:text-coastal-white">
                هل تريد تأكيد تسجيل الخروج؟
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex flex-col gap-4 pt-2">
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              اختر تسجيل الخروج من هذا الجهاز فقط أو إنهاء الجلسة من جميع الأجهزة المتصلة بحسابك.
            </DialogDescription>

            {errorMessage && (
              <div
                role="alert"
                className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium"
              >
                <AlertCircle className="size-4 shrink-0" aria-hidden />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleLogout("single")}
                disabled={isLoading}
                className="px-4 py-2.5 h-auto flex items-center justify-center gap-2 cursor-pointer"
              >
                {loadingMode === "single" && (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                )}
                <span>تسجيل الخروج</span>
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={() => handleLogout("all")}
                disabled={isLoading}
                className="px-4 py-2.5 h-auto flex items-center justify-center gap-2 cursor-pointer"
              >
                {loadingMode === "all" && (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                )}
                <span>تسجيل الخروج من جميع الأجهزة</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
