import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/shared/ui/SubmitButton";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";
import { useSaveResultComment } from "../../hooks/useStudentResult";
import type { ResultComments } from "../../types/studentResult";
import { resultCommentSchema, type ResultCommentFormValues } from "../../schemas";

interface Props {
  isOpen: boolean;
  studentId: string;
  termId: string;
  initialValues: ResultComments;
  onClose: () => void;
  onSaved: (values: ResultComments) => void;
}

const areaCls =
  "w-full px-3.5 py-2.5 rounded-lg border bg-bg-input text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none";

const ResultCommentModal: React.FC<Props> = ({ isOpen, studentId, termId, initialValues, onClose, onSaved }) => {
  const mutation = useSaveResultComment();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ResultCommentFormValues>({
    resolver: zodResolver(resultCommentSchema),
    defaultValues: initialValues,
  });

  useEffect(() => { if (isOpen) reset(initialValues); }, [isOpen, initialValues, reset]);

  const onSubmit = (values: ResultCommentFormValues) => {
    mutation.mutate(
      { studentId, termId, values },
      { onSuccess: () => { onSaved(values); onClose(); } }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div variants={modalVariant} initial="hidden" animate="show" exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border-line02">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Result Comment</h2>
                <p className="text-sm text-text-secondary mt-1">Add teacher and principal remarks for this result</p>
              </div>
              <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-6 flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium text-label mb-1.5 block">Class Teacher's Comment</label>
                <textarea rows={4} disabled={mutation.isPending}
                  placeholder="e.g. A diligent student who shows great potential. Keep it up!"
                  className={`${areaCls} ${errors.classTeacherComment ? "border-danger" : "border-border-line02"}`}
                  {...register("classTeacherComment")} />
                {errors.classTeacherComment && <p className="text-xs text-danger mt-1">{errors.classTeacherComment.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-label mb-1.5 block">Principal's Comment</label>
                <textarea rows={4} disabled={mutation.isPending}
                  placeholder="e.g. Impressive performance. We encourage continuous effort."
                  className={`${areaCls} ${errors.principalComment ? "border-danger" : "border-border-line02"}`}
                  {...register("principalComment")} />
                {errors.principalComment && <p className="text-xs text-danger mt-1">{errors.principalComment.message}</p>}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border-line02">
                <button type="button" onClick={onClose} disabled={mutation.isPending}
                  className="flex-1 py-2.5 rounded-lg border border-border-line02 text-text-secondary text-sm font-medium hover:bg-bg-soft transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <div className="flex-1"><SubmitButton label="Save Comments" isLoading={mutation.isPending} /></div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResultCommentModal;