import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      dir="rtl"
      position="top-center"
      richColors
      closeButton
      theme="dark"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--accent)",
          "--success-text": "var(--accent-foreground)",
          "--success-border": "var(--accent)",
          "--error-bg": "var(--destructive)",
          "--error-text": "var(--destructive-foreground)",
          "--error-border": "var(--destructive)",
          fontFamily: "var(--font-family-primary)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "rounded-xl shadow-lg",
          title: "text-sm",
          description: "text-xs",
        },
      }}
      {...props}
    />
  );
}
