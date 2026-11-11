import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { SIDEBAR_NAV_ITEMS } from "@/features/home/data/sidebarNav";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/shared/ui/button";

export default function DashboardPage() {
  const { pathname } = useLocation();
  const { hasPermission } = useAuth();

  const item = useMemo(() => {
    const item = SIDEBAR_NAV_ITEMS.find((i) => i.to === pathname);
    return item;
  }, [pathname]);

  const hasAccess = !item?.permission || hasPermission(item.permission);
  const Component = item?.Children;

  // if (item?.permission && !hasAccess) {
  //   return (
  //     <div
  //       dir="rtl"
  //       className="m-0 flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 text-center p-6"
  //     >
  //       <div className="size-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-2">
  //         <ShieldAlert className="size-8" />
  //       </div>
  //       <h2 className="text-2xl font-bold text-sidebar dark:text-white">
  //         غير مصرح لك بالوصول
  //       </h2>
  //       <p className="text-sm text-sidebar/70 dark:text-white/70 max-w-md">
  //         عذراً، ليس لديك الصلاحيات الكافية للوصول إلى قسم ({item.label}). يرجى مراجعة إدارة المنصة إذا كنت تعتقد أن هذا خطأ.
  //       </p>
  //       <Button asChild className="mt-4 px-6 cursor-pointer">
  //         <Link to="/">العودة إلى الصفحة الرئيسية</Link>
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className="m-0 flex min-h-0 w-full max-w-none flex-1 flex-col gap-6 py-4 px-4">
      <div className="flex flex-col gap-3">
        <p className="text-4xl md:text-5xl font-bold text-navy dark:text-coastal-white">
          {item?.title ? item?.title : item?.label}
        </p>
        <p className="text-muted-foreground">
          {item?.description}
        </p>
      </div>

      {Component && <Component />}
    </div>
  );
}
