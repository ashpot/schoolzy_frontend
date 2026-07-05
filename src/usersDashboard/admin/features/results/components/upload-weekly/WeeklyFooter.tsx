import { CalendarDays, BookOpen, RotateCcw, Save } from "lucide-react";
import { useSaveWeeklyScores } from "../../hooks/useUploadWeekly";
import type { Student, ScoresMap } from "../../types";
import type { WeeklySetupValues } from "../../schemas/uploadWeekly";
import Button from "@/shared/ui/Button";

interface Props {
  students:     Student[];
  scores:       ScoresMap;
  selectedWeek: number;
  subjectLabel: string;
  activeSetup:  WeeklySetupValues | null;
  onReset:      () => void;
}

export default function WeeklyFooter({ students, scores, selectedWeek, subjectLabel, activeSetup, onReset }: Props) {
  const saveScores  = useSaveWeeklyScores();
  const filledCount = students.filter((s) => typeof scores[s.id] === "number").length;

  const handleSave = () => {
    if (!activeSetup) return;
    saveScores.mutate({ setup: activeSetup, week: selectedWeek, scores });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-line02 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
            <CalendarDays size={12} />Week {selectedWeek}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-xs font-medium">
            <BookOpen size={12} />{subjectLabel}
          </span>
          <span className="text-sm text-text-secondary">{filledCount}/{students.length} scored</span>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost"   leftIcon={<RotateCcw size={14} />} onClick={onReset}    disabled={saveScores.isPending}>Reset</Button>
          <Button type="button" variant="primary" leftIcon={<Save size={14} />}      isLoading={saveScores.isPending} onClick={handleSave}>Save Weekly Scores</Button>
        </div>
      </div>
    </div>
  );
}