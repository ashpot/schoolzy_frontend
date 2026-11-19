import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE, axisTick, tooltipStyle } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import type { ChartPoint } from "../../types";

export default function OverdueTrendChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(...data.map((d) => d.value), 0);

  return (
    <SectionCard title="Outstanding Invoice Trend" subtitle="Weekly overdue invoice count">
      <div className="h-[220px]" role="img" aria-label="Bar chart of weekly overdue invoices">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 12, left: 12, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis hide domain={[0, (m: number) => Math.max(m + 1, 5)]} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: PALETTE.redSoft, opacity: 0.2 }} formatter={(v) => [v, "Overdue"]} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {data.map((p) => <Cell key={p.label} fill={p.value === max && max > 0 ? PALETTE.red : PALETTE.redSoft} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}