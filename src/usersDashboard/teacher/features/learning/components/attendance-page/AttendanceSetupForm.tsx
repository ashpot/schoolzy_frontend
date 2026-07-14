import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck } from "lucide-react";
import { attendanceSetupSchema, type AttendanceSetupValues } from "../../schemas";
import { classOptions, groupOptions } from "../../data/mockData";
import SubmitButton from "@/shared/ui/SubmitButton";

function formatLongDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export default function AttendanceSetupForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: AttendanceSetupValues) => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AttendanceSetupValues>({
    resolver: zodResolver(attendanceSetupSchema),
    defaultValues: { classId: "", groupId: "", date: "" },
  });

  const dateValue = watch("date");

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <CalendarCheck size={16} className="text-brand-primary" />
        </span>
        <h2 className="section-title">Attendance Setup</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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
          <label className="block text-sm font-medium text-label mb-1.5">Class Group *</label>
          <select {...register("groupId")} className="select-field w-full">
            <option value="">Select group</option>
            {groupOptions.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
          {errors.groupId && <p className="text-xs text-danger mt-1">{errors.groupId.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-label mb-1.5">Date *</label>
          <input type="date" {...register("date")} className="select-field w-full" />
          {dateValue && <p className="text-xs text-text-muted mt-1.5">{formatLongDate(dateValue)}</p>}
          {errors.date && <p className="text-xs text-danger mt-1">{errors.date.message}</p>}
        </div>

        <SubmitButton label="Load Students" isLoading={isLoading} />
      </form>
    </div>
  );
}