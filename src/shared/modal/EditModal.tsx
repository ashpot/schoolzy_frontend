import { useEffect } from "react";
import { useForm, type FieldValues, type DefaultValues, type Path } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormInput from "@/shared/ui/FormInput";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";

export interface EditField<T> {
  key: keyof T;
  label: string;
  type?: "text" | "number" | "date" | "email";
}

interface EditModalProps<T extends FieldValues> {
  isOpen: boolean;
  title: string;
  fields: EditField<T>[];
  initialData: T | null;
  isSaving?: boolean;
  onSave: (updated: T) => void;
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
  const { register, handleSubmit, reset } = useForm<T>({
    defaultValues: (initialData ?? undefined) as DefaultValues<T> | undefined,
  });

  // Re-sync form values whenever a different row is opened for editing
  useEffect(() => {
    if (initialData) reset(initialData as DefaultValues<T>);
  }, [initialData, reset]);

  const onSubmit = (values: T) => {
    // TODO: Replace with actual API call to persist the edited row
    // return api.patch(`/endpoint/${initialData?.id}`, values);
    onSave({ ...initialData, ...values } as T);
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
            onClick={onCancel}
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
              {fields.map((field) => (
                <FormInput
                  key={String(field.key)}
                  label={field.label}
                  type={field.type ?? "text"}
                  isLoading={isSaving}
                  {...register(field.key as Path<T>)}
                />
              ))}

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