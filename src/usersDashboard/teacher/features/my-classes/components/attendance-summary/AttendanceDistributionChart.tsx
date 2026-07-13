import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { AttendanceDistribution } from "../../types";

const COLORS = ["var(--color-brand-primary)", "var(--color-danger)", "var(--color-warning)"];

export default function AttendanceDistributionChart({ data }: { data: AttendanceDistribution }) {
  const chartData = [
    { name: "Present", value: data.present },
    { name: "Absent", value: data.absent },
    { name: "Late", value: data.late },
  ];

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <h3 className="section-title">Attendance Distribution</h3>
      <p className="text-xs text-text-muted mt-0.5 mb-2">Present · Absent · Late breakdown</p>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={chartData} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={2}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex-center flex-col">
          <span className="text-xl font-bold text-brand-primary">{data.present}%</span>
          <span className="text-xs text-text-muted">Overall Rate</span>
        </div>
      </div>

      <div className="space-y-2 mt-3">
        {chartData.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between text-body-small">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
              <span className="text-text-secondary">{d.name}</span>
            </div>
            <span className="font-medium text-text-primary">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}