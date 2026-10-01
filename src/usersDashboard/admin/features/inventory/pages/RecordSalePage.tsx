import { motion } from "framer-motion";
import { Receipt, Loader2, AlertCircle } from "lucide-react";
import { useSalesList } from "../hooks/useInventory";
import { computeSaleStats } from "../utils/inventoryUtils";
import { fadeUp } from "../animations/variants";
import StatPill from "../components/shared/StatPill";
import SplitLayout from "../components/shared/SplitLayout";
import SaleStatCards from "../components/record-sale/SaleStatCards";
import SaleForm from "../components/record-sale/SaleForm";
import SalesTable from "../components/record-sale/SalesTable";

export default function RecordSalePage() {
  const { data, isLoading, isError, error } = useSalesList();
  const sales = data ?? [];
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
        left={<SaleForm />}
        right={
          isLoading ? (
            <div className="bg-white rounded-2xl card-shadow flex items-center justify-center gap-2 py-16 text-text-muted">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Loading sales…</span>
            </div>
          ) : isError ? (
            <div className="bg-white rounded-2xl card-shadow flex items-center gap-2 px-4 py-16 justify-center text-danger text-sm">
              <AlertCircle size={16} />
              {error instanceof Error ? error.message : "Failed to load sales."}
            </div>
          ) : (
            <SalesTable sales={sales} />
          )
        }
      />
    </motion.div>
  );
}