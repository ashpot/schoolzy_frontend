import React, { useState } from "react";
import type { ScoreRow as ScoreRowType } from "../../types/manageScores";
import AvatarInitials from "../../../users/components/shared/AvatarInitials";

interface ScoreRowProps {
  row: ScoreRowType;
  onSave: (id: string, score: number) => void;
  isSaving: boolean;
}

const ScoreRow: React.FC<ScoreRowProps> = ({ row, onSave, isSaving }) => {
  const [localScore, setLocalScore] = useState<string>(row.score !== null ? String(row.score) : "");

  const isSaved = row.status === "saved";
  const hasChanges = localScore !== "" && Number(localScore) !== row.score;

  return (
    <tr className={`border-t border-border-line02 transition-colors ${isSaved ? "bg-success/5" : ""}`}>
      <td className="px-6 py-3.5 text-text-secondary text-xs">
        <div>{row.dateUploaded.split(" ").slice(0, 3).join(" ")}</div>
        <div className="text-text-muted">{row.dateUploaded.split(" ").slice(3).join(" ")}</div>
      </td>
      <td className="px-6 py-3.5">
        <div className="text-text-primary font-medium">{row.term}</div>
        <div className="text-text-muted text-xs">{row.session}</div>
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
      <td className="px-6 py-3.5 text-text-secondary">{row.subject}</td>
      <td className="px-6 py-3.5 text-text-secondary">{row.assessmentType}</td>
      <td className="px-6 py-3.5">
        <input
          type="number"
          min={0}
          max={100}
          value={localScore}
          placeholder="0-100"
          onChange={(e) => setLocalScore(e.target.value)}
          className={`w-20 px-2.5 py-1.5 rounded-lg border text-sm text-center focus:outline-none ${
            isSaved ? "border-success text-success bg-success/5" : "border-border-line02 bg-bg-input text-text-primary"
          }`}
        />
      </td>
      <td className="px-6 py-3.5">
        <button
          type="button"
          disabled={isSaving || localScore === ""}
          onClick={() => onSave(row.id, Number(localScore))}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 ${
            isSaved && !hasChanges
              ? "border border-success text-success"
              : "bg-brand-primary text-white hover:bg-brand-hover"
          }`}
        >
          {isSaved && !hasChanges ? "Saved" : "Save"}
        </button>
      </td>
    </tr>
  );
};

export default ScoreRow;