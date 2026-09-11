import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import { mockScheduledTests } from "../data/mockData";
import ScheduledTestStats, { type ScheduledStatusFilter } from "../components/scheduled-tests/ScheduledTestStats";
import ScheduledTestForm from "../components/scheduled-tests/ScheduledTestForm";
import ScheduledTestsTable from "../components/scheduled-tests/ScheduledTestTable";
import type { ScheduledTest } from "../types";

export default function ScheduledTestsPage() {
  const [items, setItems] = useState<ScheduledTest[]>(mockScheduledTests);
  const [statusFilter, setStatusFilter] = useState<ScheduledStatusFilter>("all");

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((s) => s.id !== id));
  };

  const handleScheduled = () => {
    // TODO: Once real API is wired, refetch/append the newly scheduled test to `items`
  };

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

      <ScheduledTestStats
        scheduledTests={items}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />
      <ScheduledTestForm onScheduled={handleScheduled} />
      <ScheduledTestsTable items={items} onDelete={handleDelete} statusFilter={statusFilter} />
    </motion.div>
  );
}