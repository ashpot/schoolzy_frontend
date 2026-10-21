import { RotateCcw } from "lucide-react";
import Button from "@/shared/ui/Button";
import { FOOTER_STATS } from "../../shared/utils/constants";
import type { AttendanceStatus } from "../../types";

interface AttendanceFooterProps {
  counts: Record<AttendanceStatus, number>;
  total: number;
  isSaving: boolean;
  error?: string;
  onReset: () => void;
  onSave: () => void;
}

export default function AttendanceFooter({ counts, total, isSaving, error, onReset, onSave }: AttendanceFooterProps) {
  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-border-line02 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          {FOOTER_STATS.map(({ label, key, dot, text }) => (
            <span key={label} className={`flex items-center gap-1.5 ${text}`}>
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              {counts[key]} {label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={onReset}
            disabled={isSaving}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            isLoading={isSaving}
            disabled={counts.unmarked > 0 || total === 0}
          >
            Save Attendance
          </Button>
        </div>
      </div>
      {counts.unmarked > 0 && (
        <p className="text-xs text-amber-600 text-right">
          Mark the remaining {counts.unmarked} students to enable saving
        </p>
      )}
      {error && <p className="text-xs text-danger text-right">{error}</p>}
    </div>
  );
}