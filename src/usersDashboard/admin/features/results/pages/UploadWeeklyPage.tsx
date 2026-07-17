import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { Student, ScoresMap } from "../types";
import type { WeeklySetupValues } from "../schemas/uploadWeekly";
import { subjectOptions } from "../data/mockData";
import AssessmentSetup from "../components/upload-weekly/AssessmentSetup";
import WeekNavigator   from "../components/upload-weekly/WeekNavigator";
import WeeklyScoreCard from "../components/upload-weekly/WeeklyScoreCard";
import WeeklyFooter    from "../components/upload-weekly/WeeklyFooter";
import EmptyState      from "../components/shared/EmptyState";

const WEEKLY_MAX = 10;

export default function UploadWeeklyPage() {
  const [students,     setStudents]     = useState<Student[]>([]);
  const [scores,       setScores]       = useState<ScoresMap>({});
  const [activeSetup,  setActiveSetup]  = useState<WeeklySetupValues | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [search,       setSearch]       = useState("");

  const subjectLabel = activeSetup
    ? (subjectOptions.find((o) => o.value === activeSetup.subject)?.label ?? "")
    : "";

  const handleLoad = (setup: WeeklySetupValues, loaded: Student[]) => {
    setActiveSetup(setup);
    setStudents(loaded);
    setScores({});
  };

  const handleClear       = () => { setActiveSetup(null); setStudents([]); setScores({}); setSearch(""); };
  const handleScoreChange = (id: string, value: number | "") => setScores((p) => ({ ...p, [id]: value }));
  const handleFillAll     = () => { const f: ScoresMap = {}; students.forEach((s) => { f[s.id] = WEEKLY_MAX; }); setScores(f); };
  const handleClearScores = () => setScores({});

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6 pb-28">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Upload Weekly Assessments</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Enter continuous assessment scores for each week across all students
          </p>
        </div>
        <WeekNavigator selectedWeek={selectedWeek} onChange={setSelectedWeek} />
      </div>

      <AssessmentSetup
        isLoaded={students.length > 0}
        activeSetup={activeSetup}
        selectedWeek={selectedWeek}
        onWeekChange={setSelectedWeek}
        onLoad={handleLoad}
        onClear={handleClear}
      />

      {students.length > 0 ? (
        <WeeklyScoreCard
          students={students}
          scores={scores}
          selectedWeek={selectedWeek}
          subjectLabel={subjectLabel}
          search={search}
          onSearchChange={setSearch}
          onScoreChange={handleScoreChange}
          onFillAll={handleFillAll}
          onClearScores={handleClearScores}
        />
      ) : (
        <EmptyState
          icon={CalendarDays}
          title="Ready for score entry"
          description={<>Choose a class, group, subject and week above, then click{" "}<span className="font-semibold text-text-primary">Load Students</span> to begin</>}
        />
      )}

      {students.length > 0 && (
        <WeeklyFooter
          students={students}
          scores={scores}
          selectedWeek={selectedWeek}
          subjectLabel={subjectLabel}
          activeSetup={activeSetup}
          onReset={handleClearScores}
        />
      )}
    </motion.div>
  );
}