import { Sigma } from "lucide-react";
import type { SheetColumn } from "../../types/uploadResults";

const TONES = [
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-green-50 text-green-700 border-green-200",
];

export default function ScoreBreakdownPills({ columns }: { columns: SheetColumn[] }) {
  const total = columns.every((c) => c.weight !== null)
    ? columns.reduce((s, c) => s + (c.weight as number), 0)
    : null;
  const base = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {columns.map((c, i) => (
        <span key={c.id} className={`${base} ${TONES[i % TONES.length]}`}>
          {c.name}
          {c.max !== null ? ` /${c.max}` : ""}
          {c.weight !== null ? ` · ${c.weight}%` : ""}
        </span>
      ))}
      {total !== null && (
        <span className={`${base} bg-gray-100 text-gray-600 border-gray-200`}>
          <Sigma size={12} />Total /{total}
        </span>
      )}
    </div>
  );
}