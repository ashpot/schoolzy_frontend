import { Boxes, ShoppingBag, TrendingUp, AlertTriangle } from "lucide-react";
import { formatNaira } from "../../utils/inventoryUtils";

interface Props {
  itemsInStock: number;
  itemsSold: number;
  revenueFromSales: number;
  lowStockItems: number;
}

export default function ReportStatCards({ itemsInStock, itemsSold, revenueFromSales, lowStockItems }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex-center shrink-0">
          <Boxes size={20} className="text-brand-primary" />
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Items in Stock</p>
          <p className="card-number mt-0.5">{itemsInStock}</p>
          <p className="text-xs text-text-muted mt-0.5">units across all items</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-purple-50 flex-center shrink-0">
          <ShoppingBag size={20} className="text-purple-600" />
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Items Sold</p>
          <p className="card-number mt-0.5">{itemsSold}</p>
          <p className="text-xs text-text-muted mt-0.5">within this month</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-green-50 flex-center shrink-0">
          <TrendingUp size={20} className="text-success" />
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Revenue from Sales</p>
          <p className="card-number mt-0.5">{formatNaira(revenueFromSales)}</p>
          <p className="text-xs text-text-muted mt-0.5">total net sales value</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-4 border border-amber-100">
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex-center shrink-0">
          <AlertTriangle size={20} className="text-warning" />
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Low Stock Items</p>
          <p className="card-number mt-0.5">{lowStockItems}</p>
          <p className="text-xs text-text-muted mt-0.5">below 5 units</p>
        </div>
      </div>
    </div>
  );
}