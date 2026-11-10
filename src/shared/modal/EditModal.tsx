import { useEffect, useState } from "react";
import { useForm, type FieldValues, type DefaultValues, type Path } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormInput from "@/shared/ui/FormInput";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";

export interface EditField<T> {
  key: keyof T;
  label: string;
  type?: "text" | "number" | "date" | "email" | "checkbox";
  hint?: string; // small helper text, used by checkbox fields
}

interface EditModalProps<T extends FieldValues> {
  isOpen: boolean;
  title: string;
  fields: EditField<T>[];
  initialData: T | null;
  isSaving?: boolean;
  // May return a promise: if it rejects, the modal stays open and shows the error
  onSave: (updated: T) => void | Promise<unknown>;
  onCancel: () => void;
}

export default function EditModal<T extends FieldValues>({
  isOpen,
  title,
  fields,
  initialData,
  isSaving,
  onSave,
  onCancel,
}: EditModalProps<T>) {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm<T>({
    defaultValues: (initialData ?? undefined) as DefaultValues<T> | undefined,
  });

  // Re-sync form values (and clear any old error) whenever a different row is opened
  useEffect(() => {
    if (initialData) reset(initialData as DefaultValues<T>);
    setError("");
  }, [initialData, reset]);

  const onSubmit = async (values: T) => {
    setError("");
    try {
      await onSave({ ...initialData, ...values } as T);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save changes. Please try again.");
    }
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
            onClick={isSaving ? undefined : onCancel}
          />
          <motion.div
            variants={modalVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border-line02">
              <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex-center">
                <Pencil size={16} className="text-brand-primary" />
              </div>
              <h2 className="section-title">Edit {title}</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-5 space-y-4">
              {fields.map((field) =>
                field.type === "checkbox" ? (
                  <label
                    key={String(field.key)}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border-line02 bg-bg-input px-3.5 py-3 cursor-pointer"
                  >
                    <span>
                      <span className="block text-sm font-medium text-label">{field.label}</span>
                      {field.hint && (
                        <span className="block text-xs text-text-muted mt-0.5">{field.hint}</span>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      disabled={isSaving}
                      className="h-4 w-4 shrink-0 accent-brand-primary disabled:opacity-50"
                      {...register(field.key as Path<T>)}
                    />
                  </label>
                ) : (
                  <FormInput
                    key={String(field.key)}
                    label={field.label}
                    type={field.type ?? "text"}
                    isLoading={isSaving}
                    {...register(field.key as Path<T>)}
                  />
                )
              )}

              {error && (
                <p className="text-xs text-danger bg-danger/10 rounded-lg px-3 py-2 wrap-break-word">
                  {error}
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSaving}
                  className="flex-1 py-2.5 rounded-lg border border-border-line02 text-text-secondary text-sm font-medium hover:bg-bg-soft transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <div className="flex-1">
                  <SubmitButton label="Save Changes" isLoading={isSaving} />
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}