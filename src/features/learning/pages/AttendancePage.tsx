import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import type { AttendanceStatus, AttendanceStudent } from "../types";
import { useLoadAttendanceStudents, useSaveAttendance } from "../hooks/useLearning";
import { loadAttendanceSchema, type LoadAttendanceValues } from "../schemas";
import { fadeUp } from "../animations/variants";
import { ITEMS_PER_PAGE } from "@/features/learning/shared/utils/constants";
import AttendanceSetupForm from "../components/attendance/AttendanceSetupForm";
import AttendancePanel, { AttendanceEmptyState } from "@/features/learning/components/attendance/AttendancePanel";
import { nowTime } from "../shared/utils/helpers";

export default function AttendancePage() {
  const [students,     setStudents]     = useState<AttendanceStudent[]>([]);
  const [loadedClass,  setLoadedClass]  = useState<{ className: string; totalStudents: number } | null>(null);
  const [loadedValues, setLoadedValues] = useState<LoadAttendanceValues | null>(null);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [currentPage,  setCurrentPage]  = useState(1);
  const [draftSaved,   setDraftSaved]   = useState(false);

  const loadMutation = useLoadAttendanceStudents();
  const saveMutation = useSaveAttendance();

  const methods = useForm<LoadAttendanceValues>({
    resolver: zodResolver(loadAttendanceSchema),
    defaultValues: { class: "", classGroup: "", date: "" },
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const onLoad = methods.handleSubmit((values) => {
    loadMutation.mutate(values, {
      onSuccess: (data) => {
        setStudents(data.students);
        setLoadedClass({ className: data.className, totalStudents: data.totalStudents });
        setLoadedValues(values);
        setSearchQuery("");
        setCurrentPage(1);
        setDraftSaved(false);
      },
    });
  });

  const flashDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const toggleStatus = useCallback((studentId: string, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const newStatus = s.status === status ? "unmarked" : status;
        return { ...s, status: newStatus, timeMarked: newStatus !== "unmarked" ? nowTime() : null };
      })
    );
    flashDraft();
  }, []);

  const markAllPresent = () => {
    const time = nowTime();
    setStudents((prev) => prev.map((s) => ({ ...s, status: "present", timeMarked: time })));
    flashDraft();
  };

  const resetAll = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: "unmarked", timeMarked: null })));
    setDraftSaved(false);
  };

  const handleSave = () => {
    if (!loadedValues) return;
    saveMutation.mutate({ ...loadedValues, students });
  };

  // ── Derived stats ─────────────────────────────────────────────────────────
  const presentCount  = students.filter((s) => s.status === "present").length;
  const absentCount   = students.filter((s) => s.status === "absent").length;
  const lateCount     = students.filter((s) => s.status === "late").length;
  const unmarkedCount = students.filter((s) => s.status === "unmarked").length;
  const markedCount   = presentCount + absentCount + lateCount;

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
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Take and manage daily class attendance quickly and efficiently
          </p>
        </div>
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
        <FormProvider {...methods}>
          <AttendanceSetupForm isLoading={loadMutation.isPending} onSubmit={onLoad} />
        </FormProvider>

        <AnimatePresence mode="wait">
          {!loadedClass ? (
            <AttendanceEmptyState />
          ) : (
            <AttendancePanel
              loadedClass={loadedClass}
              paginatedStudents={paginatedStudents}
              filteredCount={filteredStudents.length}
              currentPage={currentPage}
              totalPages={totalPages}
              searchQuery={searchQuery}
              presentCount={presentCount}
              absentCount={absentCount}
              lateCount={lateCount}
              unmarkedCount={unmarkedCount}
              markedCount={markedCount}
              total={students.length}
              isSaving={saveMutation.isPending}
              onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
              onPageChange={setCurrentPage}
              onToggleStatus={toggleStatus}
              onMarkAllPresent={markAllPresent}
              onReset={resetAll}
              onSave={handleSave}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}