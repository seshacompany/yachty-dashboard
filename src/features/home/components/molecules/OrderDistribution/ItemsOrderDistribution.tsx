import { Circle } from "lucide-react";

type ShapeItemsOrderDistribution = {
  data: {
    name: string;
    value: number;
    fill: string;
  }[]
}

export function ItemsOrderDistribution({ data }: ShapeItemsOrderDistribution) {
  return (
    <div className="flex flex-col gap-2">
      {
        data.map(({ fill, name, value }, index) => {
          return (
            <div key={index} className="flex justify-between items-center text-sidebar/80 dark:text-white/80 transition duration-300 ease-in-out">
              <div className="flex justify-between gap-2 items-center">
                <Circle fill={fill} color={fill} size={20} />
                <p>
                  {name}
                </p>
              </div>
              <p>
                {value}
              </p>
            </div>
          )
        })
      }
    </div>
  );
}
