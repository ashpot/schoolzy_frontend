import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";
import { BarChart2, TrendingUp } from "lucide-react";
import { weeklyMovementData, weeklyRevenueData } from "../../data/mockData";
import { formatNaira } from "../../utils/inventoryUtils";

function formatK(value: number) {
  if (value >= 1000) return `₦${(value / 1000).toFixed(0)}K`;
  return `₦${value}`;
}

export default function ReportCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Inventory Movement — Bar chart */}
      <div className="bg-white rounded-2xl card-shadow p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={16} className="text-brand-primary" />
          <div>
            <p className="text-sm font-semibold text-text-primary">Inventory Movement</p>
            <p className="text-xs text-text-muted">Units sold per period</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyMovementData} barSize={32} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3b0" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3b0" }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(59,130,246,0.06)" }}
              contentStyle={{ borderRadius: 10, border: "1px solid #e8e8ef", fontSize: 12 }}
              formatter={(value) => [`${Number(value)} units`, "Units Sold"]}
            />
            <Bar dataKey="units" fill="hsla(205,83%,45%,1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Trend — Area chart */}
      <div className="bg-white rounded-2xl card-shadow p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-success" />
          <div>
            <p className="text-sm font-semibold text-text-primary">Revenue Trend</p>
            <p className="text-xs text-text-muted">Sales revenue per period</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weeklyRevenueData} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="hsla(142,71%,45%,1)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsla(142,71%,45%,1)" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3b0" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatK} tick={{ fontSize: 11, fill: "#9ca3b0" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #e8e8ef", fontSize: 12 }}
              formatter={(value)=>[formatNaira(Number(value)),"Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsla(142,71%,45%,1)"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
              dot={{ fill: "hsla(142,71%,45%,1)", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}