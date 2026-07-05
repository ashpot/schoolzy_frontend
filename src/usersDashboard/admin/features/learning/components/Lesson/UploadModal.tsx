import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, FileText } from "lucide-react";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import { useUploadLessonNote } from "../../hooks/useLearning";
import { uploadLessonNoteSchema, type UploadLessonNoteValues } from "../../schemas";
import { classOptions, subjectOptions, teacherOptions } from "../../data/mockData";
import { modalVariant } from "../../animations/variants";



interface UploadModalProps {
  onClose: () => void;
}

export default function UploadModal({ onClose }: UploadModalProps) {
  const uploadMutation = useUploadLessonNote();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UploadLessonNoteValues>({
    resolver: zodResolver(uploadLessonNoteSchema),
    defaultValues: { title: "", class: "", subject: "", teacher: "", description: "" },
  });

  const applyFile = useCallback(
    (file: File) => {
      setSelectedFile(file);
      const dt = new DataTransfer();
      dt.items.add(file);
      setValue("file", dt.files, { shouldValidate: true });
    },
    [setValue]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) applyFile(file);
  };

  const onSubmit = (values: UploadLessonNoteValues) => {
    uploadMutation.mutate(values, { onSuccess: onClose });
  };

  const dropZoneClass = dragOver
    ? "border-[var(--color-brand-primary)] bg-blue-50"
    : selectedFile
    ? "border-green-400 bg-green-50"
    : errors.file
    ? "border-[var(--color-danger)] bg-red-50"
    : "border-border-line02 bg-[var(--color-bg-input)] hover:border-[var(--color-brand-primary)] hover:bg-blue-50";

  return (
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
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border-line02">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex-center">
              <Upload className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-nav">
                Upload Lesson Note
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Fill in the details below to add a new note
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 transition-colors text-text-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 space-y-4">
          <FormInput
            label="Title"
            placeholder="e.g. Introduction to Quadratic Equations"
            required
            isLoading={uploadMutation.isPending}
            error={errors.title?.message}
            {...register("title")}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Class"
              placeholder="Select class..."
              options={classOptions}
              required
              isLoading={uploadMutation.isPending}
              error={errors.class?.message}
              {...register("class")}
            />
            <FormSelect
              label="Subject"
              placeholder="Select subject..."
              options={subjectOptions}
              required
              isLoading={uploadMutation.isPending}
              error={errors.subject?.message}
              {...register("subject")}
            />
          </div>

          <FormSelect
            label="Teacher"
            placeholder="Select teacher..."
            options={teacherOptions}
            required
            isLoading={uploadMutation.isPending}
            error={errors.teacher?.message}
            {...register("teacher")}
          />

          {/* File Drop Zone */}
          <div>
            <label className="block text-sm font-medium text-label mb-1.5">
              File <span className="text-danger">*</span>
            </label>
            <div
              onClick={() => !uploadMutation.isPending && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dropZoneClass}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) applyFile(f); }}
                disabled={uploadMutation.isPending}
              />
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-green-700">{selectedFile.name}</p>
                  <p className="text-xs text-green-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex-center">
                    <Upload className="w-5 h-5 text-brand-primary" />
                  </div>
                  <p className="text-sm text-text-secondary">
                    Drop file here or{" "}
                    <span className="text-brand-primary font-medium">
                      click to browse
                    </span>
                  </p>
                  <p className="text-xs text-text-muted">
                    PDF, DOC, DOCX, PPT — max 20 MB
                  </p>
                </div>
              )}
            </div>
            {errors.file && (
              <p className="mt-1 text-xs text-danger">
                {errors.file.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-label mb-1.5">
              Description{" "}
              <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="Brief description of what this lesson note covers..."
              disabled={uploadMutation.isPending}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all resize-none disabled:opacity-60"
              {...register("description")}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={onClose}
              disabled={uploadMutation.isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <div className="flex-1">
              <SubmitButton label="Upload Note" isLoading={uploadMutation.isPending} />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}