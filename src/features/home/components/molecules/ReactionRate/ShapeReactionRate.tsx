import { RechartsDevtools } from "@recharts/devtools";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ShapeReactionRateProps = {
  data: {
    name: string;
    uv: number;
  }[]
}

export function ShapeReactionRate({ data }: ShapeReactionRateProps) {
  return (
    <AreaChart
      style={{ width: "100%", maxWidth: "100%", aspectRatio: 1.618 }}
      data={data}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
          <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="name"
        tickMargin={10}
        padding={{ left: 0, right: 2 }}
      />

      <YAxis
        domain={[0, 6000]}
        ticks={[0, 1500, 3000, 4500, 6000]}
        tickMargin={40}
        width={60}
      />

      <Tooltip />

      <Area
        type="monotone"
        dataKey="uv"
        stroke="var(--color-chart-2)"
        fill="url(#colorUv)"
        strokeWidth={2}
      />

      <RechartsDevtools />
    </AreaChart>
  );
}
