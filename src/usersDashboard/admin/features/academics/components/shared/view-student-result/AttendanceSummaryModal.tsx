import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Minus, Plus, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/ui/Button";
import type { AttendanceRecord } from "../../../types/studentResult";
import { attendanceSchema, type AttendanceFormValues } from "../../../schemas";
import { useSaveAttendance } from "../../../hooks/useAcademics";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";



interface AttendanceSummaryModalProps {
  isOpen: boolean;
  initialValues: AttendanceRecord;
  onClose: () => void;
  onSaved: (values: AttendanceRecord) => void;
}

const FIELDS: { key: keyof AttendanceFormValues; label: string; dot: string }[] = [
  { key: "timesSchoolOpened", label: "Times School Opened", dot: "bg-brand-primary" },
  { key: "timesPresent", label: "Times Present", dot: "bg-success" },
  { key: "timesEarly", label: "Times Early", dot: "bg-purple-500" },
  { key: "timesLate", label: "Times Late", dot: "bg-warning" },
  { key: "timesAbsent", label: "Times Absent", dot: "bg-danger" },
];

const AttendanceSummaryModal: React.FC<AttendanceSummaryModalProps> = ({ isOpen, initialValues, onClose, onSaved }) => {
  const { mutate, isPending } = useSaveAttendance();
  const { control, handleSubmit, reset } = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: initialValues,
  });

  React.useEffect(() => { reset(initialValues); }, [initialValues, reset]);

  const onSubmit = (values: AttendanceFormValues) => {
    mutate(values, { onSuccess: () => { onSaved(values); onClose(); } });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div variants={modalVariant} initial="hidden" animate="show" exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-start justify-between px-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-bg-input flex-center"><Calendar size={17} className="text-brand-primary" /></div>
                <div>
                  <h2 className="text-base font-semibold text-text-primary">Attendance Summary</h2>
                  <p className="text-xs text-text-secondary">Enter attendance record for this term</p>
                </div>
              </div>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-6">
              <div className="flex flex-col gap-4">
                {FIELDS.map((f) => (
                  <Controller
                    key={f.key}
                    control={control}
                    name={f.key}
                    render={({ field }) => (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-text-primary">
                          <span className={`w-2 h-2 rounded-full ${f.dot}`} /> {f.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => field.onChange(Math.max(0, Number(field.value) - 1))}
                            className="w-8 h-8 rounded-lg border border-border-line02 flex-center text-text-muted hover:bg-bg-soft">
                            <Minus size={14} />
                          </button>
                          <span className="w-14 text-center font-semibold text-text-primary">{field.value}</span>
                          <button type="button" onClick={() => field.onChange(Number(field.value) + 1)}
                            className="w-8 h-8 rounded-lg border border-border-line02 flex-center text-text-muted hover:bg-bg-soft">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border-line02">
                <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
                <SubmitButtonInline isLoading={isPending} />
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SubmitButtonInline: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <Button variant="primary" type="submit" isLoading={isLoading}>Save Attendance</Button>
);

export default AttendanceSummaryModal;