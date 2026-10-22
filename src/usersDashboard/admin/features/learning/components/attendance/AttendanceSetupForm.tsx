import { useFormContext } from "react-hook-form";
import { CalendarCheck, Lock } from "lucide-react";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import Button from "@/shared/ui/Button";
import type { ClassGroupOption } from "../../types";
import type { LoadAttendanceValues } from "../../schemas";
import { formatLongDate } from "../../shared/utils/attendanceMapper";

interface AttendanceSetupFormProps {
  options: ClassGroupOption[];
  optionsLoading: boolean;
  isLoading: boolean;
  locked: boolean;
  date: string;
  error?: string;
  onSubmit: (e: React.FormEvent) => void;
  onChangeClass: () => void;
}

export default function AttendanceSetupForm({
  options, optionsLoading, isLoading, locked, date, error, onSubmit, onChangeClass,
}: AttendanceSetupFormProps) {
  const { register, formState: { errors } } = useFormContext<LoadAttendanceValues>();

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
          label="Class Group"
          placeholder={optionsLoading ? "Loading class groups..." : "Select class group"}
          options={options}
          required
          isLoading={isLoading || locked || optionsLoading}
          error={errors.classGroup?.message}
          {...register("classGroup")}
        />

        <div>
          <p className="text-xs font-semibold text-label tracking-wide mb-1">Date</p>
          <p className="text-sm text-text-primary">{formatLongDate(date)}</p>
          <p className="text-xs text-text-muted mt-0.5">Today's date is applied automatically</p>
        </div>

        {locked ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Lock className="w-3.5 h-3.5" />
              Class group is locked while you mark attendance
            </div>
            <Button type="button" variant="outline" size="md" onClick={onChangeClass} className="w-full">
              Change class group
            </Button>
          </div>
        ) : (
          <SubmitButton label="Load Students" isLoading={isLoading} />
        )}

        {error && <p className="text-xs text-danger">{error}</p>}
      </form>
    </div>
  );
}