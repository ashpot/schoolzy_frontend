import { BookOpen, GraduationCap, RotateCcw, Save } from "lucide-react";
import Button from "@/shared/ui/Button";
import type { SaveSummary, Scoresheet } from "../../types/uploadResults";

interface ResultsFooterProps {
  sheet: Scoresheet;
  changedCount: number;
  problemCount: number;
  isSaving: boolean;
  saveError?: string;
  saved: SaveSummary | null;
  onReset: () => void;
  onSave: () => void;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export default function ResultsFooter({
  sheet, changedCount, problemCount, isSaving, saveError, saved, onReset, onSave,
}: ResultsFooterProps) {
  const status = saveError ? (
    <span className="text-danger">{saveError}</span>
  ) : problemCount > 0 ? (
    <span className="text-danger">Fix {plural(problemCount, "invalid score")} to save</span>
  ) : changedCount > 0 ? (
    <span>{plural(changedCount, "unsaved change")}</span>
  ) : saved ? (
    <span className="text-green-600">Saved · {saved.created} added, {saved.updated} updated</span>
  ) : (
    <span>No changes</span>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-line02 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
            <GraduationCap size={12} />{sheet.classGroup}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-xs font-medium">
            <BookOpen size={12} />{sheet.subject}
          </span>
          <span className="text-sm text-text-secondary">{status}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" leftIcon={<RotateCcw size={14} />}
            onClick={onReset} disabled={isSaving || changedCount === 0}>
            Reset changes
          </Button>
          <Button type="button" variant="primary" leftIcon={<Save size={14} />}
            isLoading={isSaving} disabled={changedCount === 0 || problemCount > 0} onClick={onSave}>
            Save Results
          </Button>
        </div>
      </div>
    </div>
  );
}