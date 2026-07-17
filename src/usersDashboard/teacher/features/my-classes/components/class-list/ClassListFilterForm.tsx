import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import { classListFilterSchema, type ClassListFilterValues } from "../../schemas";
import { classOptions, termOptions } from "../../data/mockData";
import SubmitButton from "@/shared/ui/SubmitButton";

export default function ClassListFilterForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: ClassListFilterValues) => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassListFilterValues>({
    resolver: zodResolver(classListFilterSchema),
    defaultValues: { classId: "", termId: "" },
  });

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <Users size={16} className="text-brand-primary" />
        </span>
        <h2 className="section-title">View Class List</h2>
      </div>
      <p className="text-body-small text-text-secondary mb-5">
        Select a class to view enrolled students.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-xs text-text-muted uppercase tracking-wide mb-1.5">
            Select Class
          </label>
          <select
            {...register("classId")}
            className="px-3 py-2.5 text-sm rounded-xl border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 min-w-[160px]"
          >
            <option value="">Choose class</option>
            {classOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {errors.classId && <p className="text-xs text-danger mt-1">{errors.classId.message}</p>}
        </div>

        <div>
          <label className="block text-xs text-text-muted uppercase tracking-wide mb-1.5">
            Select Term
          </label>
          <select
            {...register("termId")}
            className="px-3 py-2.5 text-sm rounded-xl border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 min-w-[160px]"
          >
            <option value="">Choose term</option>
            {termOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.termId && <p className="text-xs text-danger mt-1">{errors.termId.message}</p>}
        </div>

        <SubmitButton label="Load Students" isLoading={isLoading} />
      </form>
    </div>
  );
}