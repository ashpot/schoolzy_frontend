import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockFeeTypes } from "../data/mockData";
import FeeTypeForm from "../components/fee-type/FeeTypeForm";
import FeeTypeTable from "../components/fee-type/FeeTypeTable";
import SplitLayout from "../components/shared/SplitLayout";
import Button from "@/shared/ui/Button";
import type { FeeType } from "../types";

export default function FeeTypePage() {
  const [feeTypes, setFeeTypes] = useState<FeeType[]>(mockFeeTypes);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Fee Types</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Define and manage the categories used to classify school fees
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus/>}>
          Create Fee Type
        </Button>
      </div>

      <SplitLayout
        left={
          <FeeTypeForm
            onSuccess={(newItem) => setFeeTypes((prev) => [newItem, ...prev])}
          />
        }
        right={
          <FeeTypeTable
            items={feeTypes}
            onDelete={(id) => setFeeTypes((prev) => prev.filter((f) => f.id !== id))}
          />
        }
      />
    </motion.div>
  );
}