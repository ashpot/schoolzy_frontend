// const RecordSalePage = () => {
//   return (
//     <div>
//       <h1 className="page-title">Record Sale</h1>
//       <p className="text-body mt-2">Record a sale.</p>
//     </div>
//   );
// };

// export default RecordSalePage;

import { useState } from "react";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";
import { mockSales, mockInventoryItems } from "../data/mockData";
import type { SaleRecord } from "../types";
import { computeSaleStats } from "../utils/inventoryUtils";
import { fadeUp } from "../animations/variants";
import StatPill from "../components/shared/StatPill";
import SplitLayout from "../components/shared/SplitLayout";
import SaleStatCards from "../components/record-sale/SaleStatCards";
import SaleForm from "../components/record-sale/SaleForm";
import SalesTable from "../components/record-sale/SalesTable";

export default function RecordSalePage() {
  const [sales, setSales] = useState<SaleRecord[]>(mockSales);
  const stats = computeSaleStats(sales);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Record Sale</h1>
          <p className="text-body-small text-text-secondary mt-1">Log inventory sales and track revenue</p>
        </div>
        <StatPill icon={Receipt} label={`${sales.length} sales recorded`} />
      </div>

      <SaleStatCards {...stats} />

      <SplitLayout
        left={
          <SaleForm
            items={mockInventoryItems}
            onSuccess={(sale) => setSales((prev) => [sale, ...prev])}
          />
        }
        right={
          <SalesTable
            sales={sales}
            onDelete={(id) => setSales((prev) => prev.filter((s) => s.id !== id))}
          />
        }
      />
    </motion.div>
  );
}