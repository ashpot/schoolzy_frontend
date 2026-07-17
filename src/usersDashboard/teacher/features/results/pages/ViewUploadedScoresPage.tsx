import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { fadeUp } from "../animations/variants";
import UploadedScoresFilterForm from "../components/view-uploaded-scores/UploadedScoresFilterForm";
import UploadedScoresTable from "../components/view-uploaded-scores/UploadedScoresTable";
import { useLoadUploadedScores } from "../hooks/useViewUploadedScores";
import type { UploadedScoreRow } from "../types";

export default function ViewUploadedScoresPage() {
  const [rows, setRows] = useState<UploadedScoreRow[]>([]);
  const loadScores = useLoadUploadedScores();

  const handleLoad = (values: { classId: string; subjectId: string; term: string; session: string }) => {
    loadScores.mutate(values, { onSuccess: (data) => setRows(data) });
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">View Uploaded Scores</h1>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6">
        <UploadedScoresFilterForm isLoading={loadScores.isPending} onLoad={handleLoad} />
      </div>

      {rows.length > 0 ? (
        <UploadedScoresTable rows={rows} />
      ) : (
        <div className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex-center mb-4">
            <ClipboardList size={28} className="text-brand-primary" />
          </div>
          <h3 className="font-semibold text-text-primary">No scores loaded yet</h3>
          <p className="text-body-small text-text-secondary mt-1">
            Choose a class, group, subject and term above, then click <span className="font-medium">Load Scores</span> to view uploaded results
          </p>
        </div>
      )}
    </motion.div>
  );
}