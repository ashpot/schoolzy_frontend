import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, GraduationCap } from "lucide-react";
import { fadeUp, rowVariant } from "../animations/variants";
import { mockFees, mockPaidListData } from "../data/mockData";
import PaidListFilter from "../components/paid-list/PaidListFilter";
import PaidListStats from "../components/paid-list/PaidListStats";
import PaidListTable from "../components/paid-list/PaidListTable";
import StatPill from "../components/shared/StatPill";
import type { PaidListEntry } from "../types";

export default function PaidListPage() {
  const [selectedFeeId, setSelectedFeeId] = useState("");
  const [entries, setEntries]             = useState<PaidListEntry[] | null>(null);
  const [isLoading, setIsLoading]         = useState(false);

  const selectedFee = mockFees.find((f) => f.id === selectedFeeId);

  const handleLoad = () => {
    if (!selectedFeeId) return;
    setIsLoading(true);
    // TODO: Replace with actual API call e.g. api.get(`/paid-list?feeId=${selectedFeeId}`)
    setTimeout(() => {
      setEntries(mockPaidListData[selectedFeeId] ?? []);
      setIsLoading(false);
    }, 800);
  };

  const handleFeeChange = (feeId: string) => {
    setSelectedFeeId(feeId);
    setEntries(null);
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Paid List</h1>
          <p className="text-body-small text-text-secondary mt-1">
            View all students who have made a payment for a selected fee
          </p>
        </div>
        {selectedFee && (
          <StatPill icon={Receipt} value={selectedFee.name} variant="blue" />
        )}
      </div>

      {/* Filter card */}
      <PaidListFilter
        selectedFeeId={selectedFeeId}
        onFeeChange={handleFeeChange}
        onLoad={handleLoad}
        isLoading={isLoading}
      />

      {/* Stats — only shown after load */}
      <AnimatePresence>
        {entries && entries.length > 0 && (
          <motion.div variants={rowVariant} initial="hidden" animate="show" exit="hidden">
            <PaidListStats entries={entries} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table or empty state */}
      <AnimatePresence mode="wait">
        {entries === null ? (
          <motion.div
            key="empty"
            variants={rowVariant}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="bg-white rounded-2xl card-shadow py-20 flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
              <GraduationCap size={26} className="text-brand-primary" />
            </div>
            <p className="font-semibold text-text-primary">No list loaded yet</p>
            <p className="text-sm text-text-muted">
              Select a fee above and click <span className="font-semibold text-text-primary">Load Paid List</span> to see students who have made payments
            </p>
          </motion.div>
        ) : entries.length === 0 ? (
          <motion.div
            key="no-results"
            variants={rowVariant}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="bg-white rounded-2xl card-shadow py-20 flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
              <GraduationCap size={26} className="text-amber-500" />
            </div>
            <p className="font-semibold text-text-primary">No payments found</p>
            <p className="text-sm text-text-muted">No students have made a payment for this fee yet</p>
          </motion.div>
        ) : (
          <motion.div key="table" variants={rowVariant} initial="hidden" animate="show" exit="hidden">
            <PaidListTable entries={entries} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}