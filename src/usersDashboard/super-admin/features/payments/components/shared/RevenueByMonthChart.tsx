import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE, axisTick, tooltipStyle } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import { formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { ChartPoint } from "../../types";

export default function RevenueByMonthChart({ data }: { data: ChartPoint[] }) {
  return (
    <SectionCard title="Revenue by Month" subtitle="Monthly recurring revenue trend (₦K)">
      <div className="h-[220px]" role="img" aria-label="Area chart of revenue by month">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 12, left: 12, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis hide domain={[0, (max: number) => Math.max(max * 1.15, 1000)]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatNaira(Number(v)), "Revenue"]} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={PALETTE.blue}
              strokeWidth={2}
              fill={PALETTE.blueFill}
              dot={{ r: 3, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}