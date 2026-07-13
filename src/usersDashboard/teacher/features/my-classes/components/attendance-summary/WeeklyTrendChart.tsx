import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { WeeklyTrendPoint } from "../../types";

export default function WeeklyTrendChart({ data }: { data: WeeklyTrendPoint[] }) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <h3 className="section-title">Weekly Attendance Trend</h3>
      <p className="text-xs text-text-muted mt-0.5 mb-4">First Term · 2025/2026</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-line02)" />
          <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
          <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
          <Tooltip />
          <Line type="monotone" dataKey="rate" stroke="var(--color-brand-primary)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}