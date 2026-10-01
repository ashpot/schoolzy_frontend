import { motion } from "framer-motion";
import { Layers, Loader2, AlertCircle } from "lucide-react";
import { useItemTypesList } from "../hooks/useInventory";
import { fadeUp } from "../animations/variants";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import ItemTypeForm from "../components/item-types/ItemTypeForm";
import ItemTypesTable from "../components/item-types/ItemTypesTable";

export default function ItemTypesPage() {
  const { data, isLoading, isError, error } = useItemTypesList();
  const types = data ?? [];

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Item Types</h1>
          <p className="text-body-small text-text-secondary mt-1">Define and manage inventory item categories</p>
        </div>
        <StatPill icon={Layers} label={`${types.length} types configured`} />
      </div>

      <SplitLayout
        left={<ItemTypeForm />}
        right={
          isLoading ? (
            <div className="bg-white rounded-2xl card-shadow flex items-center justify-center gap-2 py-16 text-text-muted">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Loading item types…</span>
            </div>
          ) : isError ? (
            <div className="bg-white rounded-2xl card-shadow flex items-center gap-2 px-4 py-16 justify-center text-danger text-sm">
              <AlertCircle size={16} />
              {error instanceof Error ? error.message : "Failed to load item types."}
            </div>
          ) : (
            <ItemTypesTable types={types} />
          )
        }
      />
    </motion.div>
  );
}