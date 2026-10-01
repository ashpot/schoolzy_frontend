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
  const todaySales   = sales.filter((r) => isToday(r.date));
  const todayRevenue = todaySales.reduce((s, r) => s + r.amount, 0);
  const unitsSold    = sales.reduce((s, r) => s + r.quantity, 0);
  return { totalRevenue, todayRevenue, todaySalesCount: todaySales.length, unitsSold, todayStr };
}

export function formatDisplayDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}