import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { planColor } from "../../utils/tones";

export default function RevenueByPlanChart({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <SectionCard title="Revenue by Plan">
      {total === 0 ? (
        <p className="py-10 text-center text-sm text-text-muted">No revenue yet.</p>
      ) : (
        <div className="flex items-center gap-6">
          <div className="relative h-[140px] w-[140px] shrink-0" role="img" aria-label="Donut chart of revenue by plan">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={44} outerRadius={68} paddingAngle={2} stroke="none">
                  {data.map((d) => <Cell key={d.name} fill={planColor(d.name)} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="flex-center pointer-events-none absolute inset-0 text-xs font-medium text-text-secondary">Plans</span>
          </div>
          <ul className="flex-1 space-y-3">
            {data.map((d) => (
              <li key={d.name} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-text-primary">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: planColor(d.name) }} aria-hidden /> {d.name}
                </span>
                <span className="font-semibold tabular-nums text-text-primary">{Math.round((d.value / total) * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionCard>
  );
}