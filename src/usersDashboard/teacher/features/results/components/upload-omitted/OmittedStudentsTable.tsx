import { motion } from "framer-motion";
import { Save, Upload } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { getInitials, avatarColor } from "../../utils/avatar";
import type { OmittedStudent } from "../../types";

interface Props {
  students: OmittedStudent[];
  onScoreChange: (id: string, score: number | null) => void;
  onSaveOne: (student: OmittedStudent) => void;
  onUploadAll: () => void;
  savingId: string | null;
  isUploadingAll: boolean;
}

export default function OmittedStudentsTable({ students, onScoreChange, onSaveOne, onUploadAll, savingId, isUploadingAll }: Props) {
  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <h3 className="section-title">Omitted Students</h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-danger">{students.length} omitted</span>
        </div>
        <button type="button" onClick={onUploadAll} disabled={isUploadingAll} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-brand-primary text-white hover:bg-brand-hover transition-colors disabled:opacity-50">
          <Upload size={15} /> {isUploadingAll ? "Uploading..." : "Upload All"}
        </button>
      </div>

      <div className="mx-6 mt-4 flex items-start gap-2 rounded-xl border border-warning/30 bg-yellow-50 px-4 py-3 text-body-small text-amber-800">
        These students were not included in the original upload. Please verify their scores before submitting.
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-text-muted uppercase text-left">
              <th className="px-6 py-3 font-medium">Student</th>
              <th className="px-2 py-3 font-medium">Admission No</th>
              <th className="px-2 py-3 font-medium">Reason For Omission</th>
              <th className="px-2 py-3 font-medium">Score</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {students.map((s) => (
              <motion.tr key={s.id} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`flex-center w-8 h-8 rounded-full text-xs font-semibold ${avatarColor(s.name)}`}>{getInitials(s.name)}</span>
                    <span className="font-medium text-text-primary">{s.name}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-text-secondary">{s.admissionNo}</td>
                <td className="px-2 py-3 text-text-secondary">{s.reason}</td>
                <td className="px-2 py-3">
                  <input
                    type="number"
                    value={s.score ?? ""}
                    onChange={(e) => onScoreChange(s.id, e.target.value === "" ? null : Number(e.target.value))}
                    placeholder="—"
                    className="w-20 text-center py-1.5 rounded-lg border border-border-line02 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </td>
                <td className="px-6 py-3">
                  <button
                    type="button"
                    onClick={() => onSaveOne(s)}
                    disabled={savingId === s.id || s.score === null}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-brand-primary text-brand-primary hover:bg-blue-50 transition-colors disabled:opacity-40"
                  >
                    <Save size={13} /> {savingId === s.id ? "Saving..." : "Save"}
                  </button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}