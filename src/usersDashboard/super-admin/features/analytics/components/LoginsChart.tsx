import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE, axisTick, tooltipStyle } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import type { ChartPoint } from "../types";
import { compact } from "../utils/constants";

export default function LoginsChart({ data }: { data: ChartPoint[] }) {
  return (
    <SectionCard title="Logins Per Month" subtitle="Total login events per month">
      <div className="h-[220px]" role="img" aria-label="Bar chart of logins per month">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
            <YAxis hide domain={[0, (max: number) => Math.ceil(max * 1.15)]} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: PALETTE.blueSoft, opacity: 0.3 }} formatter={(v) => [Number(v).toLocaleString("en-US"), "Logins"]} />
            <Bar dataKey="value" fill={PALETTE.blue} radius={[6, 6, 0, 0]} maxBarSize={22}>
              <LabelList dataKey="value" position="top" formatter={(v) => compact(Number(v))} style={{ fontSize: 10, fontWeight: 600, fill: PALETTE.blue }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}