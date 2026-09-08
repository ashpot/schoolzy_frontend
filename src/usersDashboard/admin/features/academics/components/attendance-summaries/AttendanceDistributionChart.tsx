import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { AttendanceSummaryData } from "../../types/attendanceSummary";

interface AttendanceDistributionChartProps {
  data: AttendanceSummaryData;
}

const AttendanceDistributionChart: React.FC<AttendanceDistributionChartProps> = ({ data }) => (
  <div className="bg-white rounded-2xl card-shadow p-6 w-96 shrink-0 flex flex-col">
    <h3 className="section-title">Attendance Distribution</h3>
    <p className="text-body-small text-text-secondary mb-4">Present · Absent · Late breakdown</p>

    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data.distribution}
          dataKey="percentage"
          nameKey="label"
          innerRadius={65}
          outerRadius={95}
          paddingAngle={2}
          stroke="none"
        >
          {data.distribution.map((slice) => (
            <Cell key={slice.label} fill={slice.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>

    <div className="flex flex-col gap-2.5 mt-2">
      {data.distribution.map((slice) => (
        <div key={slice.label} className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-text-secondary">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
            {slice.label}
          </span>
          <div className="flex items-center gap-2 w-32">
            <div className="flex-1 h-1.5 rounded-full bg-bg-input overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${slice.percentage}%`, backgroundColor: slice.color }} />
            </div>
            <span className="text-text-primary font-medium w-9 text-right">{slice.percentage}%</span>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-5 pt-4 border-t border-border-line02">
      <p className="text-2xl font-bold text-brand-primary">{data.totalAttendanceRate}%</p>
      <p className="text-body-small text-text-secondary">Overall Rate</p>
    </div>
  </div>
);

export default AttendanceDistributionChart;