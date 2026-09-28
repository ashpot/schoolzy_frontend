import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { useFeeTypesList } from "../hooks/useFinances";
import FeeTypeForm from "../components/fee-type/FeeTypeForm";
import FeeTypeTable from "../components/fee-type/FeeTypeTable";
import SplitLayout from "../components/shared/SplitLayout";

export default function FeeTypePage() {
  const { data, isLoading, isError, error } = useFeeTypesList();
  const feeTypes = data ?? [];

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Fee Types</h1>
        <p className="text-body-small text-text-secondary mt-1">
          Define and manage the categories used to classify school fees
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Loading fee types…</span>
        </div>
      ) : isError ? (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-danger text-sm">
          <AlertCircle size={16} />
          {error instanceof Error ? error.message : "Failed to load fee types."}
        </div>
      ) : (
        <SplitLayout
          left={<FeeTypeForm onSuccess={() => {}} />}
          right={<FeeTypeTable items={feeTypes} onDelete={() => {}} />}
        />
      )}
    </motion.div>
  );
}