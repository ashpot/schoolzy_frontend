import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { fadeUp } from "../animations/variants";
import ResultSearchForm from "../components/view-results/ResultSearchForm";
import ResultSheetCard from "../components/view-results/ResultSheetCard";
import { useLoadStudentResult } from "../hooks/useViewResults";
import type { StudentResultSheet } from "../types";

export default function ViewResultsPage() {
  const [result, setResult] = useState<StudentResultSheet | null>(null);
  const loadResult = useLoadStudentResult();

  const handleSearch = (values: { studentId: string; term: string; session: string }) => {
    loadResult.mutate(values, { onSuccess: (data) => setResult(data) });
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Student Result Sheet</h1>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6">
        <ResultSearchForm isLoading={loadResult.isPending} onSearch={handleSearch} />
      </div>

      {result ? (
        <ResultSheetCard result={result} />
      ) : (
        <div className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex-center mb-4">
            <Search size={28} className="text-brand-primary" />
          </div>
          <h3 className="font-semibold text-text-primary">No results loaded yet</h3>
          <p className="text-body-small text-text-secondary mt-1">
            Select a student, term, and session above then click <span className="font-medium">Load Result</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}