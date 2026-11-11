type OneItemSiteSectionsProps = {
  title: string,
  rating: number,
  color: string,
  value: number
};

export function OneItemSiteSections({ title, color, rating, value }: OneItemSiteSectionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sidebar/90 dark:text-white/90 transition duration-300 ease-in-out">
        <p>{title}</p>
        <p>{rating}%</p>
      </div>

      <div className="w-full h-2 bg-card dark:bg-card-dark rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${rating}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <p className="text-secondary-light dark:text-white/80 transition duration-300 ease-in-out">
        {value.toLocaleString().concat(" ", "زيارة")}
      </p>
    </div>
  );
}
