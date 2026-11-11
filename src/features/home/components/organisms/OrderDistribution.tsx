import { ItemsOrderDistribution } from "../molecules/OrderDistribution/ItemsOrderDistribution";
import { ShapeOrderDistribution } from "../molecules/OrderDistribution/ShapeOrderDistribution";

const data = [
  { name: 'الملاك', value: 87, fill: 'var(--color-chart-1)' },
  { name: 'شركات', value: 62, fill: 'var(--color-chart-2)' },
  { name: 'مستخدمين', value: 94, fill: 'var(--color-chart-3)' },
];

export function OrderDistribution() {
  return (
    <div className="p-4 bg-card dark:bg-primary-dark transition duration-300 ease-in-out border-solid rounded-xl flex flex-col gap-2">
      <p className="w-full text-center text-xl text-sidebar/90 dark:text-white/90 transition ease-in-out">
        نوع الزائرين
      </p>
      <ShapeOrderDistribution data={data} />
      <ItemsOrderDistribution data={data} />
    </div>
  );
}
