import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { CHART, axisTick, tooltipStyle } from "../../utils/chartTheme";
import type { ChartPoint } from "../../types";

export default function SchoolGrowthChart({ data }: { data: ChartPoint[] }) {
  return (
    <SectionCard
      title="School Growth"
      subtitle="New schools registered per month"
      action={<StatusBadge label={String(new Date().getFullYear())} tone="purple" />}
    >
      <div className="h-[280px]" role="img" aria-label="Bar chart of new schools registered per month">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis
              domain={[0, (max: number) => Math.max(max, 5)]}
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              width={40}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: CHART.cursor }}
              formatter={(v) => [v, "New schools"]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={28}>
              {data.map((p) => (
                <Cell key={p.label} fill={p.highlight ? CHART.primary : CHART.primarySoft} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}