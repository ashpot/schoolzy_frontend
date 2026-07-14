import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Trash2, FileText } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { useLessonNotesList, useDeleteLessonNote } from "../../hooks/useLessonNotes";
import { FILE_TYPE_STYLES } from "@/usersDashboard/admin/features/learning/shared/utils/constants";

const PAGE_SIZE = 5;

export default function LessonNotesTable() {
  const { data: notes = [], isLoading } = useLessonNotesList();
  const deleteNote = useDeleteLessonNote();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(notes.length / PAGE_SIZE));
  const pageItems = notes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center gap-2 p-6 pb-4">
        <h2 className="section-title">All Lesson Notes</h2>
        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-medium">
          {notes.length}
        </span>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-t border-border-line02 text-xs text-text-muted uppercase tracking-wide">
            <th className="text-left font-medium px-6 py-3">Title</th>
            <th className="text-left font-medium px-6 py-3">Subject</th>
            <th className="text-left font-medium px-6 py-3">Class</th>
            <th className="text-left font-medium px-6 py-3">Teacher</th>
            <th className="text-left font-medium px-6 py-3">Date Uploaded</th>
            <th className="text-left font-medium px-6 py-3">File</th>
            <th className="text-left font-medium px-6 py-3">Actions</th>
          </tr>
        </thead>
        <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
          {!isLoading &&
            pageItems.map((n) => (
              <motion.tr key={n.id} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <p className="text-body-small font-medium text-text-primary">{n.title}</p>
                  <p className="text-xs text-text-muted">{n.term} · {n.week}</p>
                </td>
                <td className="px-6 py-4 text-body-small text-text-secondary">{n.subject}</td>
                <td className="px-6 py-4 text-body-small text-text-secondary">{n.className}</td>
                <td className="px-6 py-4 text-body-small text-text-secondary">{n.teacher}</td>
                <td className="px-6 py-4 text-body-small text-text-secondary">{n.dateUploaded}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${FILE_TYPE_STYLES[n.fileType]}`}>
                    {n.fileType}
                  </span>
                  <p className="text-xs text-text-muted mt-1">{n.fileSizeMb} MB</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                    >
                      <Download size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteNote.mutate(n.id)}
                      disabled={deleteNote.isPending}
                      className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
        </motion.tbody>
      </table>

      {!isLoading && notes.length === 0 && (
        <div className="py-14 flex flex-col items-center text-center">
          <span className="w-12 h-12 rounded-full bg-blue-50 flex-center mb-3">
            <FileText size={20} className="text-brand-primary" />
          </span>
          <p className="text-body-small text-text-primary font-medium">No lesson notes yet</p>
          <p className="text-xs text-text-muted mt-1">Upload one to get started.</p>
        </div>
      )}

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing {notes.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, notes.length)} of {notes.length} notes
        </p>
        <div className="flex items-center gap-1">
          <button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-2.5 py-1.5 rounded-lg text-text-muted hover:bg-bg-input disabled:opacity-40">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} type="button" onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-xs font-medium ${p === page ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-bg-input"}`}>{p}</button>
          ))}
          <button type="button" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-2.5 py-1.5 rounded-lg text-text-muted hover:bg-bg-input disabled:opacity-40">›</button>
        </div>
      </div>
    </div>
  );
}