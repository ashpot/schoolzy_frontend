import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadOmittedFiltersSchema, type UploadOmittedFiltersValues } from "../../schemas";
import { classOptions, subjectOptions, termOptions, assessmentTypeOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  isLoading: boolean;
  onLoad: (values: UploadOmittedFiltersValues) => void;
}

export default function OmittedFiltersForm({ isLoading, onLoad }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadOmittedFiltersValues>({
    resolver: zodResolver(uploadOmittedFiltersSchema),
    defaultValues: { classId: "", subjectId: "", term: "", assessmentType: "" },
  });

  return (
    <form onSubmit={handleSubmit(onLoad)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormSelect label="Class" placeholder="Select Class" options={classOptions} error={errors.classId?.message} isLoading={isLoading} {...register("classId")} />
        <FormSelect label="Subject" placeholder="Select Subject" options={subjectOptions} error={errors.subjectId?.message} isLoading={isLoading} {...register("subjectId")} />
        <FormSelect label="Term" placeholder="Select Term" options={termOptions} error={errors.term?.message} isLoading={isLoading} {...register("term")} />
        <FormSelect
          label="Assessment Type"
          placeholder="Select Type"
          options={assessmentTypeOptions.map((a) => ({ value: a.value, label: a.label }))}
          error={errors.assessmentType?.message}
          isLoading={isLoading}
          {...register("assessmentType")}
        />
      </div>
      <SubmitButton label="Load Omitted Students" isLoading={isLoading} className="w-50"/>
    </form>
  );
}