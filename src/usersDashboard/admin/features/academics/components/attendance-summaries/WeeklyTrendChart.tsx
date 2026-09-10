import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { AttendanceSummaryData } from "../../types/attendanceSummary";

interface WeeklyTrendChartProps {
  data: AttendanceSummaryData;
}

const WeeklyTrendChart: React.FC<WeeklyTrendChartProps> = ({ data }) => (
  <div className="bg-white rounded-2xl card-shadow p-6 flex-1">
    <div className="flex items-center justify-between mb-1">
      <h3 className="section-title">Weekly Attendance Trend</h3>
      <div className="flex items-center gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-primary" /> Attendance Rate</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> Present</span>
      </div>
    </div>
    <p className="text-body-small text-text-secondary mb-4">
      {data.term} · {data.session} · {data.className}
    </p>

    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data.weeklyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5b7" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#0ea5b7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
        <YAxis
          yAxisId="left"
          domain={[50, 100]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 60]}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #eee", fontSize: 12 }}
          formatter={(value, name) => [name === "attendanceRate" ? `${value}%` : value, name === "attendanceRate" ? "Attendance Rate" : "Present"]}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="attendanceRate"
          stroke="#0ea5b7"
          strokeWidth={2}
          fill="url(#attendanceFill)"
          dot={{ r: 3, fill: "#0ea5b7" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default WeeklyTrendChart;