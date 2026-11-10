import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { avatarColor, getInitials } from "@/usersDashboard/admin/features/learning/shared/utils/helpers";
import type { EditableScoreRow } from "../../types/manageScore";
import { rowVariant } from "../../../onboarding/animations/variants";

interface ScoreEditRowProps {
  row: EditableScoreRow;
  number: number;
  max: number | null;
  saving: boolean;
  locked: boolean; // a save-all is running
  onChange: (id: number, value: string) => void;
  onSave: (id: number) => void;
}

export default function ScoreEditRow({ row, number, max, saving, locked, onChange, onSave }: ScoreEditRowProps) {
  const canSave = row.dirty && !row.error && !saving && !locked;

  return (
    <motion.tr variants={rowVariant} className="border-b border-border-line02 last:border-0 hover:bg-gray-50/40 transition-colors">
      <td className="px-6 py-4 text-sm text-text-muted">{number}</td>
      <td className="px-4 py-4 text-sm text-text-muted whitespace-nowrap">{row.dateUploaded}</td>
      <td className="px-4 py-4 text-sm text-text-secondary">{row.admissionNumber || "—"}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex-center text-xs font-semibold shrink-0 ${avatarColor(row.fullName)}`}>
            {getInitials(row.fullName)}
          </div>
          <span className="text-sm font-medium text-text-nav whitespace-nowrap">{row.fullName}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary whitespace-nowrap">{row.addedBy}</td>
      <td className="px-4 py-4">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={max ?? undefined}
          step={1}
          value={row.draft}
          disabled={saving || locked}
          onChange={(e) => onChange(row.id, e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onSave(row.id); }}
          onWheel={(e) => e.currentTarget.blur()} // scrolling must not change scores
          className={cn(
            "w-20 px-2 py-1.5 rounded-lg border text-sm text-center outline-none transition-all focus:ring-2 disabled:opacity-60",
            row.error
              ? "border-danger bg-red-50 focus:ring-red-200"
              : row.dirty
              ? "border-brand-primary bg-blue-50/50 focus:ring-brand-primary/20"
              : "border-border-line02 bg-bg-input focus:border-brand-primary focus:ring-brand-primary/20"
          )}
        />
        {row.error && <p className="text-[11px] text-danger mt-0.5">{row.error}</p>}
        {!row.error && !row.dirty && row.overMax && (
          <p className="text-[11px] text-amber-600 mt-0.5">Above max ({max})</p>
        )}
      </td>
      <td className="px-4 py-4">
        <span className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
          row.dirty ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-green-50 text-green-700 border-green-100"
        )}>
          {row.dirty ? "Unsaved" : "Saved"}
        </span>
      </td>
      <td className="px-4 py-4">
        <button
          type="button"
          title="Save score"
          onClick={() => onSave(row.id)}
          disabled={!canSave}
          className="w-8 h-8 rounded-lg flex-center text-white bg-success hover:bg-green-600 transition-colors disabled:opacity-30"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
        </button>
      </td>
    </motion.tr>
  );
}