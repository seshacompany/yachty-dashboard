import { Loader2 } from "lucide-react";

export function AuthLoadingScreen() {
  return (
    <div
      dir="rtl"
      className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-background text-foreground"
    >
      <span className="font-display font-extrabold tracking-widest text-3xl text-navy dark:text-coastal-white select-none">
        YACHTY
      </span>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-5 animate-spin text-primary" aria-hidden />
        <span>جاري التحقق من الجلسة...</span>
      </div>
    </div>
  );
}
