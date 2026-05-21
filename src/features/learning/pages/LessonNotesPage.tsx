import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Search, Download, Trash2, Filter } from "lucide-react";
import type { LessonNote } from "../types";
import { useDeleteLessonNote } from "../hooks/useLearning";
import { fadeUp, rowVariant, staggerContainer } from "../animations/variants";
import { classOptions, mockLessonNotes, subjectOptions, teacherOptions } from "../data/mockData";
import Button from "@/shared/ui/Button";
import { FILE_TYPE_STYLES, ITEMS_PER_PAGE } from "../shared/utils/constants";
import FilterPill from "../components/Lesson/FilterPill";
import { avatarColor, getInitials } from "../shared/utils/helpers";
import UploadModal from "../components/Lesson/UploadModal";


export default function LessonNotesPage() {
  const [isModalOpen,   setIsModalOpen]   = useState(false);
  const [filterClass,   setFilterClass]   = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [searchQuery,   setSearchQuery]   = useState("");
  const [currentPage,   setCurrentPage]   = useState(1);
  const [notes,         setNotes]         = useState<LessonNote[]>(mockLessonNotes);

  const deleteMutation = useDeleteLessonNote();

  const filteredNotes = notes.filter((note) => {
    const matchClass   = filterClass   === "" || note.class        === classOptions.find((o) => o.value === filterClass)?.label;
    const matchSubject = filterSubject === "" || note.subject      === subjectOptions.find((o) => o.value === filterSubject)?.label;
    const matchTeacher = filterTeacher === "" || note.teacher.name === teacherOptions.find((o) => o.value === filterTeacher)?.label;
    const matchSearch  = searchQuery   === "" || note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSubject && matchTeacher && matchSearch;
  });

  const totalPages     = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (noteId: string) => {
    deleteMutation.mutate(noteId, {
      onSuccess: () => setNotes((prev) => prev.filter((n) => n.id !== noteId)),
    });
  };

  const resetPage = (setter: (v: string) => void) => (val: string) => {
    setter(val);
    setCurrentPage(1);
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Lesson Notes</h1>
          <p className="text-body-small text-[var(--color-text-secondary)] mt-1">
            View and manage lesson notes uploaded by teachers across all classes
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Upload Lesson Note
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl card-shadow p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <FilterPill label="All Classes"   value={filterClass}   options={classOptions}   onChange={resetPage(setFilterClass)} />
          <FilterPill label="All Subjects"  value={filterSubject} options={subjectOptions} onChange={resetPage(setFilterSubject)} />
          <FilterPill label="All Teachers"  value={filterTeacher} options={teacherOptions} onChange={resetPage(setFilterTeacher)} />
          <div className="flex-1 min-w-[180px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--color-border-line02)] bg-[var(--color-bg-input)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all"
            />
          </div>
          <Button variant="primary" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border-line02)]">
          <div className="flex items-center gap-2">
            <h2 className="section-title">All Lesson Notes</h2>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-xs font-semibold text-[var(--color-brand-primary)]">
              {filteredNotes.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border-line02)]">
                {["Title", "Subject", "Class", "Teacher", "Date Uploaded", "File", "Actions"].map((col) => (
                  <th
                    key={col}
                    className={`py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide text-left ${col === "Title" ? "px-6" : "px-4"}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
              {paginatedNotes.map((note) => (
                <motion.tr
                  key={note.id}
                  variants={rowVariant}
                  className="border-b border-[var(--color-border-line02)] last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[var(--color-text-nav)] max-w-[200px] truncate">
                      {note.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {note.term} · {note.week}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">{note.subject}</td>
                  <td className="px-4 py-4 text-sm font-medium text-[var(--color-text-nav)]">{note.class}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex-center text-xs font-semibold flex-shrink-0 ${avatarColor(note.teacher.name)}`}>
                        {getInitials(note.teacher.name)}
                      </div>
                      <span className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                        {note.teacher.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--color-text-muted)]">{note.dateUploaded}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${FILE_TYPE_STYLES[note.file.type]}`}>
                      {note.file.type}
                    </span>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{note.file.size}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button type="button" title="Download" className="w-8 h-8 rounded-lg flex-center text-[var(--color-brand-primary)] hover:bg-blue-50 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => handleDelete(note.id)}
                        disabled={deleteMutation.isPending}
                        className="w-8 h-8 rounded-lg flex-center text-[var(--color-danger)] hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredNotes.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex-center mb-4">
              <BookOpen className="w-7 h-7 text-[var(--color-brand-primary)]" />
            </div>
            <h3 className="text-base font-semibold text-[var(--color-text-nav)] mb-1">No lesson notes found</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Pagination */}
        {filteredNotes.length > 0 && (
          <div className="px-6 py-4 border-t border-[var(--color-border-line02)] flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-muted)]">
              Showing{" "}
              <span className="font-medium text-[var(--color-text-nav)]">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredNotes.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-[var(--color-text-nav)]">{filteredNotes.length}</span> notes
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-[var(--color-text-secondary)]"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg flex-center text-sm font-medium transition-colors ${
                    p === currentPage
                      ? "bg-[var(--color-brand-primary)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-[var(--color-text-secondary)]"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}