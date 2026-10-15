import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Button from "@/shared/ui/Button";
import { useTeacherOptionsList } from "@/usersDashboard/admin/features/sections/hooks/useSections";
import type { LessonNote, LessonNoteFilters, ReviewStatus } from "../types";
import { fadeUp } from "../animations/variants";
import {
  useApproveLessonNote, useClassGroupOptions, useLessonNotesList, useLessonSubjects, useRejectLessonNote,
} from "../hooks/useLearning";
import { EMPTY_FILTERS, filterLessonNotes } from "../shared/utils/filterLessonNotes";
import { titleCase } from "../shared/utils/lessonNoteMapper";
import { ITEMS_PER_PAGE } from "../shared/utils/constants";
import LessonNotesFilters from "../components/Lesson/LessonNotesFilters";
import LessonNotesTable from "../components/Lesson/LessonNotesTable";
import UploadModal from "../components/Lesson/UploadModal";
import ViewLessonNoteModal from "../components/Lesson/ViewLessonNoteModal";

export default function LessonNotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<LessonNote | null>(null);
  const [filters, setFilters] = useState<LessonNoteFilters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  // Backend has no approve/reject yet → local status overrides until endpoints land
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  const notesQuery = useLessonNotesList();
  const subjectsQuery = useLessonSubjects();
  const teachersQuery = useTeacherOptionsList();
  const { options: classOptions } = useClassGroupOptions();
  const approveMutation = useApproveLessonNote();
  const rejectMutation = useRejectLessonNote();

  const subjectOptions = (subjectsQuery.data ?? []).map((s) => ({ value: String(s.id), label: titleCase(s.name) }));
  const teacherOptions = (teachersQuery.data ?? []).map((t) => ({
    value: String(t.id),
    label: `${t.first_name} ${t.last_name}`,
  }));

  const filtered = useMemo(() => {
    const withStatus = (notesQuery.data ?? []).map((n) => ({ ...n, status: overrides[n.id] ?? n.status }));
    return filterLessonNotes(withStatus, filters);
  }, [notesQuery.data, overrides, filters]);

  const pageNotes = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (key: keyof LessonNoteFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleStatusChange = (noteId: string, status: ReviewStatus) =>
    setOverrides((prev) => ({ ...prev, [noteId]: status }));

  const handleQuickApprove = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    approveMutation.mutate({ noteId }, { onSuccess: () => handleStatusChange(noteId, "Approved") });
  };

  const handleQuickReject = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    rejectMutation.mutate({ noteId }, { onSuccess: () => handleStatusChange(noteId, "Rejected") });
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Lesson Notes</h1>
          <p className="text-body-small text-text-secondary mt-1">
            View and manage lesson notes uploaded by teachers across all classes
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Upload Lesson Note
        </Button>
      </div>

      <LessonNotesFilters
        filters={filters}
        onChange={handleFilterChange}
        classOptions={classOptions}
        subjectOptions={subjectOptions}
        teacherOptions={teacherOptions}
      />

      <LessonNotesTable
        notes={pageNotes}
        total={filtered.length}
        page={page}
        isLoading={notesQuery.isLoading}
        error={notesQuery.error}
        actionPending={approveMutation.isPending || rejectMutation.isPending}
        onPageChange={setPage}
        onOpen={setSelectedNote}
        onApprove={handleQuickApprove}
        onReject={handleQuickReject}
      />

      <AnimatePresence>
        {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedNote && (
          <ViewLessonNoteModal
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}