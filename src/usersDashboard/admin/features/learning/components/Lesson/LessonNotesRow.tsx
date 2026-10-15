import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { LessonNote } from "../../types";
import { rowVariant } from "../../animations/variants";
import { FILE_TYPE_STYLES } from "../../shared/utils/constants";
import { avatarColor, getInitials } from "../../shared/utils/helpers";

interface LessonNotesRowProps {
  note: LessonNote;
  pending: boolean;
  onOpen: (note: LessonNote) => void;
  onApprove: (e: React.MouseEvent, id: string) => void;
  onReject: (e: React.MouseEvent, id: string) => void;
}

export default function LessonNotesRow({ note, pending, onOpen, onApprove, onReject }: LessonNotesRowProps) {
  return (
    <motion.tr
      variants={rowVariant}
      onClick={() => onOpen(note)}
      className="border-b border-border-line02 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
    >
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-text-nav max-w-50 truncate">{note.title}</p>
        <div className="mt-1"><StatusBadge status={note.status} /></div>
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary">{note.subject}</td>
      <td className="px-4 py-4 text-sm font-medium text-text-nav">{note.class}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex-center text-xs font-semibold shrink-0 ${avatarColor(note.teacher)}`}>
            {getInitials(note.teacher)}
          </div>
          <span className="text-sm text-text-secondary whitespace-nowrap">{note.teacher}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-text-muted">{note.dateUploaded}</td>
      <td className="px-4 py-4">
        {note.fileType ? (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${FILE_TYPE_STYLES[note.fileType]}`}>
            {note.fileType}
          </span>
        ) : (
          <span className="text-xs text-text-muted">No file</span>
        )}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5">
          <button type="button" title="Approve" onClick={(e) => onApprove(e, note.id)} disabled={pending}
            className="w-8 h-8 rounded-lg flex-center text-white bg-success hover:bg-green-600 transition-colors disabled:opacity-50">
            <CheckCircle2 className="w-4 h-4" />
          </button>
          <button type="button" title="Reject" onClick={(e) => onReject(e, note.id)} disabled={pending}
            className="w-8 h-8 rounded-lg flex-center text-white bg-danger hover:bg-red-600 transition-colors disabled:opacity-50">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}