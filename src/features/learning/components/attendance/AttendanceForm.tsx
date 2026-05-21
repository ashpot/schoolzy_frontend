import { CalendarCheck } from "lucide-react";

// Type-only imports
import type {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import type { LoadAttendanceValues } from "../../schemas";
import { classOptions, classGroupOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface AttendanceFormProps {
  register: UseFormRegister<LoadAttendanceValues>;
  handleSubmit: UseFormHandleSubmit<LoadAttendanceValues>;
  watch: UseFormWatch<LoadAttendanceValues>;
  errors: FieldErrors<LoadAttendanceValues>;
  isLoading: boolean;
  onSubmit: (values: LoadAttendanceValues) => void;
  formattedDate: string | null;
}

export function AttendanceForm({
  register,
  handleSubmit,
  errors,
  isLoading,
  onSubmit,
  formattedDate,
}: AttendanceFormProps) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <CalendarCheck className="w-4 h-4 text-brand-primary" />
        </div>
        <h2 className="text-sm font-semibold text-text-nav">
          Attendance Setup
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
            className={`w-full px-3 py-2.5 rounded-xl border bg-bg-input text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all disabled:opacity-60 ${
              errors.date
                ? "border-danger"
                : "border-border-line02"
            }`}
            {...register("date")}
          />
          {formattedDate && !errors.date && (
            <p className="mt-1 text-xs text-text-muted">
              {formattedDate}
            </p>
          )}
          {errors.date && (
            <p className="mt-1 text-xs text-danger">
              {errors.date.message}
            </p>
          )}
        </div>

        <SubmitButton label="Load Students" isLoading={isLoading} />
      </form>
    </div>
  );
}