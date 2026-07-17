import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import { mockResults } from "../data/mockData";
import ResultsStats from "../components/results/ResultsStats";
import ResultsTable from "../components/results/ResultsTable";
import type { TestResult } from "../types";

export default function ResultsPage() {
  const [results, setResults] = useState<TestResult[]>(mockResults);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="dashboard-p space-y-6"
    >
      <div>
        <h1 className="page-title">Test Results</h1>
        <p className="text-body-small text-text-secondary mt-1">
          Review student performance and detailed question breakdowns
        </p>
      </div>

      <ResultsStats results={results} />

      <ResultsTable
        results={results}
        onDelete={(id) => setResults((prev) => prev.filter((r) => r.id !== id))}
      />
    </motion.div>
  );
}