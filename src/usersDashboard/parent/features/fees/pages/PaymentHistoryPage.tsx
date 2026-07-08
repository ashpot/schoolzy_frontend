import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import PaymentHistoryFilterForm from "../components/payment-history/PaymentHistoryFilterForm";
import PaymentHistoryTable from "../components/payment-history/PaymentHistoryTable";
import type { PaymentHistoryRecord } from "../types";

export default function PaymentHistoryPage() {
  const [records, setRecords] = useState<PaymentHistoryRecord[]>([]);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Payment History</h1>
        <p className="text-body-small text-text-secondary mt-1">Track fee payments for your children</p>
      </div>

      <PaymentHistoryFilterForm onLoaded={setRecords} />
      <PaymentHistoryTable records={records} />
    </motion.div>
  );
}