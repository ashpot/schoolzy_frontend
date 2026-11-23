import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE, axisTick, tooltipStyle } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import type { ChartPoint } from "../types";

export default function DailyActiveUsersChart({ data }: { data: ChartPoint[] }) {
  return (
    <SectionCard title="Daily Active Users" subtitle="Unique active users per month">
      <div className="h-[220px]" role="img" aria-label="Area chart of daily active users per month">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 12, left: 12, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis hide domain={["dataMin - 300", "dataMax + 200"]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [Number(v).toLocaleString("en-US"), "Active users"]} />
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