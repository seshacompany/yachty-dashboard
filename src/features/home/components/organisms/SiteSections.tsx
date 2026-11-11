import { OneItemSiteSections } from "../molecules/OneItemSiteSections";

export function SiteSections() {
  return (
    <div className="md:relative">
      <div className="md:absolute md:inset-0 p-4 bg-card dark:bg-primary-dark transition duration-300 ease-in-out rounded-xl flex flex-col gap-12">
        <p className="w-full text-center text-xl text-sidebar/90 dark:text-white/90 transition ease-in-out">
          استخدام أقسام الموقع
        </p>
        <div className="scrollbar-thin flex-1 md:min-h-0 md:overflow-y-auto w-full flex flex-col gap-6 ps-2">
          <OneItemSiteSections title="الصفحة الرئيسية" color="var(--color-chart-1)" rating={91} value={28450} />
          <OneItemSiteSections title="متجر المعدات الخفيفة" color="var(--color-chart-2)" rating={74} value={18320} />
          <OneItemSiteSections title="متجر المعدات الثقيلة" color="var(--color-chart-3)" rating={58} value={12650} />
          <OneItemSiteSections title="الإيجارات قصيرة المدى" color="var(--color-chart-4)" rating={82} value={22140} />
          <OneItemSiteSections title="إيجارات طويلة المدى" color="var(--color-chart-5)" rating={46} value={9870} />
        </div>
      </div>
    </div>
  );
}
