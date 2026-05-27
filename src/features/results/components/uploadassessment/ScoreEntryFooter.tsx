import { BookOpen, RotateCcw, Save } from "lucide-react";
import Button from "@/shared/ui/Button";
import type { ScoresMap, Student } from "../../types";
import type { UploadFilterValues } from "../../schemas/uploadAssessment";
import { useSaveScores } from "../../hooks/useUploadAssessment";
import { subjectOptions } from "../../data/mockData";

interface Props {
  students:      Student[];
  scores:        ScoresMap;
  activeFilters: UploadFilterValues | null;
  onReset:       () => void;
}

export default function ScoreEntryFooter({ students, scores, activeFilters, onReset }: Props) {
  const saveScores = useSaveScores();

  const filledCount  = students.filter((s) => typeof scores[s.id] === "number").length;
  const subjectLabel = activeFilters
    ? (subjectOptions.find((o) => o.value === activeFilters.subject)?.label ?? activeFilters.subject)
    : "";

  const handleSave = () => {
    if (!activeFilters) return;
    saveScores.mutate({ filters: activeFilters, scores });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-line02 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
            <BookOpen size={12} />
            {subjectLabel}
          </span>
          <span className="text-sm text-text-secondary">
            {filledCount}/{students.length} scores entered
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            leftIcon={<RotateCcw size={14} />}
            onClick={onReset}
            disabled={saveScores.isPending}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="primary"
            leftIcon={<Save size={14} />}
            isLoading={saveScores.isPending}
            onClick={handleSave}
          >
            Save Scores
          </Button>
        </div>
      </div>
    </div>
  );
}