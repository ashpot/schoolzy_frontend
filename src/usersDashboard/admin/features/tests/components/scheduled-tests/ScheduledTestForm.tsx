import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarClock } from "lucide-react";
import { scheduleTestSchema, type ScheduleTestValues } from "../../schemas";
import { useScheduleTest } from "../../hooks/useTests";
import { classOptions, classGroupOptions, testSelectOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  onScheduled: () => void;
}

export default function ScheduledTestForm({ onScheduled }: Props) {
  const scheduleMutation = useScheduleTest();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ScheduleTestValues>({
    resolver: zodResolver(scheduleTestSchema),
    defaultValues: { test: "", class: "", classGroup: "", dateScheduled: "" },
  });

  const dateValue     = watch("dateScheduled");
  const formattedDate = dateValue
    ? new Date(dateValue).toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })
    : null;

  const onSubmit = (values: ScheduleTestValues) => {
    scheduleMutation.mutate(values, {
      onSuccess: () => {
        onScheduled();
        reset({ test: "", class: "", classGroup: "", dateScheduled: "" });
      },
    });
  };

  const isLoading = scheduleMutation.isPending;

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-md bg-blue-50 flex-center">
          <CalendarClock className="w-3.5 h-3.5 text-brand-primary" />
        </div>
        <h2 className="text-sm font-semibold text-text-nav">
          Schedule a Test
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid grid-cols-4 gap-4">
          <FormSelect
            label="Test"
            placeholder="Select Test"
            options={testSelectOptions}
            required
            isLoading={isLoading}
            error={errors.test?.message}
            {...register("test")}
          />
          <FormSelect
            label="Class"
            placeholder="Select Class"
            options={classOptions}
            required
            isLoading={isLoading}
            error={errors.class?.message}
            {...register("class")}
          />
          <FormSelect
            label="Class Group (Optional)"
            placeholder="Class Group"
            options={classGroupOptions}
            isLoading={isLoading}
            error={errors.classGroup?.message}
            {...register("classGroup")}
          />

          {/* Date Scheduled */}
          <div>
            <label className="block text-sm font-medium text-label mb-1.5">
              Date Scheduled <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              disabled={isLoading}
              className={`w-full px-3 py-2.5 rounded-xl border bg-bg-input text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all disabled:opacity-60 ${
                errors.dateScheduled
                  ? "border-danger"
                  : "border-border-line02"
              }`}
              {...register("dateScheduled")}
            />
            {formattedDate && !errors.dateScheduled && (
              <p className="mt-1 text-xs text-text-muted">{formattedDate}</p>
            )}
            {errors.dateScheduled && (
              <p className="mt-1 text-xs text-danger">{errors.dateScheduled.message}</p>
            )}
          </div>
        </div>

        <div className="pt-1">
          <SubmitButton label="Schedule Test" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}