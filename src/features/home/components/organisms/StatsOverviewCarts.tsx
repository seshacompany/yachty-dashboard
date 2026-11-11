import { Building2, Eye, TrendingUp, Users } from "lucide-react";
import { OneCartStatsOverview } from "../molecules/OneCartStatsOverview";

export function StatsOverviewCarts() {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      <OneCartStatsOverview Icon={Eye} percentage={18} title="إجمالي الزيارات" type="win" value={21978} className="text-primary bg-primary/15" />
      <OneCartStatsOverview Icon={Building2} percentage={9} title="الملاك" type="win" value={21978} className="text-success bg-success/15" />
      <OneCartStatsOverview Icon={Users} percentage={2} title="العملاء" type="lose" value={21978} className="text-chart-4 bg-chart-4/15" />
      <OneCartStatsOverview Icon={TrendingUp} percentage={7.2} title="عمليات الدفع" type="win" value={21978} className="text-cyan bg-cyan/15" />
    </div>
  );
}
