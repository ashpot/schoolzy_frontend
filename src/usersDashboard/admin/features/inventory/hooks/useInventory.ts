import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ItemTypeValues, InventoryItemValues, SaleValues } from "../schemas";
import type {
  ItemType, ItemTypePayload, ItemTypeResponse,
  InventoryItem, ItemPayload, ItemResponse,
  SaleRecord, SalePayload, SaleResponse,
  InventoryReportResponse, ReportPeriod,
} from "../types";
import { apiRequest } from "@/shared/lib/apiClient";
import { INVENTORY_ENDPOINTS } from "../api";

// ── Item Types ───────────────────────────────────────────────────────────────
export const useItemTypesList = () => {
  return useQuery({
    queryKey: ["item-types", "list"],
    queryFn: async () => {
      const raw = await apiRequest<ItemTypeResponse[]>(INVENTORY_ENDPOINTS.LIST_ITEM_TYPES);
      const mapped: ItemType[] = raw.map((t) => ({
        id: String(t.id),
        name: t.name,
        description: t.description,
      }));
      return mapped;
    },
  });
};

export const useAddItemType = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: ItemTypeValues) => {
      const payload: ItemTypePayload = { name: values.name, description: values.description };
      return apiRequest<ItemTypeResponse>(INVENTORY_ENDPOINTS.CREATE_ITEM_TYPE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["item-types"] }),
  });
};

export const useDeleteItemType = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: no delete endpoint for item types in the doc yet
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["item-types"] }),
  });
};

// ── Inventory Items ──────────────────────────────────────────────────────────
export const useInventoryItemsList = () => {
  return useQuery({
    queryKey: ["inventory-items", "list"],
    queryFn: async () => {
      const raw = await apiRequest<ItemResponse[]>(INVENTORY_ENDPOINTS.LIST_ITEMS);
      const mapped: InventoryItem[] = raw.map((i) => ({
        id: String(i.id),
        name: i.name,
        typeId: String(i.item_type),
        typeName: i.item_type_name,
        quantity: i.quantity,
        unitPrice: Number(i.price),
        addedAt: i.date_added,
      }));
      return mapped;
    },
  });
};

export const useAddInventoryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: InventoryItemValues) => {
      const payload: ItemPayload = {
        name: values.name,
        item_type: Number(values.typeId),
        quantity: values.quantity,
        price: values.unitPrice,
      };
      return apiRequest<ItemResponse>(INVENTORY_ENDPOINTS.CREATE_ITEM, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory-items"] }),
  });
};

export const useDeleteInventoryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: no delete endpoint for items in the doc yet
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory-items"] }),
  });
};

// ── Sales ────────────────────────────────────────────────────────────────────
export const useSalesList = () => {
  return useQuery({
    queryKey: ["sales", "list"],
    queryFn: async () => {
      const raw = await apiRequest<SaleResponse[]>(INVENTORY_ENDPOINTS.LIST_SALES);
      const mapped: SaleRecord[] = raw.map((s) => ({
        id: String(s.id),
        itemId: String(s.item),
        itemName: s.item_name,
        quantity: s.quantity,
        amount: Number(s.amount),
        date: s.date_added,
      }));
      return mapped;
    },
  });
};

export const useAddSale = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: SaleValues) => {
      const payload: SalePayload = {
        item: Number(values.itemId),
        quantity: values.quantity,
        amount: values.amount,
      };
      return apiRequest<SaleResponse>(INVENTORY_ENDPOINTS.CREATE_SALE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sales"] });
      // Confirmed via probe: recording a sale does not deduct item stock
      // server-side, so no need to invalidate inventory-items here.
    },
  });
};

export const useDeleteSale = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: no delete endpoint for sales in the doc yet
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sales"] }),
  });
};

// ── Inventory Report ─────────────────────────────────────────────────────────
// NOTE: period=current_term is confirmed broken server-side (500 NameError)
// and is intentionally excluded — never pass it to this hook.
export const useInventoryReport = (period: ReportPeriod) => {
  return useQuery({
    queryKey: ["inventory-report", period],
    queryFn: async () => apiRequest<InventoryReportResponse>(INVENTORY_ENDPOINTS.INVENTORY_REPORT(period)),
  });
};