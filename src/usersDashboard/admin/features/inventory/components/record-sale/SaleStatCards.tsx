import { TrendingUp, Zap, ShoppingBag } from "lucide-react";
import { formatNaira } from "../../utils/inventoryUtils";

interface Props {
  totalRevenue: number;
  todayRevenue: number;
  todaySalesCount: number;
  unitsSold: number;
}

export default function SaleStatCards({ totalRevenue, todayRevenue, todaySalesCount, unitsSold }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-green-50 flex-center shrink-0">
          <TrendingUp size={20} className="text-success" />
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Total Revenue</p>
          <p className="card-number mt-0.5">{formatNaira(totalRevenue)}</p>
          <p className="text-xs text-text-muted mt-0.5">across {todaySalesCount > 0 ? "" : "all "} transactions</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex-center shrink-0">
          <Zap size={20} className="text-brand-primary" />
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Today's Revenue</p>
          <p className="card-number mt-0.5">{formatNaira(todayRevenue)}</p>
          <p className="text-xs text-text-muted mt-0.5">{todaySalesCount} sales today</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-purple-50 flex-center shrink-0">
          <ShoppingBag size={20} className="text-purple-600" />
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Units Sold</p>
          <p className="card-number mt-0.5">{unitsSold}</p>
          <p className="text-xs text-text-muted mt-0.5">total items sold</p>
        </div>
      </div>
    </div>
  );
}