import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE, axisTick, tooltipStyle } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import type { ChartPoint } from "../../types";

export default function SchoolsJoinedChart({ data }: { data: ChartPoint[] }) {
  return (
    <SectionCard title="Schools Joined Per Month" subtitle="New school registrations over time">
      <div className="h-[260px]" role="img" aria-label="Area chart of new school registrations">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 12, left: 12, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis hide domain={[0, (max: number) => Math.max(max * 1.2, 5)]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v, "New schools"]} />
            <Area type="monotone" dataKey="value" stroke={PALETTE.green} strokeWidth={2} fill="hsla(142, 71%, 40%, 0.1)" dot={{ r: 3, fill: PALETTE.green, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}