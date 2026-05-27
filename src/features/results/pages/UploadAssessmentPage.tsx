import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import type { Student, ScoresMap } from "../types";
import type { UploadFilterValues } from "../schemas/uploadAssessment";
import { assessmentTypeOptions } from "../data/mockData";
import UploadFilters from "../components/uploadassessment/UploadFilters";
import ScoreEntryCard from "../components/uploadassessment/ScoreEntryCard";
import ScoreEntryFooter from "../components/uploadassessment/ScoreEntryFooter";


export default function UploadAssessmentPage() {
  const [students,      setStudents]      = useState<Student[]>([]);
  const [scores,        setScores]        = useState<ScoresMap>({});
  const [activeFilters, setActiveFilters] = useState<UploadFilterValues | null>(null);
  const [search,        setSearch]        = useState("");

  const maxScore = activeFilters
    ? (assessmentTypeOptions.find((o) => o.value === activeFilters.assessmentType)?.maxScore ?? 0)
    : 0;

  const handleLoad = (filters: UploadFilterValues, loaded: Student[]) => {
    setActiveFilters(filters);
    setStudents(loaded);
    setScores({});
  };

  const handleClear = () => {
    setActiveFilters(null);
    setStudents([]);
    setScores({});
    setSearch("");
  };

  const handleScoreChange = (studentId: string, value: number | "") =>
    setScores((prev) => ({ ...prev, [studentId]: value }));

  const handleFillMax = () => {
    const filled: ScoresMap = {};
    students.forEach((s) => { filled[s.id] = maxScore; });
    setScores(filled);
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6 pb-28">
      <div>
        <h1 className="page-title">Upload Results by Assessment Type</h1>
        <p className="text-body-small text-text-secondary mt-1">
          Enter and upload student scores for a specific assessment type
        </p>
      </div>

      <UploadFilters
        isLoaded={students.length > 0}
        activeFilters={activeFilters}
        maxScore={maxScore}
        onLoad={handleLoad}
        onClear={handleClear}
      />

      <ScoreEntryCard
        students={students}
        scores={scores}
        maxScore={maxScore}
        activeFilters={activeFilters}
        search={search}
        onSearchChange={setSearch}
        onScoreChange={handleScoreChange}
        onFillMax={handleFillMax}
      />

      {students.length > 0 && (
        <ScoreEntryFooter
          students={students}
          scores={scores}
          activeFilters={activeFilters}
          onReset={() => setScores({})}
        />
      )}
    </motion.div>
  );
}