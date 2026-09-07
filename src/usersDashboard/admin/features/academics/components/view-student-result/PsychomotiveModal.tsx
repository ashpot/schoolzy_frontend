import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/ui/Button";
import type { PsychomotiveSkillScore } from "../../types/studentResult";
import { useSavePsychomotive } from "../../hooks/useAcademics";
import { psychomotiveSchema, type PsychomotiveFormValues } from "../../schemas";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";


const REMARKS: Record<number, string> = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" };

interface PsychomotiveModalProps {
  isOpen: boolean;
  initialValues: PsychomotiveSkillScore[];
  onClose: () => void;
  onSaved: (values: PsychomotiveSkillScore[]) => void;
}

const PsychomotiveModal: React.FC<PsychomotiveModalProps> = ({ isOpen, initialValues, onClose, onSaved }) => {
  const { mutate, isPending } = useSavePsychomotive();
  const { control, handleSubmit, reset } = useForm<PsychomotiveFormValues>({
    resolver: zodResolver(psychomotiveSchema),
    defaultValues: { scores: initialValues.map((s) => ({ skill: s.skill, score: s.score })) },
  });

  React.useEffect(() => {
    reset({ scores: initialValues.map((s) => ({ skill: s.skill, score: s.score })) });
  }, [initialValues, reset]);

  const onSubmit = (values: PsychomotiveFormValues) => {
    mutate(values, {
      onSuccess: () => {
        onSaved(values.scores.map((s) => ({ skill: s.skill, score: s.score, remark: REMARKS[s.score] })));
        onClose();
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div variants={modalVariant} initial="hidden" animate="show" exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between px-6 pt-6">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Psychomotive Evaluation</h2>
                <p className="text-sm text-text-secondary mt-1">Rate each skill from 1 (Poor) to 5 (Excellent)</p>
              </div>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-6">
              <div className="flex flex-col gap-5">
                {initialValues.map((skill, index) => (
                  <Controller
                    key={skill.skill}
                    control={control}
                    name={`scores.${index}.score`}
                    render={({ field }) => (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary w-40 shrink-0">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => field.onChange(n)}
                              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                                Number(field.value) >= n
                                  ? "bg-brand-primary text-white"
                                  : "border border-border-line02 text-text-muted"
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium w-20 text-center">
                          {REMARKS[Number(field.value)]}
                        </span>
                      </div>
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border-line02">
                <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
                <Button variant="primary" type="submit" isLoading={isPending}>Save Scores</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PsychomotiveModal;