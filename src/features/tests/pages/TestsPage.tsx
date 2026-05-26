import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import TestForm from "../components/tests/TestForm";
import TestsTable from "../components/tests/TestsTable";

export default function TestsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="dashboard-p space-y-6"
    >
      <div>
        <h1 className="page-title">Tests</h1>
        <p className="text-body-small text-[var(--color-text-secondary)] mt-1">
          Create and manage timed tests for all subjects
        </p>
      </div>

      <TestForm onTestCreated={() => setRefreshKey((k) => k + 1)} />
      <TestsTable refreshKey={refreshKey} />
    </motion.div>
  );
}