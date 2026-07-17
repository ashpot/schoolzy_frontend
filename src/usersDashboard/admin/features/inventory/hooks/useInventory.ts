import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ItemTypeValues, InventoryItemValues, SaleValues } from "../schemas";

// ── Item Types ───────────────────────────────────────────────────────────────
export const useAddItemType = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ItemTypeValues) => {
      // TODO: Replace with actual API call e.g. api.post("/inventory/item-types", payload)
      await new Promise((r) => setTimeout(r, 900));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["item-types"] }),
  });
};

export const useDeleteItemType = () => {
  const qc = useQueryClient();
  return useMutation({
// @ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call e.g. api.delete(`/inventory/item-types/${id}`)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["item-types"] }),
  });
};

// ── Inventory Items ──────────────────────────────────────────────────────────

export const useAddInventoryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: InventoryItemValues) => {
      // TODO: Replace with actual API call e.g. api.post("/inventory/items", payload)
      await new Promise((r) => setTimeout(r, 900));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory-items"] }),
  });
};

export const useDeleteInventoryItem = () => {
  const qc = useQueryClient();
  return useMutation({
// @ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call e.g. api.delete(`/inventory/items/${id}`)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory-items"] }),
  });
};

// ── Sales ────────────────────────────────────────────────────────────────────

export const useAddSale = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SaleValues) => {
      // TODO: Replace with actual API call e.g. api.post("/inventory/sales", payload)
      await new Promise((r) => setTimeout(r, 900));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sales"] }),
  });
};

export const useDeleteSale = () => {
  const qc = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call e.g. api.delete(`/inventory/sales/${id}`)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sales"] }),
  });
};