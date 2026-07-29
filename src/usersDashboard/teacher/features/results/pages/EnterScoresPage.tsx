import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw } from "lucide-react";
import { fadeUp } from "../animations/variants";
import ResultSetupForm from "../components/enter-scores/ResultSetupForm";
import ScoreEntryTable from "../components/enter-scores/ScoreEntryTable";
import { useLoadStudents, useSaveScores } from "../hooks/useEnterScores";
import type { ResultSetupValues } from "../schemas";
import type { ResultStudent, ScoreEntry } from "../types";

export default function EnterScoresPage() {
  const [students, setStudents] = useState<ResultStudent[]>([]);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [setup, setSetup] = useState<ResultSetupValues | null>(null);

  const loadStudents = useLoadStudents();
  const saveScores = useSaveScores();

  const handleLoad = (values: ResultSetupValues) => {
    setSetup(values);
    loadStudents.mutate(values, {
      onSuccess: (data) => {
        setStudents(data);
        setScores(data.map((s) => ({ studentId: s.id, assignment: null, test: null, exam: null })));
      },
    });
  };

  const handleChange = (studentId: string, field: keyof Omit<ScoreEntry, "studentId">, value: number | null) => {
    setScores((prev) => prev.map((s) => (s.studentId === studentId ? { ...s, [field]: value } : s)));
  };

  const handleFillMax = () => setScores((prev) => prev.map((s) => ({ ...s, assignment: 30, test: 20, exam: 50 })));
  const handleClear = () => setScores((prev) => prev.map((s) => ({ ...s, assignment: null, test: null, exam: null })));

  const completedCount = scores.filter((s) => s.assignment !== null && s.test !== null && s.exam !== null).length;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6 pb-24">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">Enter Scores</h1>
          <p className="text-body-small text-text-secondary mt-1">Enter full student results; assignment, test and exam scores are combined into a total out of 100</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">Assignment /30</span>
          <span className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">Test /20</span>
          <span className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">Exam /50</span>
          <span className="text-xs px-3 py-1.5 rounded-full bg-bg-input text-text-secondary border border-border-line02">Total /100</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6">
        <ResultSetupForm isLoading={loadStudents.isPending} onLoad={handleLoad} />
      </div>

      {students.length > 0 && (
        <ScoreEntryTable students={students} scores={scores} onChange={handleChange} onFillMax={handleFillMax} onClear={handleClear} />
      )}

      {students.length > 0 && setup && (
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-border-line02 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-text-secondary">{completedCount}/{students.length} complete</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleClear} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border-line02 hover:border-danger hover:text-danger transition-colors">
              <RotateCcw size={15} /> Reset
            </button>
            <button
              type="button"
              disabled={saveScores.isPending}
              onClick={() => saveScores.mutate({ ...setup, scores })}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-brand-primary text-white hover:bg-brand-hover transition-colors disabled:opacity-50"
            >
              <Save size={15} /> {saveScores.isPending ? "Saving..." : "Save Results"}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}