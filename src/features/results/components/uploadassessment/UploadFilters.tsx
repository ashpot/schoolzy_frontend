import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, Users, RotateCcw } from "lucide-react";
import { uploadFilterSchema, type UploadFilterValues } from "../../schemas/uploadAssessment";
import type { Student } from "../../types";
import { useLoadStudents } from "../../hooks/useUploadAssessment";
import FormSelect from "@/shared/ui/FormSelect";
import { assessmentTypeOptions, classGroupOptions, classOptions, subjectOptions } from "../../data/mockData";
import FilterPills from "./FilterPills";
import Button from "@/shared/ui/Button";
// import { uploadFilterSchema, type UploadFilterValues } from "../../schemas/uploadAssessment";
// import { classOptions, classGroupOptions, subjectOptions, assessmentTypeOptions } from "../../data/mockData";
// import { useLoadStudents } from "../../hooks/useUploadAssessment";
// import type { Student } from "../../types";
// import FormSelect  from "@/shared/ui/FormSelect";
// import Button      from "@/shared/ui/Button";
// import FilterPills from "./FilterPills";

interface Props {
  isLoaded:      boolean;
  activeFilters: UploadFilterValues | null;
  maxScore:      number;
  onLoad:  (filters: UploadFilterValues, students: Student[]) => void;
  onClear: () => void;
}

export default function UploadFilters({ isLoaded, activeFilters, maxScore, onLoad, onClear }: Props) {
  const loadStudents = useLoadStudents();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UploadFilterValues>({
    resolver: zodResolver(uploadFilterSchema),
    defaultValues: { class: "", classGroup: "", subject: "", assessmentType: "" },
  });

  const onSubmit = (values: UploadFilterValues) => {
    loadStudents.mutate(values, {
      onSuccess: (students) => onLoad(values, students),
    });
  };

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <ClipboardList size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Upload Filters</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormSelect
            label="Class *"
            error={errors.class?.message}
            isLoading={loadStudents.isPending}
            options={classOptions}
            placeholder="Select class"
            {...register("class")}
          />
          <FormSelect
            label="Class Group *"
            error={errors.classGroup?.message}
            isLoading={loadStudents.isPending}
            options={classGroupOptions}
            placeholder="Select group"
            {...register("classGroup")}
          />
          <FormSelect
            label="Subject *"
            error={errors.subject?.message}
            isLoading={loadStudents.isPending}
            options={subjectOptions}
            placeholder="Select subject"
            {...register("subject")}
          />
          <FormSelect
            label="Assessment Type *"
            error={errors.assessmentType?.message}
            isLoading={loadStudents.isPending}
            options={assessmentTypeOptions}
            placeholder="Select type"
            {...register("assessmentType")}
          />
        </div>

        {isLoaded && activeFilters && (
          <FilterPills filters={activeFilters} maxScore={maxScore} />
        )}

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            leftIcon={<Users size={16} />}
            isLoading={loadStudents.isPending}
          >
            Load Students
          </Button>
          {isLoaded && (
            <Button
              type="button"
              variant="ghost"
              leftIcon={<RotateCcw size={14} />}
              onClick={handleClear}
            >
              Clear All
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}