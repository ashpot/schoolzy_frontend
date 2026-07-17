import ScoreEntryHeader from "./ScoreEntryHeader";
import ScoreEntryTable  from "./ScoreEntryTable";
import EmptyScoreState  from "./EmptyScoreState";
import type { ScoresMap, Student } from "../../types";
import type { UploadFilterValues } from "../../schemas/uploadAssessment";

interface Props {
  students:       Student[];
  scores:         ScoresMap;
  maxScore:       number;
  activeFilters:  UploadFilterValues | null;
  search:         string;
  onSearchChange: (v: string) => void;
  onScoreChange:  (studentId: string, value: number | "") => void;
  onFillMax:      () => void;
}

export default function ScoreEntryCard({
  students, scores, maxScore, activeFilters, search, onSearchChange, onScoreChange, onFillMax,
}: Props) {
  if (students.length === 0) return <EmptyScoreState />;

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const filledScores = students
    .map((s) => scores[s.id])
    .filter((v): v is number => typeof v === "number");

  const filledCount = filledScores.length;
  const avg = filledCount > 0 ? filledScores.reduce((a, b) => a + b, 0) / filledCount : 0;

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <ScoreEntryHeader
        totalCount={students.length}
        filteredCount={filtered.length}
        filledCount={filledCount}
        avg={avg}
        maxScore={maxScore}
        search={search}
        onSearchChange={onSearchChange}
        onFillMax={onFillMax}
      />
      <ScoreEntryTable
        students={students}
        scores={scores}
        maxScore={maxScore}
        assessmentType={activeFilters?.assessmentType ?? ""}
        search={search}
        onScoreChange={onScoreChange}
      />
    </div>
  );
}