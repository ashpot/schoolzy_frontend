import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  Plus,
  Search,
  ChevronDown,
  X,
  Upload,
  Download,
  Trash2,
  FileText,
  Filter,
} from "lucide-react";
import type { FileType, LessonNote } from "../types";
import { useDeleteLessonNote, useUploadLessonNote } from "../hooks/useLearning";
import { uploadLessonNoteSchema, type UploadLessonNoteValues } from "../schemas";
import { fadeUp, modalVariant, rowVariant, staggerContainer } from "../animations/variants";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import { classOptions, mockLessonNotes, subjectOptions, teacherOptions } from "../data/mockData";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";

// ─── Constants ─────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 8;

const FILE_TYPE_STYLES: Record<FileType, string> = {
  PDF:  "bg-red-50 text-red-600",
  DOC:  "bg-blue-50 text-blue-600",
  DOCX: "bg-blue-50 text-blue-600",
  PPT:  "bg-orange-50 text-orange-600",
};

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

// ─── Filter Pill Dropdown ──────────────────────────────────────────────────
interface FilterPillProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}

function FilterPill({ label, value, options, onChange }: FilterPillProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel =
    value === ""
      ? label
      : options.find((o) => o.value === value)?.label ?? label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border-line02)] bg-white text-sm text-[var(--color-text-nav)] hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-1 left-0 z-20 bg-white rounded-xl border border-[var(--color-border-line02)] shadow-lg min-w-[160px] py-1 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  value === ""
                    ? "bg-blue-50 text-[var(--color-brand-primary)]"
                    : "text-[var(--color-text-nav)] hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    value === opt.value
                      ? "bg-blue-50 text-[var(--color-brand-primary)]"
                      : "text-[var(--color-text-nav)] hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Upload Modal ──────────────────────────────────────────────────────────
interface UploadModalProps {
  onClose: () => void;
}

function UploadModal({ onClose }: UploadModalProps) {
  const uploadMutation = useUploadLessonNote();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver]     = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UploadLessonNoteValues>({
    resolver: zodResolver(uploadLessonNoteSchema),
    defaultValues: {
      title: "",
      class: "",
      subject: "",
      teacher: "",
      description: "",
    },
  });

  const applyFile = useCallback(
    (file: File) => {
      setSelectedFile(file);
      const dt = new DataTransfer();
      dt.items.add(file);
      setValue("file", dt.files, { shouldValidate: true });
    },
    [setValue]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) applyFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  };

  const onSubmit = (values: UploadLessonNoteValues) => {
    uploadMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        variants={modalVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[var(--color-border-line02)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex-center">
              <Upload className="w-5 h-5 text-[var(--color-brand-primary)]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text-nav)]">
                Upload Lesson Note
              </h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Fill in the details below to add a new note
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 transition-colors text-[var(--color-text-muted)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="p-6 space-y-4"
        >
          {/* Title */}
          <FormInput
            label="Title"
            placeholder="e.g. Introduction to Quadratic Equations"
            required
            isLoading={uploadMutation.isPending}
            error={errors.title?.message}
            {...register("title")}
          />

          {/* Class + Subject */}
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Class"
              placeholder="Select class..."
              options={classOptions}
              required
              isLoading={uploadMutation.isPending}
              error={errors.class?.message}
              {...register("class")}
            />
            <FormSelect
              label="Subject"
              placeholder="Select subject..."
              options={subjectOptions}
              required
              isLoading={uploadMutation.isPending}
              error={errors.subject?.message}
              {...register("subject")}
            />
          </div>

          {/* Teacher */}
          <FormSelect
            label="Teacher"
            placeholder="Select teacher..."
            options={teacherOptions}
            required
            isLoading={uploadMutation.isPending}
            error={errors.teacher?.message}
            {...register("teacher")}
          />

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-label)] mb-1.5">
              File <span className="text-[var(--color-danger)]">*</span>
            </label>
            <div
              onClick={() =>
                !uploadMutation.isPending && fileInputRef.current?.click()
              }
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragOver
                  ? "border-[var(--color-brand-primary)] bg-blue-50"
                  : selectedFile
                  ? "border-green-400 bg-green-50"
                  : errors.file
                  ? "border-[var(--color-danger)] bg-red-50"
                  : "border-[var(--color-border-line02)] bg-[var(--color-bg-input)] hover:border-[var(--color-brand-primary)] hover:bg-blue-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleFileChange}
                disabled={uploadMutation.isPending}
              />

              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-green-700">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-green-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex-center">
                    <Upload className="w-5 h-5 text-[var(--color-brand-primary)]" />
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Drop file here or{" "}
                    <span className="text-[var(--color-brand-primary)] font-medium">
                      click to browse
                    </span>
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    PDF, DOC, DOCX, PPT — max 20 MB
                  </p>
                </div>
              )}
            </div>
            {errors.file && (
              <p className="mt-1 text-xs text-[var(--color-danger)]">
                {errors.file.message as string}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-label)] mb-1.5">
              Description{" "}
              <span className="text-[var(--color-text-muted)] font-normal">
                (optional)
              </span>
            </label>
            <textarea
              placeholder="Brief description of what this lesson note covers..."
              disabled={uploadMutation.isPending}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border-line02)] bg-[var(--color-bg-input)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all resize-none disabled:opacity-60"
              {...register("description")}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={onClose}
              disabled={uploadMutation.isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <div className="flex-1">
              <SubmitButton
                label="Upload Note"
                isLoading={uploadMutation.isPending}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function LessonNotesPage() {
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [filterClass,    setFilterClass]    = useState("");
  const [filterSubject,  setFilterSubject]  = useState("");
  const [filterTeacher,  setFilterTeacher]  = useState("");
  const [searchQuery,    setSearchQuery]    = useState("");
  const [currentPage,    setCurrentPage]    = useState(1);
  const [notes, setNotes] = useState<LessonNote[]>(mockLessonNotes);

  const deleteMutation = useDeleteLessonNote();

  // Filter
  const filteredNotes = notes.filter((note) => {
    const matchClass =
      filterClass === "" ||
      note.class ===
        classOptions.find((o) => o.value === filterClass)?.label;
    const matchSubject =
      filterSubject === "" ||
      note.subject ===
        subjectOptions.find((o) => o.value === filterSubject)?.label;
    const matchTeacher =
      filterTeacher === "" ||
      note.teacher.name ===
        teacherOptions.find((o) => o.value === filterTeacher)?.label;
    const matchSearch =
      searchQuery === "" ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSubject && matchTeacher && matchSearch;
  });

  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (noteId: string) => {
    deleteMutation.mutate(noteId, {
      onSuccess: () => {
        setNotes((prev) => prev.filter((n) => n.id !== noteId));
      },
    });
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="dashboard-p space-y-6"
    >
      {/* Page Header */}
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
          <FilterPill
            label="All Classes"
            value={filterClass}
            options={classOptions}
            onChange={(val) => { setFilterClass(val); setCurrentPage(1); }}
          />
          <FilterPill
            label="All Subjects"
            value={filterSubject}
            options={subjectOptions}
            onChange={(val) => { setFilterSubject(val); setCurrentPage(1); }}
          />
          <FilterPill
            label="All Teachers"
            value={filterTeacher}
            options={teacherOptions}
            onChange={(val) => { setFilterTeacher(val); setCurrentPage(1); }}
          />

          {/* Search */}
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

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Filter className="w-3.5 h-3.5" />}
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-4 border-b border-[var(--color-border-line02)]">
          <div className="flex items-center gap-2">
            <h2 className="section-title">All Lesson Notes</h2>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-xs font-semibold text-[var(--color-brand-primary)]">
              {filteredNotes.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border-line02)]">
                {["Title", "Subject", "Class", "Teacher", "Date Uploaded", "File", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className={`py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide text-left ${
                        col === "Title" ? "px-6" : "px-4"
                      }`}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
              {paginatedNotes.map((note) => (
                <motion.tr
                  key={note.id}
                  variants={rowVariant}
                  className="border-b border-[var(--color-border-line02)] last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  {/* Title */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[var(--color-text-nav)] max-w-[200px] truncate">
                      {note.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {note.term} · {note.week}
                    </p>
                  </td>

                  {/* Subject */}
                  <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                    {note.subject}
                  </td>

                  {/* Class */}
                  <td className="px-4 py-4 text-sm font-medium text-[var(--color-text-nav)]">
                    {note.class}
                  </td>

                  {/* Teacher */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex-center text-xs font-semibold flex-shrink-0 ${avatarColor(
                          note.teacher.name
                        )}`}
                      >
                        {getInitials(note.teacher.name)}
                      </div>
                      <span className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                        {note.teacher.name}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 text-sm text-[var(--color-text-muted)]">
                    {note.dateUploaded}
                  </td>

                  {/* File */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        FILE_TYPE_STYLES[note.file.type]
                      }`}
                    >
                      {note.file.type}
                    </span>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {note.file.size}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Download"
                        className="w-8 h-8 rounded-lg flex-center text-[var(--color-brand-primary)] hover:bg-blue-50 transition-colors"
                      >
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
            <h3 className="text-base font-semibold text-[var(--color-text-nav)] mb-1">
              No lesson notes found
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Try adjusting your filters or search query
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredNotes.length > 0 && (
          <div className="px-6 py-4 border-t border-[var(--color-border-line02)] flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-muted)]">
              Showing{" "}
              <span className="font-medium text-[var(--color-text-nav)]">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredNotes.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-[var(--color-text-nav)]">
                {filteredNotes.length}
              </span>{" "}
              notes
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-[var(--color-text-secondary)]"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <UploadModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}