import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Receipt, CheckCircle } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockPayments } from "../data/mockData";
import { formatNaira } from "../utils/feeUtils";
import PaymentsForm from "../components/payments/PaymentsForm";
import PaymentsTable from "../components/payments/PaymentsTable";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import type { Payment } from "../types";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);

  const collected   = useMemo(() => payments.reduce((s, p) => s + p.amount, 0), [payments]);
  const outstanding = useMemo(() => payments.reduce((s, p) => s + Math.max(0, p.totalFeeAmount - p.amount), 0), [payments]);
  const fullyPaid   = useMemo(() => payments.filter((p) => p.amount >= p.totalFeeAmount).length, [payments]);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Record and manage all student fee payments
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatPill icon={TrendingUp}   value={`${formatNaira(collected)} collected`}   variant="green" />
          <StatPill icon={Receipt}      value={`${formatNaira(outstanding)} outstanding`} variant="red"   />
          <StatPill icon={CheckCircle}  value={`${fullyPaid} fully paid`}               variant="blue"  />
        </div>
      </div>

      <SplitLayout
        left={
          <PaymentsForm
            onSuccess={(payment) => setPayments((prev) => [payment, ...prev])}
          />
        }
        right={
          <PaymentsTable
            items={payments}
            onDelete={(id) => setPayments((prev) => prev.filter((p) => p.id !== id))}
          />
        }
      />
    </motion.div>
  );
}