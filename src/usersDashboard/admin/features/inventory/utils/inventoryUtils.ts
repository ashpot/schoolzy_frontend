import type { InventoryItem, SaleRecord } from "../types";

export const LOW_STOCK_THRESHOLD = 5;

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
}

export function computeInventoryStats(items: InventoryItem[]) {
  const totalSKUs      = items.length;
  const unitsInStock   = items.reduce((s, i) => s + i.quantity, 0);
  const inventoryValue = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const lowStockItems  = items.filter((i) => i.quantity < LOW_STOCK_THRESHOLD).length;
  return { totalSKUs, unitsInStock, inventoryValue, lowStockItems };
}

export function computeSaleStats(sales: SaleRecord[]) {
  const todayStr     = new Date().toISOString().split("T")[0];
  const totalRevenue = sales.reduce((s, r) => s + r.amount, 0);
  const todaySales   = sales.filter((r) => r.date === todayStr);
  const todayRevenue = todaySales.reduce((s, r) => s + r.amount, 0);
  const unitsSold    = sales.reduce((s, r) => s + r.quantity, 0);
  return { totalRevenue, todayRevenue, todaySalesCount: todaySales.length, unitsSold };
}

export function formatDisplayDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${String(d).padStart(2, "0")} ${months[m - 1]} ${y}`;
}

export function isToday(iso: string): boolean {
  return iso === new Date().toISOString().split("T")[0];
}