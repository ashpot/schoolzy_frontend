import { useState } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { mockItemTypes } from "../data/mockData";
import type { ItemType } from "../types";
import { fadeUp } from "../animations/variants";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import ItemTypeForm from "../components/item-types/ItemTypeForm";
import ItemTypesTable from "../components/item-types/ItemTypesTable";

export default function ItemTypesPage() {
  const [types, setTypes] = useState<ItemType[]>(mockItemTypes);

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
        left={
          <ItemTypeForm
            onSuccess={(item) => setTypes((prev) => [item, ...prev])}
          />
        }
        right={
          <ItemTypesTable
            types={types}
            onDelete={(id) => setTypes((prev) => prev.filter((t) => t.id !== id))}
          />
        }
      />
    </motion.div>
  );
}