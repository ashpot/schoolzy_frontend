import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, CreditCard, Banknote, Clock } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockFees, mockFeeTypes } from "../data/mockData";
import { isOverdue, formatNaira } from "../utils/feeUtils";
import FeesForm from "../components/fees/FeesForm";
import FeesTable from "../components/fees/FeesTable";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import Button from "@/shared/ui/Button";
import type { Fee, FeeType } from "../types";

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>(mockFees);
  const [feeTypes] = useState<FeeType[]>(mockFeeTypes);

  const totalAmount = useMemo(() => fees.reduce((sum, f) => sum + f.amount, 0), [fees]);
  const overdueCount = useMemo(() => fees.filter((f) => isOverdue(f.dateDue)).length, [fees]);

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
          <Button variant="primary" size="md" leftIcon={<Plus/>}>
            Create Fee
          </Button>
        </div>
      </div>

      <SplitLayout
        left={
          <FeesForm
            feeTypes={feeTypes}
            onSuccess={(newFee) => setFees((prev) => [newFee, ...prev])}
          />
        }
        right={
          <FeesTable
            items={fees}
            onDelete={(id) => setFees((prev) => prev.filter((f) => f.id !== id))}
          />
        }
      />
    </motion.div>
  );
}