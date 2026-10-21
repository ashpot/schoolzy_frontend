import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, History } from "lucide-react";
import { loadAttendanceSchema, type LoadAttendanceValues } from "../schemas";
import { useClassGroupOptions } from "../hooks/useLearning";
import { useAttendanceSession } from "../hooks/useAttendanceSession";
import { localDateString } from "../shared/utils/attendanceMapper";
import { fadeUp } from "../animations/variants";
import AttendanceSetupForm from "../components/attendance/AttendanceSetupForm";
import AttendancePanel from "../components/attendance/AttendancePanel";
import AttendanceEmptyState from "../components/attendance/AttendanceEmptyState";
import ChangeClassModal from "../components/attendance/ChangeClassModal";

export default function AttendancePage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const restored = useRef(false);
  const { options, isLoading: optionsLoading } = useClassGroupOptions();
  const s = useAttendanceSession();

  const methods = useForm<LoadAttendanceValues>({
    resolver: zodResolver(loadAttendanceSchema),
    defaultValues: { classGroup: "" },
  });

  const onLoad = methods.handleSubmit(({ classGroup }) =>
    s.load(classGroup, options.find((o) => o.value === classGroup)?.label ?? "")
  );

  // Resume an unsaved session left behind when the user navigated away
  useEffect(() => {
    const draft = s.initialDraft;
    if (!draft || restored.current || optionsLoading || options.length === 0) return;
    restored.current = true;
    if (options.some((o) => o.value === draft.classGroupId)) s.load(draft.classGroupId, draft.className, draft);
    else s.discard(); // class group no longer exists
  }, [optionsLoading, options.length]);

  // Keep the dropdown showing the class being marked while the form is locked
  useEffect(() => {
    if (s.locked && s.session) methods.setValue("classGroup", s.session.classGroupId);
  }, [s.locked, s.session]);

  const clearSession = () => {
    s.discard();
    methods.reset({ classGroup: "" });
    setConfirmOpen(false);
  };
  const onChangeClass = () => (s.dirty ? setConfirmOpen(true) : clearSession());

  const pill = s.saved
    ? { text: "Attendance saved", cls: "bg-green-50 border-green-200 text-green-700", Icon: CheckCircle2 }
    : s.resumed
    ? { text: "Resumed where you left off", cls: "bg-blue-50 border-blue-200 text-brand-primary", Icon: History }
    : null;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Take and manage daily class attendance quickly and efficiently
          </p>
        </div>
        <AnimatePresence>
          {pill && (
            <motion.div
              key={pill.text}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${pill.cls}`}
            >
              <pill.Icon className="w-3.5 h-3.5" />
              {pill.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-[300px_1fr] gap-6 items-start">
        <FormProvider {...methods}>
          <AttendanceSetupForm
            options={options}
            optionsLoading={optionsLoading}
            isLoading={s.isLoading}
            locked={s.locked}
            date={s.session?.date ?? localDateString()}
            error={s.loadError}
            onSubmit={onLoad}
            onChangeClass={onChangeClass}
          />
        </FormProvider>

        <AnimatePresence mode="wait">
          {!s.session ? (
            <AttendanceEmptyState key="empty" />
          ) : (
            <AttendancePanel
              key="loaded"
              session={s.session}
              students={s.students}
              search={s.search}
              page={s.page}
              prefilled={s.prefilled}
              isSaving={s.isSaving}
              saveError={s.saveError}
              onSearchChange={s.setSearch}
              onPageChange={s.setPage}
              onToggleStatus={s.toggleStatus}
              onMarkAllPresent={s.markAllPresent}
              onReset={s.resetAll}
              onSave={s.save}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {confirmOpen && <ChangeClassModal onKeep={() => setConfirmOpen(false)} onDiscard={clearSession} />}
      </AnimatePresence>
    </motion.div>
  );
}