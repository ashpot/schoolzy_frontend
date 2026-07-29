import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { fadeUp } from "../animations/variants";
import SubjectResultFilterForm from "../components/view-subject-results/SubjectResultFilterForm";
import SubjectResultsTable from "../components/view-subject-results/SubjectResultsTable";
import { useLoadSubjectResults } from "../hooks/useViewSubjectResults";
import { subjectOptions } from "../data/mockData";
import type { SubjectResultRow2 } from "../types";

export default function ViewSubjectResultsPage() {
  const [rows, setRows] = useState<SubjectResultRow2[]>([]);
  const [subjectLabel, setSubjectLabel] = useState("");
  const loadResults = useLoadSubjectResults();

  const handleLoad = (values: { subjectId: string; classId: string; term: string; session: string }) => {
    setSubjectLabel(subjectOptions.find((s) => s.value === values.subjectId)?.label ?? "");
    loadResults.mutate(values, { onSuccess: (data) => setRows(data) });
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">View Subject Result</h1>
        <p className="text-body-small text-text-secondary mt-1">Select a subject and class to load the full result sheet for all students</p>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6">
        <h3 className="section-title mb-4 flex items-center gap-2">
          <Users size={18} className="text-brand-primary" /> Subject Result Filter
        </h3>
        <SubjectResultFilterForm isLoading={loadResults.isPending} onLoad={handleLoad} />
      </div>

      {rows.length > 0 ? (
        <SubjectResultsTable rows={rows} subjectLabel={subjectLabel} />
      ) : (
        <div className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex-center mb-4">
            <Users size={28} className="text-brand-primary" />
          </div>
          <h3 className="font-semibold text-text-primary">No class loaded yet</h3>
          <p className="text-body-small text-text-secondary mt-1">
            Select a class, group, term, and session above then click <span className="font-medium">Load Students</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}