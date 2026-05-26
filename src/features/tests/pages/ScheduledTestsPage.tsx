import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import { mockScheduledTests } from "../data/mockData";
import ScheduledTestStats from "../components/scheduled-tests/ScheduledTestStats";
import ScheduledTestForm from "../components/scheduled-tests/ScheduledTestForm";
import ScheduledTestsTable from "../components/scheduled-tests/ScheduledTestTable";


export default function ScheduledTestsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="dashboard-p space-y-6"
    >
      <div>
        <h1 className="page-title">Scheduled Tests</h1>
        <p className="text-body-small text-text-secondary mt-1">
          Assign tests to classes with specific dates
        </p>
      </div>

      <ScheduledTestStats scheduledTests={mockScheduledTests} />
      <ScheduledTestForm onScheduled={() => setRefreshKey((k) => k + 1)} />
      <ScheduledTestsTable refreshKey={refreshKey} />
    </motion.div>
  );
}