import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarCheck,
  CheckCircle2,
  Search,
  RotateCcw,
  Clock,
} from "lucide-react";
import type { AttendanceStatus, AttendanceStudent } from "../types";
import { useLoadAttendanceStudents, useSaveAttendance } from "../hooks/useLearning";
import { loadAttendanceSchema, type LoadAttendanceValues } from "../schemas";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import { staggerContainer, rowVariant, fadeUp } from "../animations/variants";
import { classGroupOptions, classOptions } from "../data/mockData";
import Button from "@/shared/ui/Button";

// ─── Constants ─────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
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

function nowTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

// ─── Status toggle button ──────────────────────────────────────────────────
const STATUS_ACTIVE: Record<string, string> = {
  present: "bg-green-500 text-white border-green-500",
  absent:  "bg-red-500  text-white border-red-500",
  late:    "bg-amber-500 text-white border-amber-500",
};
const STATUS_IDLE =
  "bg-white text-[var(--color-text-secondary)] border-[var(--color-border-line02)] hover:border-gray-300";

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function AttendancePage() {
  const [students, setStudents]               = useState<AttendanceStudent[]>([]);
  const [loadedClass, setLoadedClass]         = useState<{
    className: string;
    totalStudents: number;
  } | null>(null);
  const [loadedValues, setLoadedValues]       = useState<LoadAttendanceValues | null>(null);
  const [searchQuery,  setSearchQuery]        = useState("");
  const [currentPage,  setCurrentPage]        = useState(1);
  const [draftSaved,   setDraftSaved]         = useState(false);

  const loadMutation = useLoadAttendanceStudents();
  const saveMutation = useSaveAttendance();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoadAttendanceValues>({
    resolver: zodResolver(loadAttendanceSchema),
    defaultValues: { class: "", classGroup: "", date: "" },
  });

  // Format date for display below the date input
  const dateValue = watch("date");
  const formattedDate = dateValue
    ? new Date(dateValue).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  // ── Load students ────────────────────────────────────────────────────────
  const onLoad = (values: LoadAttendanceValues) => {
    loadMutation.mutate(values, {
      onSuccess: (data) => {
        setStudents(data.students);
        setLoadedClass({
          className: data.className,
          totalStudents: data.totalStudents,
        });
        setLoadedValues(values);
        setSearchQuery("");
        setCurrentPage(1);
        setDraftSaved(false);
      },
    });
  };

  // ── Toggle per-student status ────────────────────────────────────────────
  const toggleStatus = useCallback(
    (studentId: string, status: AttendanceStatus) => {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id !== studentId) return s;
          const newStatus = s.status === status ? "unmarked" : status;
          return {
            ...s,
            status: newStatus,
            timeMarked: newStatus !== "unmarked" ? nowTime() : null,
          };
        })
      );
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3000);
    },
    []
  );

  // ── Mark all present ─────────────────────────────────────────────────────
  const markAllPresent = () => {
    const time = nowTime();
    setStudents((prev) =>
      prev.map((s) => ({ ...s, status: "present", timeMarked: time }))
    );
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  // ── Reset ────────────────────────────────────────────────────────────────
  const resetAll = () => {
    setStudents((prev) =>
      prev.map((s) => ({ ...s, status: "unmarked", timeMarked: null }))
    );
    setDraftSaved(false);
  };

  // ── Save ─────────────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!loadedValues) return;
    saveMutation.mutate({ ...loadedValues, students });
  };

  // ── Stats ────────────────────────────────────────────────────────────────
  const presentCount  = students.filter((s) => s.status === "present").length;
  const absentCount   = students.filter((s) => s.status === "absent").length;
  const lateCount     = students.filter((s) => s.status === "late").length;
  const unmarkedCount = students.filter((s) => s.status === "unmarked").length;
  const markedCount   = presentCount + absentCount + lateCount;
  const total         = students.length;

  // ── Filtered + paginated ─────────────────────────────────────────────────
  const filteredStudents = students.filter(
    (s) =>
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admNo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages       = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
          <h1 className="page-title">Attendance</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Take and manage daily class attendance quickly and efficiently
          </p>
        </div>

        {/* Draft auto-saved badge */}
        <AnimatePresence>
          {draftSaved && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0,   y: -8,  scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Draft auto-saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-[300px_1fr] gap-6 items-start">

        {/* ── Left: Setup form ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl card-shadow p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
              <CalendarCheck className="w-4 h-4 text-brand-primary" />
            </div>
            <h2 className="text-sm font-semibold text-text-nav">
              Attendance Setup
            </h2>
          </div>

          <form onSubmit={handleSubmit(onLoad)} noValidate className="space-y-4">
            <FormSelect
              label="Class"
              placeholder="Select class"
              options={classOptions}
              required
              isLoading={loadMutation.isPending}
              error={errors.class?.message}
              {...register("class")}
            />

            <FormSelect
              label="Class Group"
              placeholder="Select group"
              options={classGroupOptions}
              required
              isLoading={loadMutation.isPending}
              error={errors.classGroup?.message}
              {...register("classGroup")}
            />

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-label mb-1.5">
                Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                disabled={loadMutation.isPending}
                className={`w-full px-3 py-2.5 rounded-xl border bg-bg-input text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all disabled:opacity-60 ${
                  errors.date
                    ? "border-[var(--color-danger)]"
                    : "border-[var(--color-border-line02)]"
                }`}
                {...register("date")}
              />
              {formattedDate && !errors.date && (
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  {formattedDate}
                </p>
              )}
              {errors.date && (
                <p className="mt-1 text-xs text-[var(--color-danger)]">
                  {errors.date.message}
                </p>
              )}
            </div>

            <SubmitButton
              label="Load Students"
              isLoading={loadMutation.isPending}
            />
          </form>
        </div>

        {/* ── Right: Empty state or loaded table ───────────────────────── */}
        <AnimatePresence mode="wait">
          {!loadedClass ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center min-h-[440px]"
            >
              <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
                <CalendarCheck className="w-9 h-9 text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-nav)] mb-2">
                Ready to take attendance
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] max-w-xs">
                Select a class, group and date above, then click{" "}
                <span className="font-semibold text-[var(--color-text-nav)]">
                  Load Students
                </span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="loaded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl card-shadow overflow-hidden"
            >
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-[var(--color-border-line02)] space-y-3">
                {/* Row 1: class name + actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base font-semibold text-[var(--color-text-nav)]">
                      {loadedClass.className}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-xs font-medium text-[var(--color-brand-primary)]">
                      {loadedClass.totalStudents} Students
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={markAllPresent}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Mark All Present
                    </button>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                      <input
                        type="text"
                        placeholder="Search student..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="pl-8 pr-4 py-1.5 rounded-lg border border-[var(--color-border-line02)] bg-[var(--color-bg-input)] text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all w-40"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: status pills + warning */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { label: "Present",  count: presentCount,  dot: "bg-green-500",  pill: "border-green-200 bg-green-50 text-green-700" },
                      { label: "Absent",   count: absentCount,   dot: "bg-red-500",    pill: "border-red-200 bg-red-50 text-red-600" },
                      { label: "Late",     count: lateCount,     dot: "bg-amber-500",  pill: "border-amber-200 bg-amber-50 text-amber-700" },
                      { label: "Unmarked", count: unmarkedCount, dot: "bg-gray-300",   pill: "border-gray-200 bg-gray-50 text-gray-500" },
                    ].map(({ label, count, dot, pill }) => (
                      <span
                        key={label}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                        {count} {label}
                      </span>
                    ))}
                  </div>
                  {unmarkedCount > 0 && (
                    <span className="flex items-center gap-1 text-xs text-amber-600">
                      <Clock className="w-3.5 h-3.5" />
                      {unmarkedCount} students not yet marked
                    </span>
                  )}
                </div>

                {/* Row 3: progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-1.5">
                    <span>Marking progress</span>
                    <span>{markedCount}/{total}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
                    {total > 0 && (
                      <>
                        <div
                          className="bg-green-500 h-full transition-all duration-300"
                          style={{ width: `${(presentCount / total) * 100}%` }}
                        />
                        <div
                          className="bg-red-500 h-full transition-all duration-300"
                          style={{ width: `${(absentCount / total) * 100}%` }}
                        />
                        <div
                          className="bg-amber-500 h-full transition-all duration-300"
                          style={{ width: `${(lateCount / total) * 100}%` }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Student table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--color-border-line02)]">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide w-12">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                        Student Name
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                        Attendance Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                        Time Marked
                      </th>
                    </tr>
                  </thead>
                  <motion.tbody
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {paginatedStudents.map((student, idx) => (
                      <motion.tr
                        key={student.id}
                        variants={rowVariant}
                        className="border-b border-[var(--color-border-line02)] last:border-0 hover:bg-gray-50/40 transition-colors"
                      >
                        {/* # */}
                        <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">
                          {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                        </td>

                        {/* Student */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full flex-center text-xs font-semibold flex-shrink-0 ${avatarColor(
                                student.name
                              )}`}
                            >
                              {getInitials(student.name)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[var(--color-text-nav)]">
                                {student.name}
                              </p>
                              <p className="text-xs text-[var(--color-text-muted)]">
                                {student.admNo}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status toggles */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {(["present", "absent", "late"] as AttendanceStatus[]).map(
                              (status) => (
                                <button
                                  key={status}
                                  type="button"
                                  onClick={() => toggleStatus(student.id, status)}
                                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                                    student.status === status
                                      ? STATUS_ACTIVE[status]
                                      : STATUS_IDLE
                                  }`}
                                >
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                              )
                            )}
                          </div>
                        </td>

                        {/* Time */}
                        <td className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-muted)]">
                          {student.timeMarked ?? "--:--"}
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredStudents.length > 0 && (
                <div className="px-6 py-4 border-t border-[var(--color-border-line02)] flex items-center justify-between">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Showing{" "}
                    <span className="font-medium text-[var(--color-text-nav)]">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredStudents.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-[var(--color-text-nav)]">
                      {filteredStudents.length}
                    </span>{" "}
                    students
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-[var(--color-text-secondary)]"
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
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
                      )
                    )}
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

              {/* Sticky footer bar */}
              <div className="px-6 py-4 bg-gray-50 border-t border-[var(--color-border-line02)] flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs">
                  {[
                    { label: "Present",  count: presentCount,  dot: "bg-green-500",  text: "text-green-700" },
                    { label: "Absent",   count: absentCount,   dot: "bg-red-500",    text: "text-red-600" },
                    { label: "Late",     count: lateCount,     dot: "bg-amber-500",  text: "text-amber-700" },
                    { label: "Unmarked", count: unmarkedCount, dot: "bg-gray-300",   text: "text-gray-500" },
                  ].map(({ label, count, dot, text }) => (
                    <span key={label} className={`flex items-center gap-1.5 ${text}`}>
                      <span className={`w-2 h-2 rounded-full ${dot}`} />
                      {count} {label}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                    onClick={resetAll}
                    disabled={saveMutation.isPending}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSave}
                    isLoading={saveMutation.isPending}
                  >
                    Save Attendance
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}