import { motion } from "framer-motion";
import { Package, Loader2, AlertCircle } from "lucide-react";
import { useInventoryItemsList, useItemTypesList } from "../hooks/useInventory";
import { computeInventoryStats } from "../utils/inventoryUtils";
import { fadeUp } from "../animations/variants";
import StatPill from "../components/shared/StatPill";
import SplitLayout from "../components/shared/SplitLayout";
import ItemStatCards from "../components/items/ItemStatCards";
import ItemForm from "../components/items/ItemForm";
import ItemsTable from "../components/items/ItemsTable";

export default function ItemsPage() {
  const { data: itemsData, isLoading: itemsLoading, isError: itemsError, error: itemsErrObj } = useInventoryItemsList();
  const { data: itemTypesData } = useItemTypesList();

  const items = itemsData ?? [];
  const itemTypes = itemTypesData ?? [];
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
        left={<ItemForm />}
        right={
          itemsLoading ? (
            <div className="bg-white rounded-2xl card-shadow flex items-center justify-center gap-2 py-16 text-text-muted">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Loading inventory…</span>
            </div>
          ) : itemsError ? (
            <div className="bg-white rounded-2xl card-shadow flex items-center gap-2 px-4 py-16 justify-center text-danger text-sm">
              <AlertCircle size={16} />
              {itemsErrObj instanceof Error ? itemsErrObj.message : "Failed to load inventory items."}
            </div>
          ) : (
            <ItemsTable items={items} itemTypes={itemTypes} />
          )
        }
      />
    </motion.div>
  );
}