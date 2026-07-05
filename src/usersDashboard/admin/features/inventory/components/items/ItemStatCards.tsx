import { Package, Boxes, BarChart3, AlertTriangle } from "lucide-react";
import { formatNaira } from "../../utils/inventoryUtils";

interface Props {
  totalSKUs: number;
  unitsInStock: number;
  inventoryValue: number;
  lowStockItems: number;
}

const cards = [
  {
    key: "totalSKUs" as const,
    label: "Total SKUs",
    sub: "distinct inventory items",
    icon: Package,
    iconBg: "bg-blue-50",
    iconColor: "text-brand-primary",
  },
  {
    key: "unitsInStock" as const,
    label: "Units in Stock",
    sub: "total quantity available",
    icon: Boxes,
    iconBg: "bg-green-50",
    iconColor: "text-success",
  },
  {
    key: "inventoryValue" as const,
    label: "Inventory Value",
    sub: "at current unit prices",
    icon: BarChart3,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    key: "lowStockItems" as const,
    label: "Low Stock Items",
    sub: "quantity < 5 units",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-warning",
  },
];

export default function ItemStatCards({ totalSKUs, unitsInStock, inventoryValue, lowStockItems }: Props) {
  const values = { totalSKUs, unitsInStock, inventoryValue, lowStockItems };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, sub, icon: Icon, iconBg, iconColor }) => (
        <div key={key} className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl ${iconBg} flex-center shrink-0`}>
            <Icon size={20} className={iconColor} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-muted uppercase tracking-wide font-medium">{label}</p>
            <p className="card-number mt-0.5">
              {key === "inventoryValue" ? formatNaira(values[key]) : values[key]}
            </p>
            <p className="text-xs text-text-muted mt-0.5 leading-tight">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}