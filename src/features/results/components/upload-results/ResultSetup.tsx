import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, Users, RotateCcw } from "lucide-react";
import { resultSetupSchema, type ResultSetupValues } from "../../schemas/uploadResults";
import { classOptions, classGroupOptions, subjectOptions } from "../../data/mockData";
import { useLoadResultStudents } from "../../hooks/useUploadResults";
import type { Student } from "../../types";
import FormSelect from "@/shared/ui/FormSelect";
import Button     from "@/shared/ui/Button";
import FilterPill from "../shared/FilterPill";

interface Props {
  isLoaded:     boolean;
  activeSetup:  ResultSetupValues | null;
  classLabel:   string;
  groupLabel:   string;
  subjectLabel: string;
  onLoad:       (setup: ResultSetupValues, students: Student[]) => void;
  onClear:      () => void;
}

export default function ResultSetup({ isLoaded, activeSetup, classLabel, groupLabel, subjectLabel, onLoad, onClear }: Props) {
  const loadStudents = useLoadResultStudents();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ResultSetupValues>({
    resolver: zodResolver(resultSetupSchema),
    defaultValues: { class: "", classGroup: "", subject: "" },
  });

  const onSubmit    = (v: ResultSetupValues) => loadStudents.mutate(v, { onSuccess: (s) => onLoad(v, s) });
  const handleClear = () => { reset(); onClear(); };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <ClipboardList size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Result Setup</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelect label="Class *"       error={errors.class?.message}      isLoading={loadStudents.isPending} options={classOptions}      placeholder="Select class"   {...register("class")}      />
          <FormSelect label="Class Group *" error={errors.classGroup?.message} isLoading={loadStudents.isPending} options={classGroupOptions} placeholder="Select group"   {...register("classGroup")} />
          <FormSelect label="Subject *"     error={errors.subject?.message}    isLoading={loadStudents.isPending} options={subjectOptions}    placeholder="Select subject" {...register("subject")}    />
        </div>

        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-border-line02 text-xs text-text-secondary">
          <span className="mt-0.5 shrink-0">ⓘ</span>
          <span>
            Scores are entered as:
            <strong className="text-purple-600">Assignment /30</strong> + <strong className="text-blue-600">Test /20</strong> + <strong className="text-amber-600">Exam /50</strong> = <strong className="text-text-primary">Total /100</strong>. Totals and grades are auto-calculated. Use <strong className="text-text-primary">Enter</strong> or <strong className="text-text-primary">Tab</strong> to navigate quickly.
          </span>
        </div>

        {isLoaded && activeSetup && (
          <div className="flex flex-wrap gap-2">
            <FilterPill label={`${classLabel} ${groupLabel}`} color="blue"   />
            <FilterPill label={subjectLabel}                  color="purple" />
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary" leftIcon={<Users size={16} />} isLoading={loadStudents.isPending}>Load Students</Button>
          {isLoaded && <Button type="button" variant="ghost" leftIcon={<RotateCcw size={14} />} onClick={handleClear}>Clear All</Button>}
        </div>
      </form>
    </div>
  );
}