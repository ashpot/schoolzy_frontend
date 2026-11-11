import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { CHART, axisTick, tooltipStyle } from "../../utils/chartTheme";
import type { ChartPoint } from "../../types";

export default function RevenueTrendChart({ data }: { data: ChartPoint[] }) {
  return (
    <SectionCard
      title="Revenue Trend"
      subtitle="Monthly platform revenue (₦ millions)"
      action={<StatusBadge label="Last 7 months" tone="blue" />}
    >
      <div className="h-[280px]" role="img" aria-label="Line chart of monthly platform revenue over the last 7 months">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis
              domain={[7.8, 13.1]}
              ticks={[7.8, 10.5, 13.1]}
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              width={40}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₦${v}M`, "Revenue"]} />
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