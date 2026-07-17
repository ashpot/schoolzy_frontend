import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockAssignedFees, mockFees } from "../data/mockData";
import AssignFeeForm from "../components/assign-fees/AssignFeeForm";
import AssignedFeesTable from "../components/assign-fees/AssignedFeesTable";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import type { AssignedFee } from "../types";

export default function AssignFeesPage() {
  const [assignedFees, setAssignedFees] = useState<AssignedFee[]>(mockAssignedFees);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Assign Fees</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Map fees to school sections so students are billed correctly each term
          </p>
        </div>
        <StatPill icon={Link} value={`${assignedFees.length} assignments`} variant="blue" />
      </div>

      <SplitLayout
        left={
          <AssignFeeForm
            fees={mockFees}
            onSuccess={(item) => setAssignedFees((prev) => [item, ...prev])}
          />
        }
        right={
          <AssignedFeesTable
            items={assignedFees}
            onDelete={(id) => setAssignedFees((prev) => prev.filter((f) => f.id !== id))}
          />
        }
      />
    </motion.div>
  );
}