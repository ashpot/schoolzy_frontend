import { GraduationCap, BookOpen, RotateCcw, Save } from "lucide-react";
import { useSaveResults } from "../../hooks/useUploadResults";
import type { Student, ResultScoresMap } from "../../types";
import type { ResultSetupValues } from "../../schemas/uploadResults";
import Button from "@/shared/ui/Button";

interface Props {
  students:     Student[];
  scores:       ResultScoresMap;
  classLabel:   string;
  groupLabel:   string;
  subjectLabel: string;
  activeSetup:  ResultSetupValues | null;
  onReset:      () => void;
}

export default function ResultsFooter({ students, scores, classLabel, groupLabel, subjectLabel, activeSetup, onReset }: Props) {
  const saveResults = useSaveResults();
  const complete    = students.filter((s) => {
    const r = scores[s.id];
    return r && typeof r.assignment === "number" && typeof r.test === "number" && typeof r.exam === "number";
  }).length;

  const handleSave = () => {
    if (!activeSetup) return;
    saveResults.mutate({ setup: activeSetup, scores });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-line02 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
            <GraduationCap size={12} />{classLabel} {groupLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-xs font-medium">
            <BookOpen size={12} />{subjectLabel}
          </span>
          <span className="text-sm text-text-secondary">{complete}/{students.length} complete</span>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost"   leftIcon={<RotateCcw size={14} />} onClick={onReset}   disabled={saveResults.isPending}>Reset</Button>
          <Button type="button" variant="primary" leftIcon={<Save size={14} />}      isLoading={saveResults.isPending} onClick={handleSave}>Save Results</Button>
        </div>
      </div>
    </div>
  );
}