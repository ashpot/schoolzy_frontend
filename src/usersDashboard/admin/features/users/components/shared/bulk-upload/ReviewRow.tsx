import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { ReviewColumn, ReviewRow as ReviewRowType } from  "../../../types/BulkUpload";

const STATUS_STYLES: Record<ReviewRowType["status"], string> = {
  ready: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-danger/10 text-danger",
};

interface ReviewRowProps {
  row: ReviewRowType;
  rowNumber: number;
  columns: ReviewColumn[];
}

const ReviewRow: React.FC<ReviewRowProps> = ({ row, rowNumber, columns }) => (
  <tr className="border-t border-border-line02 hover:bg-bg-soft/50">
    <td className="px-4 py-3 text-text-muted">#{rowNumber}</td>
    <td className="px-4 py-3 text-brand-primary font-medium">{row.identifier}</td>
    <td className="px-4 py-3 text-text-primary">{row.name}</td>
    {columns.map((col) => (
      <td key={col.key} className="px-4 py-3 text-text-secondary">{row.extraFields[col.key] ?? "—"}</td>
    ))}
    <td className="px-4 py-3 text-danger text-xs">{row.issue ?? "—"}</td>
    <td className="px-4 py-3">
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[row.status]}`}>
        {row.status === "warning" ? "Warning" : row.status === "error" ? "Error" : "Ready"}
      </span>
    </td>
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            // TODO: Implement inline row edit
            console.log("Edit row", row.id);
          }}
          className="p-1.5 rounded-lg text-text-muted hover:text-brand-primary hover:bg-bg-input transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          onClick={() => {
            // TODO: Implement row removal from review list
            console.log("Remove row", row.id);
          }}
          className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </td>
  </tr>
);

export default ReviewRow;