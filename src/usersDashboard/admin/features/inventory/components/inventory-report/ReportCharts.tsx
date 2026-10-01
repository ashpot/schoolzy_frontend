import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";
import { BarChart2, TrendingUp } from "lucide-react";
import { formatNaira } from "../../utils/inventoryUtils";
import type { InventoryReportChartPoint } from "../../types";

function formatK(value: number) {
  if (value >= 1000) return `₦${(value / 1000).toFixed(0)}K`;
  return `₦${value}`;
}

interface Props {
  salesQuantity: InventoryReportChartPoint[];
  salesRevenue: InventoryReportChartPoint[];
}

export default function ReportCharts({ salesQuantity, salesRevenue }: Props) {
  const quantityData = salesQuantity.map((p) => ({ week: `Wk ${p.week}`, units: p.quantity ?? 0 }));
  const revenueData = salesRevenue.map((p) => ({ week: `Wk ${p.week}`, revenue: p.amount ?? 0 }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl card-shadow p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={16} className="text-brand-primary" />
          <div>
            <p className="text-sm font-semibold text-text-primary">Inventory Movement</p>
            <p className="text-xs text-text-muted">Units sold per week</p>
          </div>
        </div>
        {quantityData.length === 0 ? (
          <p className="text-xs text-text-muted text-center py-16">No sales data for this period</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={quantityData} barSize={32} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
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
        )}
      </div>

      <div className="bg-white rounded-2xl card-shadow p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-success" />
          <div>
            <p className="text-sm font-semibold text-text-primary">Revenue Trend</p>
            <p className="text-xs text-text-muted">Sales revenue per week</p>
          </div>
        </div>
        {revenueData.length === 0 ? (
          <p className="text-xs text-text-muted text-center py-16">No sales data for this period</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsla(142,71%,45%,1)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsla(142,71%,45%,1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3b0" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatK} tick={{ fontSize: 11, fill: "#9ca3b0" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #e8e8ef", fontSize: 12 }}
                formatter={(value) => [formatNaira(Number(value)), "Revenue"]}
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
        )}
      </div>
    </div>
  );
}