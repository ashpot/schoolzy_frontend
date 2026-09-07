import React from "react";
import type { PromoteStudentRow as RowType } from "../../types/promoteStudents";
import AvatarInitials from "../../../users/components/shared/AvatarInitials";

interface PromoteStudentRowProps {
  row: RowType;
  isChecked: boolean;
  onToggle: (id: string) => void;
  onPromote: (id: string) => void;
  onRepeat: (id: string) => void;
  onUndo: (id: string) => void;
  isPending: boolean;
}

const STATUS_STYLES: Record<RowType["status"], string> = {
  pending: "bg-warning/10 text-warning",
  promoted: "bg-success/10 text-success",
  repeated: "bg-danger/10 text-danger",
};

const PromoteStudentRow: React.FC<PromoteStudentRowProps> = ({
  row, isChecked, onToggle, onPromote, onRepeat, onUndo, isPending,
}) => (
  <tr className={`border-t border-border-line02 ${isChecked ? "bg-blue-50/50" : ""}`}>
    <td className="px-6 py-3.5">
      <input type="checkbox" checked={isChecked} onChange={() => onToggle(row.id)}
        className="w-4 h-4 rounded border-border-line02 text-brand-primary" />
    </td>
    <td className="px-6 py-3.5">
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.fullName} />
        <div>
          <p className="font-medium text-text-primary">{row.fullName}</p>
          <p className="text-xs text-text-muted">{row.admissionNumber}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-3.5 text-text-secondary">{row.currentClass}</td>
    <td className="px-6 py-3.5 text-brand-primary font-medium">
      {row.status === "repeated" ? row.currentClass : row.nextClass !== "---" ? row.nextClass : "---"}
    </td>
    <td className="px-6 py-3.5">
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[row.status]}`}>
        {row.status}
      </span>
    </td>
    <td className="px-6 py-3.5">
      {row.status === "pending" ? (
        <div className="flex items-center gap-2">
          <button disabled={isPending} onClick={() => onPromote(row.id)}
            className="px-3.5 py-1.5 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-hover disabled:opacity-40">
            Promote
          </button>
          <button disabled={isPending} onClick={() => onRepeat(row.id)}
            className="px-3.5 py-1.5 rounded-lg border border-danger text-danger text-sm font-medium hover:bg-red-50 disabled:opacity-40">
            Repeat
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${row.status === "promoted" ? "text-success" : "text-danger"}`}>
            {row.status === "promoted" ? "Promoted" : "Repeating"}
          </span>
          <button disabled={isPending} onClick={() => onUndo(row.id)}
            className="px-3 py-1.5 rounded-lg border border-border-line02 text-text-secondary text-sm font-medium hover:bg-bg-soft disabled:opacity-40">
            Undo
          </button>
        </div>
      )}
    </td>
  </tr>
);

export default PromoteStudentRow;