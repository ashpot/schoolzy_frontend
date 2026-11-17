import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { DETAIL_CHART, axisTick, tooltipStyle } from "../../utils/chartColors";
import type { MonthPoint } from "../../types/detail";

export default function ResultsUploadedChart({ data }: { data: MonthPoint[] }) {
  const last = data.length - 1;
  return (
    <SectionCard title="Results Uploaded by Month" subtitle="Monthly result upload volume">
      <div className="h-[260px]" role="img" aria-label="Bar chart of results uploaded per month">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis hide domain={[0, (max: number) => Math.ceil(max * 1.15)]} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: DETAIL_CHART.blueSoft, opacity: 0.4 }} formatter={(v) => [v, "Results"]} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={36}>
              <LabelList dataKey="value" position="top" style={{ fontSize: 11, fontWeight: 600 }} />
              {data.map((p, i) => (
                <Cell key={p.label} fill={i === last ? DETAIL_CHART.blue : DETAIL_CHART.blueSoft} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}