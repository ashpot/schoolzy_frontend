import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { CHART, axisTick, tooltipStyle } from "../../utils/chartTheme";
import type { ChartPoint } from "../../types";

export default function SchoolGrowthChart({ data }: { data: ChartPoint[] }) {
  const last = data.length - 1;

  return (
    <SectionCard
      title="School Growth"
      subtitle="Cumulative registered schools per month"
      action={<StatusBadge label={String(new Date().getFullYear())} tone="purple" />}
    >
      <div className="h-[280px]" role="img" aria-label="Bar chart of cumulative registered schools per month">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis
              domain={[160, 250]}
              ticks={[160, 200, 240]}
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              width={40}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: CHART.cursor }}
              formatter={(v) => [v, "Schools"]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
              {data.map((_, i) => (
                <Cell key={i} fill={i === last ? CHART.primary : CHART.primarySoft} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}