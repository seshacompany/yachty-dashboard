type OneItemRangePlatformStatisticsProps = {
  title: string,
  value: number,
};

export function OneItemRangePlatformStatistics(
  { title, value }: OneItemRangePlatformStatisticsProps,
) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="md:text-xl text-lg text-sidebar/90 dark:text-white/90 transition duration-300 ease-in-out">
          {title}
        </p>
        <div className="flex items-center gap-2">
          <p className="md:text-lg text-sidebar/90 dark:text-white/90 transition duration-300 ease-in-out">
            {value.toString().concat("%")}
          </p>
        </div>
      </div>
      <div className="w-full h-3 bg-popover dark:bg-card-dark rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 bg-primary dark:bg-primary/80"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
      <p className="text-secondary-light text-sm dark:text-white/90 transition duration-300 ease-in-out">
        من الشهر الماضي
      </p>
    </div>
  );
}
