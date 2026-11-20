import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { PALETTE } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import type { RoleShare } from "../types";
import { compact } from "../utils/constants";

const COLORS = [PALETTE.blue, PALETTE.green, PALETTE.purple, PALETTE.amber];

export default function UsersByRoleCard({ roles }: { roles: RoleShare[] }) {
  const total = roles.reduce((sum, r) => sum + r.value, 0);

  return (
    <SectionCard title="Users by Role" subtitle="Breakdown of all registered users">
      <div className="flex flex-wrap items-center gap-8 py-2">
        <div className="relative h-[150px] w-[150px] shrink-0" role="img" aria-label="Donut chart of users by role">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={roles} dataKey="value" nameKey="label" innerRadius={48} outerRadius={72} paddingAngle={2} stroke="none">
                {roles.map((r, i) => <Cell key={r.label} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className="flex-center pointer-events-none absolute inset-0 text-sm font-semibold text-text-primary">{compact(total)}</span>
        </div>
        <ul className="min-w-[180px] flex-1 space-y-3">
          {roles.map((r, i) => (
            <li key={r.label} className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2.5 text-text-primary">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} aria-hidden /> {r.label}
              </span>
              <span className="font-semibold tabular-nums text-text-primary">{total ? Math.round((r.value / total) * 100) : 0}%</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}