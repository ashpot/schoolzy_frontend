import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/ui/Button";
import type { ResultComments } from "../../../types/studentResult";
import { useSaveResultComment } from "../../../hooks/useAcademics";
import { resultCommentSchema, type ResultCommentFormValues } from "../../../schemas";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";



interface ResultCommentModalProps {
  isOpen: boolean;
  initialValues: ResultComments;
  onClose: () => void;
  onSaved: (values: ResultComments) => void;
}

const ResultCommentModal: React.FC<ResultCommentModalProps> = ({ isOpen, initialValues, onClose, onSaved }) => {
  const { mutate, isPending } = useSaveResultComment();
  const { register, handleSubmit, reset } = useForm<ResultCommentFormValues>({
    resolver: zodResolver(resultCommentSchema),
    defaultValues: initialValues,
  });

  React.useEffect(() => { reset(initialValues); }, [initialValues, reset]);

  const onSubmit = (values: ResultCommentFormValues) => {
    mutate(values, {
      onSuccess: () => {
        onSaved({ classTeacherComment: values.classTeacherComment ?? "", principalComment: values.principalComment ?? "" });
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
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-start justify-between px-6 pt-6">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Result Comment</h2>
                <p className="text-sm text-text-secondary mt-1">Add teacher and principal remarks for this result</p>
              </div>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-6 flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium text-label mb-1.5 block">Class Teacher's Comment</label>
                <textarea
                  {...register("classTeacherComment")}
                  rows={3}
                  placeholder="e.g. A diligent student who shows great potential. Keep it up!"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-line02 bg-bg-input text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-label mb-1.5 block">Principal's Comment</label>
                <textarea
                  {...register("principalComment")}
                  rows={3}
                  placeholder="e.g. Impressive performance. We encourage continuous effort."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-line02 bg-bg-input text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-line02">
                <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
                <Button variant="primary" type="submit" isLoading={isPending}>Save Comments</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResultCommentModal;