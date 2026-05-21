import { useFormContext } from "react-hook-form";
import { CalendarCheck } from "lucide-react";
// import type { LoadAttendanceValues } from "../schemas";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
// import { classOptions, classGroupOptions } from "../data/mockData";
import type { LoadAttendanceValues } from "../../schemas";
import { classOptions, classGroupOptions } from "../../data/mockData";

interface AttendanceSetupFormProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AttendanceSetupForm({ isLoading, onSubmit }: AttendanceSetupFormProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<LoadAttendanceValues>();

  const dateValue = watch("date");
  const formattedDate = dateValue
    ? new Date(dateValue).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <CalendarCheck className="w-4 h-4 text-brand-primary" />
        </div>
        <h2 className="text-sm font-semibold text-text-nav">Attendance Setup</h2>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <FormSelect
          label="Class"
          placeholder="Select class"
          options={classOptions}
          required
          isLoading={isLoading}
          error={errors.class?.message}
          {...register("class")}
        />

        <FormSelect
          label="Class Group"
          placeholder="Select group"
          options={classGroupOptions}
          required
          isLoading={isLoading}
          error={errors.classGroup?.message}
          {...register("classGroup")}
        />

        <div>
          <label className="block text-sm font-medium text-label mb-1.5">
            Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            disabled={isLoading}
            className={`w-full px-3 py-2.5 rounded-xl border bg-bg-input text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all disabled:opacity-60 ${
              errors.date
                ? "border-[var(--color-danger)]"
                : "border-[var(--color-border-line02)]"
            }`}
            {...register("date")}
          />
          {formattedDate && !errors.date && (
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">{formattedDate}</p>
          )}
          {errors.date && (
            <p className="mt-1 text-xs text-[var(--color-danger)]">{errors.date.message}</p>
          )}
        </div>

        <SubmitButton label="Load Students" isLoading={isLoading} />
      </form>
    </div>
  );
}