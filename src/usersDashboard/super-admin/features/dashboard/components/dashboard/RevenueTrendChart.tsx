import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { CHART, axisTick, tooltipStyle } from "../../utils/chartTheme";
import { formatCompactNaira, formatNaira } from "../../utils/format";
import type { ChartPoint } from "../../types";

export default function RevenueTrendChart({ data }: { data: ChartPoint[] }) {
  return (
    <SectionCard
      title="Revenue Trend"
      subtitle="Monthly platform revenue (₦)"
      action={<StatusBadge label={String(new Date().getFullYear())} tone="blue" />}
    >
      <div className="h-[280px]" role="img" aria-label="Area chart of monthly platform revenue this year">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis
              domain={[0, (max: number) => Math.max(max, 1000)]}
              tickFormatter={(v: number) => formatCompactNaira(v)}
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              width={56}
              tickCount={4}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatNaira(Number(v)), "Revenue"]} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={CHART.primary}
              strokeWidth={2}
              fill={CHART.areaFill}
              dot={{ r: 3, fill: CHART.primary, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}