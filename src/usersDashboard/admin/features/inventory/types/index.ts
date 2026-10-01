export interface ItemType {
  id: string;
  name: string;
  description: string;
}

export interface ItemTypePayload {
  name: string;
  description: string;
}
export interface ItemTypeResponse {
  id: number;
  name: string;
  description: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  typeId: string;
  typeName: string;
  quantity: number;
  unitPrice: number;
  addedAt: string;
}

export interface ItemPayload {
  name: string;
  item_type: number;
  quantity: number;
  price: number;
}
export interface ItemResponse {
  id: number;
  item_type_name: string;
  name: string;
  quantity: number;
  price: string; // backend sends this as a string
  date_added: string;
  last_modified: string;
  item_type: number;
}

export interface SaleRecord {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  amount: number;
  date: string;
}

export interface SalePayload {
  item: number;
  quantity: number;
  amount: number;
}
export interface SaleResponse {
  id: number;
  item_name: string;
  quantity: number;
  amount: string; // backend sends this as a string
  date_added: string;
  item: number;
  sold_by: number;
}
export interface InventoryReportSummary {
  total_stock: number;
  total_items_sold: number;
  revenue: number;
  low_stock_count: number;
}
export interface InventoryReportLowStockItem {
  id: number;
  name: string;
  quantity: number;
}

export interface InventoryReportChartPoint {
  week: number;
  week_start: string;
  quantity?: number;
  amount?: number;
}

export interface InventoryReportSale {
  id: number;
  item_name: string;
  quantity: number;
  amount: string; // backend sends this as a string
  date_added: string;
  item: number;
  sold_by: number;
}

export interface InventoryReportResponse {
  period: string;
  summary: InventoryReportSummary;
  low_stock_items: InventoryReportLowStockItem[];
  charts: {
    sales_quantity: InventoryReportChartPoint[];
    sales_revenue: InventoryReportChartPoint[];
  };
  sales: InventoryReportSale[];
}

export type ReportPeriod = "current_week" | "current_month" | "current_year" | "lifetime";

export interface ReportBreakdownRow {
  id: string;
  name: string;
  typeName: string;
  qtyAvailable: number;
  qtySold: number;
  revenue: number;
  isLow: boolean;
}