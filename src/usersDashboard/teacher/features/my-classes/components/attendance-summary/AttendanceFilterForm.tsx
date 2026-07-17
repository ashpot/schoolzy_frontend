import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart3, RotateCcw } from "lucide-react";
import { attendanceFilterSchema, type AttendanceFilterValues } from "../../schemas";
import { classOptions, groupOptions, termOptions } from "../../data/mockData";
import SubmitButton from "@/shared/ui/SubmitButton";

export default function AttendanceFilterForm({
  onSubmit,
  onReset,
  isLoading,
}: {
  onSubmit: (values: AttendanceFilterValues) => void;
  onReset: () => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttendanceFilterValues>({
    resolver: zodResolver(attendanceFilterSchema),
    defaultValues: { classId: "", groupId: "", termId: "", session: "2025/2026" },
  });

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
            <BarChart3 size={16} className="text-brand-primary" />
          </span>
          <h2 className="section-title">Attendance Filters</h2>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 text-body-small text-text-secondary hover:text-brand-primary transition-colors"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-wrap items-end gap-4">
        <Field label="Class">
          <select {...register("classId")} className="select-field">
            <option value="">Select class</option>
            {classOptions.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.classId && <p className="text-xs text-danger mt-1">{errors.classId.message}</p>}
        </Field>

        <Field label="Class Group">
          <select {...register("groupId")} className="select-field">
            <option value="">Select group</option>
            {groupOptions.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
          {errors.groupId && <p className="text-xs text-danger mt-1">{errors.groupId.message}</p>}
        </Field>

        <Field label="Term">
          <select {...register("termId")} className="select-field">
            <option value="">Select term</option>
            {termOptions.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {errors.termId && <p className="text-xs text-danger mt-1">{errors.termId.message}</p>}
        </Field>

        <Field label="Session">
          <input
            {...register("session")}
            readOnly
            className="select-field bg-bg-input text-text-secondary"
          />
        </Field>

        <SubmitButton label="Load Summary" isLoading={isLoading} />
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-label mb-1.5">{label}</label>
      {children}
    </div>
  );
}