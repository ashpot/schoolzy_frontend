import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { viewResultsSearchSchema, type ViewResultsSearchValues } from "../../schemas";
import { classOptions, mockStudents, termOptions, sessionOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  isLoading: boolean;
  onSearch: (values: ViewResultsSearchValues) => void;
}

export default function ResultSearchForm({ isLoading, onSearch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViewResultsSearchValues>({
    resolver: zodResolver(viewResultsSearchSchema),
    defaultValues: { classId: "", studentId: "", term: "", session: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSearch)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormSelect label="Class" placeholder="Select Class" options={classOptions} error={errors.classId?.message} isLoading={isLoading} {...register("classId")} />
        <FormSelect
          label="Student"
          placeholder="Select Student"
          options={mockStudents.map((s) => ({ value: s.id, label: s.name }))}
          error={errors.studentId?.message}
          isLoading={isLoading}
          {...register("studentId")}
        />
        <FormSelect label="Term" placeholder="Select Term" options={termOptions} error={errors.term?.message} isLoading={isLoading} {...register("term")} />
        <FormSelect label="Session" placeholder="Select Session" options={sessionOptions} error={errors.session?.message} isLoading={isLoading} {...register("session")} />
      </div>
      <SubmitButton label="Load Result" isLoading={isLoading} className="w-50" />
    </form>
  );
}