import { OneItemRangePlatformStatistics } from "../molecules/PlatformStatistics/OneItemRangePlatformStatistics";
import { OneItemStatesPlatformStatistics } from "../molecules/PlatformStatistics/OneItemStatesPlatformStatistics";

export function PlatformStatistics() {
  return (
    <div className="p-4 border border-solid border-white/20 rounded-xl flex flex-col gap-10 bg-card dark:bg-primary-dark transition duration-300 ease-in-out text-sidebar">
      <p className="text-sidebar text-left dark:text-white/90 transition duration-300 ease-in-out">
        إحصائيات المنصة
      </p>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <OneItemRangePlatformStatistics title="الأجهزة المكتبية" value={31.12} />
          <OneItemRangePlatformStatistics title="الأجهزة المحمولة" value={62.88} />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <OneItemStatesPlatformStatistics title="إجمالي الجلسات" type="number" value={12543} />
          <OneItemStatesPlatformStatistics title="معدل الارتداد" type="percent" value={23.5} />
        </div>
      </div>
    </div>
  );
}
