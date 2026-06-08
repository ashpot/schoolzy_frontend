import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { Student, ResultScoresMap } from "../types";
import type { ResultSetupValues } from "../schemas/uploadResults";
import { classOptions, classGroupOptions, subjectOptions } from "../data/mockData";
import ResultSetup         from "../components/upload-results/ResultSetup";
import ResultsScoreCard    from "../components/upload-results/ResultsScoreCard";
import ResultsFooter       from "../components/upload-results/ResultsFooter";
import ScoreBreakdownPills from "../components/upload-results/ScoreBreakdownPills";
import EmptyState          from "../components/shared/EmptyState";

const EMPTY_ROW = { assignment: "" as const, test: "" as const, exam: "" as const };

export default function UploadResultsPage() {
  const [students,    setStudents]    = useState<Student[]>([]);
  const [scores,      setScores]      = useState<ResultScoresMap>({});
  const [activeSetup, setActiveSetup] = useState<ResultSetupValues | null>(null);
  const [search,      setSearch]      = useState("");

  const classLabel   = activeSetup ? (classOptions.find((o) => o.value === activeSetup.class)?.label      ?? "") : "";
  const groupLabel   = activeSetup ? (classGroupOptions.find((o) => o.value === activeSetup.classGroup)?.label ?? "") : "";
  const subjectLabel = activeSetup ? (subjectOptions.find((o) => o.value === activeSetup.subject)?.label   ?? "") : "";

  const handleLoad  = (setup: ResultSetupValues, loaded: Student[]) => { setActiveSetup(setup); setStudents(loaded); setScores({}); };
  const handleClear = () => { setActiveSetup(null); setStudents([]); setScores({}); setSearch(""); };

  const handleScoreChange = (id: string, field: "assignment" | "test" | "exam", value: number | "") =>
    setScores((p) => ({ ...p, [id]: { ...(p[id] ?? EMPTY_ROW), [field]: value } }));

  const handleFillAll = () => {
    const f: ResultScoresMap = {};
    students.forEach((s) => { f[s.id] = { assignment: 30, test: 20, exam: 50 }; });
    setScores(f);
  };

  const handleClearScores = () => setScores({});

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6 pb-28">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Upload Results</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Enter full student results — assignment, test and exam scores are combined into a total out of 100
          </p>
        </div>
        <ScoreBreakdownPills />
      </div>

      <ResultSetup isLoaded={students.length > 0} activeSetup={activeSetup} classLabel={classLabel} groupLabel={groupLabel} subjectLabel={subjectLabel} onLoad={handleLoad} onClear={handleClear} />

      {students.length > 0 ? (
        <ResultsScoreCard students={students} scores={scores} subjectLabel={subjectLabel} search={search} onSearchChange={setSearch} onScoreChange={handleScoreChange} onFillAll={handleFillAll} onClearScores={handleClearScores} />
      ) : (
        <EmptyState icon={BookOpen} title="Ready for result entry"
          description={<>Select a class, group and subject above, then click{" "}<span className="font-semibold text-text-primary">Load Students</span> to begin entering results</>} />
      )}

      {students.length > 0 && (
        <ResultsFooter students={students} scores={scores} classLabel={classLabel} groupLabel={groupLabel} subjectLabel={subjectLabel} activeSetup={activeSetup} onReset={handleClearScores} />
      )}
    </motion.div>
  );
}