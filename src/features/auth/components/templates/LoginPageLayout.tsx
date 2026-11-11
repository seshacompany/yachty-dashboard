import type { ReactNode } from "react";

type LoginPageLayoutProps = {
  children: ReactNode;
};

export function LoginPageLayout({ children }: LoginPageLayoutProps) {
  return (
    <section
      dir="rtl"
      lang="ar"
      className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground font-sans px-[max(1rem,calc((100vw-1068px)/2))] py-10 md:py-20"
    >
      <div className="flex w-full max-w-lvw flex-col items-stretch gap-12">
        {children}
      </div>
    </section>
  );
}
