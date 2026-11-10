import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/shared/ui/SubmitButton";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";
import { useSavePsychomotive } from "../../hooks/useStudentResult";
import type { PsychomotiveScore } from "../../types/studentResult";
import { SCORE_REMARKS } from "../../utils/studentResultConstant";
import { psychomotiveSchema2, type PsychomotiveFormValues2 } from "../../schemas";


interface Props {
  isOpen: boolean;
  studentId: string;
  termId: string;
  initialValues: PsychomotiveScore[];
  onClose: () => void;
  onSaved: (scores: PsychomotiveScore[]) => void;
}

const PsychomotiveModal: React.FC<Props> = ({ isOpen, studentId, termId, initialValues, onClose, onSaved }) => {
  const mutation = useSavePsychomotive();
  const { control, handleSubmit, reset } = useForm<PsychomotiveFormValues2>({
    resolver: zodResolver(psychomotiveSchema2),
    defaultValues: { scores: initialValues },
  });

  useEffect(() => { if (isOpen) reset({ scores: initialValues }); }, [isOpen, initialValues, reset]);

  const onSubmit = (values: PsychomotiveFormValues2) => {
    mutation.mutate(
      { studentId, termId, scores: values.scores },
      { onSuccess: () => { onSaved(values.scores); onClose(); } }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div variants={modalVariant} initial="hidden" animate="show" exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border-line02">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Psychomotive Evaluation</h2>
                <p className="text-sm text-text-secondary mt-1">Rate each skill from 1 (Poor) to 5 (Excellent)</p>
              </div>
              <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-6">
              <div className="flex flex-col gap-5">
                {initialValues.map((item, index) => (
                  <Controller
                    key={item.skill}
                    control={control}
                    name={`scores.${index}.score`}
                    render={({ field }) => (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-text-primary w-36 shrink-0">{item.skill}</span>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              disabled={mutation.isPending}
                              onClick={() => field.onChange(n)}
                              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 ${
                                Number(field.value) >= n ? "bg-brand-primary text-white" : "border border-border-line02 text-text-muted"
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium w-20 text-center">
                          {SCORE_REMARKS[Number(field.value)] ?? "—"}
                        </span>
                      </div>
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border-line02">
                <button type="button" onClick={onClose} disabled={mutation.isPending}
                  className="flex-1 py-2.5 rounded-lg border border-border-line02 text-text-secondary text-sm font-medium hover:bg-bg-soft transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <div className="flex-1"><SubmitButton label="Save Scores" isLoading={mutation.isPending} /></div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PsychomotiveModal;