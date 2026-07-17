import { useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { mockInventoryItems, mockItemTypes } from "../data/mockData";
import type { InventoryItem } from "../types";
import { computeInventoryStats } from "../utils/inventoryUtils";
import { fadeUp } from "../animations/variants";
import StatPill from "../components/shared/StatPill";
import SplitLayout from "../components/shared/SplitLayout";
import ItemStatCards from "../components/items/ItemStatCards";
import ItemForm from "../components/items/ItemForm";
import ItemsTable from "../components/items/ItemsTable";

export default function ItemsPage() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventoryItems);
  const stats = computeInventoryStats(items);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Inventory Items</h1>
          <p className="text-body-small text-text-secondary mt-1">Manage all school inventory stock and pricing</p>
        </div>
        <StatPill icon={Package} label={`${items.length} items in stock`} />
      </div>

      <ItemStatCards {...stats} />

      <SplitLayout
        left={
          <ItemForm
            itemTypes={mockItemTypes}
            onSuccess={(item) => setItems((prev) => [item, ...prev])}
          />
        }
        right={
          <ItemsTable
            items={items}
            itemTypes={mockItemTypes}
            onDelete={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
          />
        }
      />
    </motion.div>
  );
}