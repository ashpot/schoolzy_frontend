export interface ItemType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
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

export interface SaleRecord {
  id: string;
  itemId: string;
  itemName: string;
  typeName: string;
  quantity: number;
  amount: number;
  date: string; // ISO date string
}