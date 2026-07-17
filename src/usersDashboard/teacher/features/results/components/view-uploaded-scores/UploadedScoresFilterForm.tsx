import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { FormSelect, SubmitButton } from "@/shared/ui";
import { viewUploadedScoresFiltersSchema, type ViewUploadedScoresFiltersValues } from "../../schemas";
import { classOptions, subjectOptions, termOptions, sessionOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  isLoading: boolean;
  onLoad: (values: ViewUploadedScoresFiltersValues) => void;
}

export default function UploadedScoresFilterForm({ isLoading, onLoad }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViewUploadedScoresFiltersValues>({
    resolver: zodResolver(viewUploadedScoresFiltersSchema),
    defaultValues: { classId: "", subjectId: "", term: "", session: "" },
  });

  return (
    <form onSubmit={handleSubmit(onLoad)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormSelect label="Class" placeholder="Select Class" options={classOptions} error={errors.classId?.message} isLoading={isLoading} {...register("classId")} />
        <FormSelect label="Subject" placeholder="Select Subject" options={subjectOptions} error={errors.subjectId?.message} isLoading={isLoading} {...register("subjectId")} />
        <FormSelect label="Term" placeholder="Select Term" options={termOptions} error={errors.term?.message} isLoading={isLoading} {...register("term")} />
        <FormSelect label="Session" placeholder="Select Session" options={sessionOptions} error={errors.session?.message} isLoading={isLoading} {...register("session")} />
      </div>
      <SubmitButton label="Load Scores" isLoading={isLoading} className="w-50" />

      <div className="flex flex-wrap gap-2 pt-1">
        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-bg-input text-text-secondary">Read-only view</span>
        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-bg-input text-text-secondary">CSV & PDF export</span>
        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-bg-input text-text-secondary">Grade breakdown</span>
      </div>
    </form>
  );
}