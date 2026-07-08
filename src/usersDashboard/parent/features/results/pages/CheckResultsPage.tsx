import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import ResultFilterForm from "../components/check-results/ResultFilterForm";
import ResultSheetCard from "../components/check-results/ResultSheetCard";
import type { ResultSheet } from "../types";

export default function CheckResultsPage() {
  const [result, setResult] = useState<ResultSheet | null>(null);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Check Result</h1>
        <p className="text-body-small text-text-secondary mt-1">View your child's academic performance</p>
      </div>

      <ResultFilterForm onLoaded={setResult} />
      {result && <ResultSheetCard result={result} />}
    </motion.div>
  );
}