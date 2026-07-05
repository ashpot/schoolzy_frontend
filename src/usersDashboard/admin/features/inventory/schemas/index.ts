import { z } from "zod";

export const itemTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});
export type ItemTypeValues = z.infer<typeof itemTypeSchema>;

export const inventoryItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  typeId: z.string().min(1, "Item type is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0, "Unit price must be 0 or more"),
});
export type InventoryItemValues = z.infer<typeof inventoryItemSchema>;

export const saleSchema = z.object({
  itemId: z.string().min(1, "Item is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  amount: z.coerce.number().min(0, "Amount must be 0 or more"),
});
export type SaleValues = z.infer<typeof saleSchema>;