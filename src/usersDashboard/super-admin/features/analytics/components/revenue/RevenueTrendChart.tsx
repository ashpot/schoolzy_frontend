import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE, axisTick, tooltipStyle } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import { formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { RevenuePoint } from "../../types/revenue";

const Legend = () => (
  <div className="flex items-center gap-4 text-xs text-text-secondary">
    <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-brand-primary" aria-hidden /> This Period</span>
    <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t-2 border-dashed border-sa-blue-line" aria-hidden /> Last Period</span>
  </div>
);

export default function RevenueTrendChart({ data }: { data: RevenuePoint[] }) {
  return (
    <SectionCard title="Revenue Trend" subtitle="Monthly recurring revenue vs. prior period (₦K)" action={<Legend />}>
      <div className="h-[260px]" role="img" aria-label="Line chart comparing revenue this period against the previous period">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 12, left: 12, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis hide domain={[0, (max: number) => Math.max(max * 1.1, 1000)]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [formatNaira(Number(v)), String(name) === "current" ? "This period" : "Last period"]} />
            <Line type="monotone" dataKey="previous" stroke={PALETTE.blueSoft} strokeWidth={2} strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="current" stroke={PALETTE.blue} strokeWidth={2} dot={{ r: 3, fill: PALETTE.blue, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}