import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { AttendanceSummaryData } from "../../types/attendanceSummary";

const WeeklyTrendChart: React.FC<{ data: AttendanceSummaryData }> = ({ data }) => (
  <div className="bg-white rounded-2xl card-shadow p-6 flex-1 min-w-0">
    <div className="flex items-center justify-between mb-1">
      <h3 className="section-title">Weekly Attendance Trend</h3>
      <span className="flex items-center gap-1.5 text-xs text-text-secondary">
        <span className="w-2 h-2 rounded-full bg-brand-primary" /> Attendance Rate
      </span>
    </div>
    <p className="text-body-small text-text-secondary mb-4">{data.term} · {data.className}</p>

    {data.weeklyTrend.length === 0 ? (
      <div className="h-75 flex items-center justify-center text-sm text-text-muted text-center px-6">
        No weekly data yet. Attendance taken within this term will appear here.
      </div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data.weeklyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5b7" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#0ea5b7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #eee", fontSize: 12 }}
            formatter={(value) => [`${value}%`, "Attendance Rate"] as [string, string]}
          />
          <Area
            type="monotone"
            dataKey="attendanceRate"
            stroke="#0ea5b7"
            strokeWidth={2}
            fill="url(#attendanceFill)"
            connectNulls={false}
            dot={{ r: 3, fill: "#0ea5b7" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default WeeklyTrendChart;