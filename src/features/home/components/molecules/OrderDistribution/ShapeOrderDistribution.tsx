import { useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

type ShapeOrderDistributionProps = {
  data: {
    name: string;
    value: number;
    fill: string;
  }[]
}

export function ShapeOrderDistribution({ data }: ShapeOrderDistributionProps) {
  const [activeName, setActiveName] = useState<string | null>(null);

  return (
    <PieChart
      style={{ width: '100%', maxWidth: '100%', aspectRatio: 1 }}
    >
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        paddingAngle={4}
        onMouseEnter={(_, index) => setActiveName(data[index].name)}
        onMouseLeave={() => setActiveName(null)}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.fill} className="cursor-cell" />
        ))}
      </Pie>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-2xl font-semibold fill-sidebar dark:fill-white"
      >
        {activeName}
      </text>

      <Tooltip content={() => null} />
    </PieChart>
  );
}