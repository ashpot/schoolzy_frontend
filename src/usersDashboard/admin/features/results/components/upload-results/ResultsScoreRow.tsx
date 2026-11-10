import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { avatarColor, getInitials } from "@/usersDashboard/admin/features/learning/shared/utils/helpers";
import { rowVariant } from "../../animations/variants";
import { gradeRemarks, gradeStyles } from "../../utils/gradeUtils";
import type { SheetColumn, SheetRow } from "../../types/uploadResults";
import { cellError, summarizeRow } from "../../utils/scoreSheetMath";


interface ResultsScoreRowProps {
  index: number; // position in the visible list, used for Enter-key navigation
  row: SheetRow;
  columns: SheetColumn[];
  values: Record<string, string> | undefined;
  original: Record<string, string> | undefined;
  onChange: (studentId: number, colId: number, value: string) => void;
}

export default function ResultsScoreRow({ index, row, columns, values, original, onChange }: ResultsScoreRowProps) {
  const sum = summarizeRow(columns, values);

  const focusBelow = (e: React.KeyboardEvent<HTMLInputElement>, colId: number) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const next = document.querySelector<HTMLInputElement>(`input[data-col="${colId}"][data-row="${index + 1}"]`);
    next?.focus();
    next?.select();
  };

  return (
    <motion.tr variants={rowVariant} className="border-b border-border-line02 last:border-0 hover:bg-gray-50/40 transition-colors">
      <td className="py-3 px-4 text-sm text-text-muted">{index + 1}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex-center text-xs font-semibold shrink-0 ${avatarColor(row.name)}`}>
            {getInitials(row.name)}
          </div>
          <span className="text-sm font-medium text-text-nav">{row.name}</span>
        </div>
      </td>

      {columns.map((c) => {
        const v = values?.[String(c.id)] ?? "";
        const was = original?.[String(c.id)] ?? "";
        const err = cellError(v, c, was !== "");
        return (
          <td key={c.id} className="py-3 px-4 text-center">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={c.max ?? undefined}
              step={1}
              data-row={index}
              data-col={c.id}
              value={v}
              title={err || undefined}
              onChange={(e) => onChange(row.studentId, c.id, e.target.value)}
              onKeyDown={(e) => focusBelow(e, c.id)}
              onWheel={(e) => e.currentTarget.blur()} // scrolling must not change scores
              className={cn(
                "w-20 px-2 py-1.5 rounded-lg border text-sm text-center outline-none transition-all focus:ring-2",
                err
                  ? "border-danger bg-red-50 focus:ring-red-200"
                  : v !== was
                  ? "border-brand-primary bg-blue-50/50 focus:ring-brand-primary/20"
                  : "border-border-line02 bg-bg-input focus:border-brand-primary focus:ring-brand-primary/20"
              )}
            />
          </td>
        );
      })}

      <td className="py-3 px-4 text-center" title={sum.filled < columns.length ? "Not all scores entered yet" : undefined}>
        {sum.total !== null ? (
          <span className="text-sm font-semibold text-text-primary">
            {sum.total}<span className="font-normal text-text-muted">/{sum.max}</span>
          </span>
        ) : (
          <span className="text-text-muted">—</span>
        )}
      </td>
      <td className="py-3 px-4">
        {sum.grade ? (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${gradeStyles[sum.grade]}`}>
            {sum.grade}<span className="font-normal">{gradeRemarks[sum.grade]}</span>
          </span>
        ) : (
          <span className="text-text-muted">—</span>
        )}
      </td>
    </motion.tr>
  );
}