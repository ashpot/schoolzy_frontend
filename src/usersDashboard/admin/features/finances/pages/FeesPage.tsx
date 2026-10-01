import { motion } from "framer-motion";
import { CreditCard, Banknote, Clock, Loader2, AlertCircle } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { useFeesList, useFeeTypesList } from "../hooks/useFinances";
import { isOverdue, formatNaira } from "../utils/feeUtils";
import FeesForm from "../components/fees/FeesForm";
import FeesTable from "../components/fees/FeesTable";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";

export default function FeesPage() {
  const { data: feesData, isLoading: feesLoading, isError: feesError, error: feesErrObj } = useFeesList();
  const { data: feeTypesData } = useFeeTypesList();

  const fees = feesData ?? [];
  const feeTypes = feeTypesData ?? [];

  const totalAmount = fees.reduce((sum, f) => sum + f.amount, 0);
  const overdueCount = fees.filter((f) => isOverdue(f.dateDue)).length;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Fees</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Manage school fees, amounts, and due dates across all terms
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatPill icon={CreditCard} label="Total Fees"   value={fees.length}             variant="blue"  />
          <StatPill icon={Banknote}   label="Total Amount" value={formatNaira(totalAmount)} variant="green" />
          <StatPill icon={Clock}      label="Overdue"      value={overdueCount}             variant="amber" />
        </div>
      </div>

      <SplitLayout
        left={<FeesForm feeTypes={feeTypes} onSuccess={() => {}} />}
        right={
          feesLoading ? (
            <div className="bg-white rounded-2xl card-shadow flex items-center justify-center gap-2 py-16 text-text-muted">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Loading fees…</span>
            </div>
          ) : feesError ? (
            <div className="bg-white rounded-2xl card-shadow flex items-center gap-2 px-4 py-16 justify-center text-danger text-sm">
              <AlertCircle size={16} />
              {feesErrObj instanceof Error ? feesErrObj.message : "Failed to load fees."}
            </div>
          ) : (
            <FeesTable items={fees} onDelete={() => {}} />
          )
        }
      />
    </motion.div>
  );
}