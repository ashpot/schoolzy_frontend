import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { FormSelect, SubmitButton } from "@/shared/ui";
import { uploadResultsFiltersSchema, type UploadResultsFiltersValues } from "../../schemas";
import { classOptions, subjectOptions, termOptions, assessmentTypeOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  isLoading: boolean;
  onLoad: (values: UploadResultsFiltersValues) => void;
}

export default function UploadResultsFiltersForm({ isLoading, onLoad }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadResultsFiltersValues>({
    resolver: zodResolver(uploadResultsFiltersSchema),
    defaultValues: { classId: "", subjectId: "", assessmentType: "", term: "" },
  });

  const values = watch();
  const selectedType = assessmentTypeOptions.find((a) => a.value === values.assessmentType);

  return (
    <form onSubmit={handleSubmit(onLoad)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormSelect label="Class" placeholder="Select Class" options={classOptions} error={errors.classId?.message} isLoading={isLoading} {...register("classId")} />
        <FormSelect label="Subject" placeholder="Select Subject" options={subjectOptions} error={errors.subjectId?.message} isLoading={isLoading} {...register("subjectId")} />
        <FormSelect
          label="Assessment Type"
          placeholder="Select Type"
          options={assessmentTypeOptions.map((a) => ({ value: a.value, label: `${a.label} (Max: ${a.maxScore})` }))}
          error={errors.assessmentType?.message}
          isLoading={isLoading}
          {...register("assessmentType")}
        />
        <FormSelect label="Term" placeholder="Select Term" options={termOptions} error={errors.term?.message} isLoading={isLoading} {...register("term")} />
      </div>

      {selectedType && (
        <div className="flex flex-wrap gap-2">
          {values.classId && <span className="text-xs px-3 py-1 rounded-full bg-bg-input text-text-secondary">{classOptions.find((c) => c.value === values.classId)?.label}</span>}
          {values.subjectId && <span className="text-xs px-3 py-1 rounded-full bg-bg-input text-text-secondary">{subjectOptions.find((s) => s.value === values.subjectId)?.label}</span>}
          <span className="text-xs px-3 py-1 rounded-full bg-bg-input text-text-secondary">{selectedType.label}</span>
          <span className="text-xs px-3 py-1 rounded-full bg-bg-input text-text-secondary">Max Score: {selectedType.maxScore}</span>
        </div>
      )}

      <SubmitButton label="Load Students" isLoading={isLoading} className="w-50"/>
    </form>
  );
}