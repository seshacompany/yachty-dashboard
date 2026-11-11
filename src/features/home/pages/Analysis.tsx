import { OrderDistribution } from "../components/organisms/OrderDistribution";
import { PlatformStatistics } from "../components/organisms/PlatformStatistics";
import { ReactionRate } from "../components/organisms/ReactionRate";
import { SiteSections } from "../components/organisms/SiteSections";
import { StatsOverviewCarts } from "../components/organisms/StatsOverviewCarts";

export function Analysis() {
  return (
    <div className="w-full flex flex-col gap-4">
      <StatsOverviewCarts />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <OrderDistribution />
        <SiteSections />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <ReactionRate />
        <PlatformStatistics />
      </div>
    </div>
  );
}
