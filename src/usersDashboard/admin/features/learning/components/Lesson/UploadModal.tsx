import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import FileDropZone from "./FileDropZone";
import { useClassGroupOptions, useLessonSubjects, useUploadLessonNote } from "../../hooks/useLearning";
import { uploadLessonNoteSchema, type UploadLessonNoteValues } from "../../schemas";
import { titleCase } from "../../shared/utils/lessonNoteMapper";
import { modalVariant } from "../../animations/variants";

export default function UploadModal({ onClose }: { onClose: () => void }) {
  const uploadMutation = useUploadLessonNote();
  const { options: classGroups } = useClassGroupOptions();
  const subjectsQuery = useLessonSubjects();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register, handleSubmit, setValue, watch,
    formState: { errors },
  } = useForm<UploadLessonNoteValues>({
    resolver: zodResolver(uploadLessonNoteSchema),
    defaultValues: { title: "", classGroup: "", subject: "", description: "" },
  });

  // Subjects are limited to the selected class group's section (backend rule)
  const classGroupId = watch("classGroup");
  const section = classGroups.find((g) => g.value === classGroupId)?.section ?? null;
  const subjectOptions = (subjectsQuery.data ?? [])
    .filter((s) => section === null || s.section === null || s.section === section)
    .map((s) => ({ value: String(s.id), label: titleCase(s.name) }));

  const applyFile = useCallback(
    (file: File) => {
      setSelectedFile(file);
      const dt = new DataTransfer();
      dt.items.add(file);
      setValue("file", dt.files, { shouldValidate: true });
    },
    [setValue]
  );

  const onSubmit = (values: UploadLessonNoteValues) => {
    uploadMutation.mutate(values, { onSuccess: onClose });
  };

  const busy = uploadMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        variants={modalVariant} initial="hidden" animate="show" exit="exit"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border-line02">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex-center">
              <Upload className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-nav">Upload Lesson Note</h2>
              <p className="text-xs text-text-muted mt-0.5">Fill in the details below to add a new note</p>
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 transition-colors text-text-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 space-y-4">
          <FormInput
            label="Title"
            placeholder="e.g. Introduction to Quadratic Equations"
            required
            isLoading={busy}
            error={errors.title?.message}
            {...register("title")}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Class"
              placeholder="Select class..."
              options={classGroups}
              required
              isLoading={busy}
              error={errors.classGroup?.message}
              {...register("classGroup", { onChange: () => setValue("subject", "") })}
            />
            <FormSelect
              label="Subject"
              placeholder={classGroupId ? "Select subject..." : "Select a class first..."}
              options={subjectOptions}
              required
              isLoading={busy}
              error={errors.subject?.message}
              {...register("subject")}
            />
          </div>

          <FileDropZone
            file={selectedFile}
            error={errors.file?.message as string | undefined}
            disabled={busy}
            onSelect={applyFile}
          />

          <div>
            <label className="block text-sm font-medium text-label mb-1.5">
              Description <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="Brief description of what this lesson note covers..."
              disabled={busy}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none disabled:opacity-60"
              {...register("description")}
            />
          </div>

          {uploadMutation.isError && (
            <p className="text-xs text-danger">{uploadMutation.error.message}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="md" type="button" onClick={onClose} disabled={busy} className="flex-1">
              Cancel
            </Button>
            <div className="flex-1">
              <SubmitButton label="Upload Note" isLoading={busy} />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}