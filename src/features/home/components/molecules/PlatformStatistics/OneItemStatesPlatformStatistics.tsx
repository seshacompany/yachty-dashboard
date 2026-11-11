type OneItemStatesPlatformStatisticsProps = {
  title: string,
  value: number,
  type: "percent" | "number"
};

export function OneItemStatesPlatformStatistics(
  { title, type, value }: OneItemStatesPlatformStatisticsProps,
) {
  return (
    <div className="bg-popover/80 dark:bg-card-dark p-4 rounded-xl flex flex-col gap-2">
      <p className="text-secondary-light dark:text-white/90 transition duration-300 ease-in-out">
        {title}
      </p>
      <p className="text-lg dark:text-white/90 transition duration-300 ease-in-out">
        {type == "percent" ? value.toString().concat("%") : value.toLocaleString()}
      </p>
    </div>
  );
}
