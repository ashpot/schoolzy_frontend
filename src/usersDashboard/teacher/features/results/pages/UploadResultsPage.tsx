import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw } from "lucide-react";
import { fadeUp } from "../animations/variants";
import UploadResultsFiltersForm from "../components/upload-results/UploadResultsFiltersForm";
import AssessmentScoreTable from "../components/upload-results/AssessmentScoreTable";
import { mockStudents, assessmentTypeOptions, subjectOptions } from "../data/mockData";
import { useSaveAssessmentScores } from "../hooks/useUploadResults";
import type { UploadResultsFiltersValues } from "../schemas";
import type { ResultStudent } from "../types";

export default function UploadResultsPage() {
  const [students, setStudents] = useState<ResultStudent[]>([]);
  const [scores, setScores] = useState<Record<string, number | null>>({});
  const [setup, setSetup] = useState<UploadResultsFiltersValues | null>(null);

  const saveScores = useSaveAssessmentScores();

  const selectedType = assessmentTypeOptions.find((a) => a.value === setup?.assessmentType);
  const selectedSubject = subjectOptions.find((s) => s.value === setup?.subjectId);

  const handleLoad = (values: UploadResultsFiltersValues) => {
    setSetup(values);
    setStudents(mockStudents);
    setScores(Object.fromEntries(mockStudents.map((s) => [s.id, null])));
  };

  const handleChange = (studentId: string, value: number | null) => setScores((prev) => ({ ...prev, [studentId]: value }));
  const handleFillMax = () => {
    if (!selectedType) return;
    setScores((prev) => Object.fromEntries(Object.keys(prev).map((id) => [id, selectedType.maxScore])));
  };
  const handleReset = () => setScores((prev) => Object.fromEntries(Object.keys(prev).map((id) => [id, null])));

  const filledCount = Object.values(scores).filter((v) => v !== null).length;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6 pb-24">
      <div>
        <h1 className="page-title">Upload Results by Assessment Type</h1>
        <p className="text-body-small text-text-secondary mt-1">Enter and upload student scores for a specific assessment type</p>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6">
        <UploadResultsFiltersForm isLoading={false} onLoad={handleLoad} />
      </div>

      {students.length > 0 && selectedType && (
        <AssessmentScoreTable students={students} maxScore={selectedType.maxScore} typeLabel={selectedType.label} scores={scores} onChange={handleChange} onFillMax={handleFillMax} />
      )}

      {students.length > 0 && setup && selectedSubject && (
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-border-line02 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700">{selectedSubject.label}</span>
            <span className="text-xs text-text-secondary">{filledCount}/{students.length} scores entered</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleReset} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border-line02 hover:border-danger hover:text-danger transition-colors">
              <RotateCcw size={15} /> Reset
            </button>
            <button
              type="button"
              disabled={saveScores.isPending}
              onClick={() => saveScores.mutate({ classId: setup.classId, subjectId: setup.subjectId, assessmentType: setup.assessmentType, scores: scores as Record<string, number> })}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-brand-primary text-white hover:bg-brand-hover transition-colors disabled:opacity-50"
            >
              <Save size={15} /> {saveScores.isPending ? "Saving..." : "Save Scores"}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}