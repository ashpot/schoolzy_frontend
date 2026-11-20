import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE, axisTick, tooltipStyle } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import { formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { PlanRevenue } from "../../types/revenue";

const COLORS: Record<string, string> = {
  basic: PALETTE.blue,
  standard: PALETTE.green,
  premium: PALETTE.purple,
  enterprise: PALETTE.amber,
};

export default function RevenueByPlanChart({ data }: { data: PlanRevenue[] }) {
  return (
    <SectionCard title="Revenue by Subscription Plan" subtitle="Total revenue generated per plan this period">
      <div className="h-[260px]" role="img" aria-label="Bar chart of revenue by subscription plan">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 12, left: 12, bottom: 0 }}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis hide domain={[0, (max: number) => Math.max(max * 1.15, 1000)]} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: PALETTE.blueSoft, opacity: 0.2 }} formatter={(v) => [formatNaira(Number(v)), "Revenue"]} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={72}>
              <LabelList dataKey="value" position="top" formatter={(v) => `${Math.round(Number(v) / 1000)}K`} style={{ fontSize: 11, fontWeight: 600 }} />
              {data.map((d) => <Cell key={d.name} fill={COLORS[d.name.toLowerCase()] ?? PALETTE.teal} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}