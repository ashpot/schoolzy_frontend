import { API_BASE_URL } from "@/shared/config/api";

export const INVENTORY_ENDPOINTS = {
  CREATE_ITEM_TYPE: `${API_BASE_URL}/inventory/item-types/`,
  LIST_ITEM_TYPES: `${API_BASE_URL}/inventory/item-types/`,
  CREATE_ITEM: `${API_BASE_URL}/inventory/items/`,
  LIST_ITEMS: `${API_BASE_URL}/inventory/items/`,
  CREATE_SALE: `${API_BASE_URL}/inventory/sales/`,
  LIST_SALES: `${API_BASE_URL}/inventory/sales/`,
  INVENTORY_REPORT: (period: string) =>
    `${API_BASE_URL}/inventory/inventory-dashboard/dashboard/?period=${period}`,
} as const;