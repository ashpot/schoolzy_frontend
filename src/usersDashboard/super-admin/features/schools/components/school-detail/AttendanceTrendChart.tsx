import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { DETAIL_CHART, axisTick, tooltipStyle } from "../../utils/chartColors";
import type { MonthPoint } from "../../types/detail";

export default function AttendanceTrendChart({ data }: { data: MonthPoint[] }) {
  return (
    <SectionCard title="Attendance Trend" subtitle="Monthly attendance rate (%)">
      <div className="h-[260px]" role="img" aria-label="Line chart of monthly attendance rate">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 12, left: 0, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis
              domain={[84, 98]}
              ticks={[88, 92, 96]}
              tickFormatter={(v: number) => `${v}%`}
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              width={40}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Attendance"]} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={DETAIL_CHART.green}
              strokeWidth={2}
              fill={DETAIL_CHART.greenFill}
              dot={{ r: 3, fill: DETAIL_CHART.green, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}