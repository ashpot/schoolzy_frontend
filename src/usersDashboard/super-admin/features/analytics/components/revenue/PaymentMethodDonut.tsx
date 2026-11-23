import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import { METHOD_COLORS } from "@/usersDashboard/super-admin/features/payments/utils/tones";
import type { MethodShare } from "../../types/revenue";

const colorOf = (method: string) => (METHOD_COLORS as Record<string, string>)[method] ?? PALETTE.purple;

export default function PaymentMethodDonut({ data }: { data: MethodShare[] }) {
  return (
    <SectionCard title="Revenue by Payment Method" subtitle="Share of revenue by gateway">
      <div className="flex flex-wrap items-center gap-8 py-2">
        <div className="relative h-[170px] w-[170px] shrink-0" role="img" aria-label="Donut chart of revenue by payment method">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="pct" nameKey="method" innerRadius={54} outerRadius={82} paddingAngle={2} stroke="none">
                {data.map((d) => <Cell key={d.method} fill={colorOf(d.method)} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className="flex-center pointer-events-none absolute inset-0 text-xs font-medium text-text-secondary">Total</span>
        </div>
        <ul className="min-w-[200px] flex-1 space-y-3">
          {data.map((d) => (
            <li key={d.method} className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2.5 text-text-primary">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colorOf(d.method) }} aria-hidden /> {d.method}
              </span>
              <span className="font-semibold tabular-nums text-text-primary">{d.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}