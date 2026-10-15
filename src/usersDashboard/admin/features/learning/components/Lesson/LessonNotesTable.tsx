import { motion } from "framer-motion";
import { AlertCircle, BookOpen, Loader2 } from "lucide-react";
import LessonNotesRow from "./LessonNotesRow";
import LessonNotesPagination from "./LessonNotesPagination";
import type { LessonNote } from "../../types";
import { staggerContainer } from "../../animations/variants";

const COLUMNS = ["Title", "Subject", "Class", "Teacher", "Date Uploaded", "File", "Actions"];

interface LessonNotesTableProps {
  notes: LessonNote[]; // current page slice
  total: number; // filtered total
  page: number;
  isLoading: boolean;
  error: Error | null;
  actionPending: boolean;
  onPageChange: (page: number) => void;
  onOpen: (note: LessonNote) => void;
  onApprove: (e: React.MouseEvent, id: string) => void;
  onReject: (e: React.MouseEvent, id: string) => void;
}

function Notice({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex-center mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-text-nav mb-1">{title}</h3>
      <p className="text-sm text-text-muted">{text}</p>
    </div>
  );
}

export default function LessonNotesTable(props: LessonNotesTableProps) {
  const { notes, total, page, isLoading, error, actionPending, onPageChange, onOpen, onApprove, onReject } = props;
  const iconCls = "w-7 h-7 text-brand-primary";

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-border-line02 flex items-center gap-2">
        <h2 className="section-title">All Lesson Notes</h2>
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-xs font-semibold text-brand-primary">
          {total}
        </span>
      </div>

      {isLoading ? (
        <Notice icon={<Loader2 className={`${iconCls} animate-spin`} />} title="Loading lesson notes..." text="Please wait a moment" />
      ) : error ? (
        <Notice icon={<AlertCircle className="w-7 h-7 text-danger" />} title="Couldn't load lesson notes" text={error.message} />
      ) : total === 0 ? (
        <Notice icon={<BookOpen className={iconCls} />} title="No lesson notes found" text="Try adjusting your filters or search query" />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-line02">
                  {COLUMNS.map((col) => (
                    <th key={col} className={`py-3 text-xs font-semibold text-text-muted uppercase tracking-wide text-left ${col === "Title" ? "px-6" : "px-4"}`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
                {notes.map((note) => (
                  <LessonNotesRow
                    key={note.id}
                    note={note}
                    pending={actionPending}
                    onOpen={onOpen}
                    onApprove={onApprove}
                    onReject={onReject}
                  />
                ))}
              </motion.tbody>
            </table>
          </div>
          <LessonNotesPagination page={page} total={total} onPageChange={onPageChange} />
        </>
      )}
    </div>
  );
}