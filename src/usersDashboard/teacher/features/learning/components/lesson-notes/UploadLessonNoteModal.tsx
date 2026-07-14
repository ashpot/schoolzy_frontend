import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X } from "lucide-react";
import { modalVariant } from "../../animations/variants";
import { uploadLessonNoteSchema, type UploadLessonNoteValues } from "../../schemas";
import { subjectOptions, classOptions, weekOptions } from "../../data/mockData";
import { useUploadLessonNote } from "../../hooks/useLessonNotes";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";

export default function UploadLessonNoteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const mutation = useUploadLessonNote();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UploadLessonNoteValues>({
    resolver: zodResolver(uploadLessonNoteSchema),
  });

  const onSubmit = (values: UploadLessonNoteValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
              <h3 className="section-title">Upload Lesson Note</h3>
              <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-text-muted hover:bg-bg-input">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 space-y-4">
              <FormInput
                label="Title"
                placeholder="e.g. Introduction to Quadratic Eq"
                error={errors.title?.message}
                isLoading={mutation.isPending}
                {...register("title")}
              />

              <div>
                <label className="block text-sm font-medium text-label mb-1.5">Subject *</label>
                <select {...register("subject")} className="select-field w-full">
                  <option value="">Select subject</option>
                  {subjectOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                {errors.subject && <p className="text-xs text-danger mt-1">{errors.subject.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-label mb-1.5">Class *</label>
                  <select {...register("classId")} className="select-field w-full">
                    <option value="">Select class</option>
                    {classOptions.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  {errors.classId && <p className="text-xs text-danger mt-1">{errors.classId.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-label mb-1.5">Week *</label>
                  <select {...register("week")} className="select-field w-full">
                    <option value="">Select week</option>
                    {weekOptions.map((w) => (
                      <option key={w.value} value={w.value}>{w.label}</option>
                    ))}
                  </select>
                  {errors.week && <p className="text-xs text-danger mt-1">{errors.week.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-label mb-1.5">File *</label>
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border-line02 rounded-xl py-8 cursor-pointer hover:border-brand-primary transition-colors">
                      <UploadCloud size={22} className="text-text-muted" />
                      <span className="text-body-small text-text-secondary">
                        {value?.[0]?.name ?? "Click or drag a file to upload"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => onChange(e.target.files)}
                      />
                    </label>
                  )}
                />
                {errors.file && <p className="text-xs text-danger mt-1">{errors.file.message as string}</p>}
              </div>

              <SubmitButton label="Upload Note" isLoading={mutation.isPending} />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}