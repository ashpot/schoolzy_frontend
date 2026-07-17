import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { FormSelect, SubmitButton } from "@/shared/ui";
import { viewSubjectResultFiltersSchema, type ViewSubjectResultFiltersValues } from "../../schemas";
import { subjectOptions, classOptions, termOptions, sessionOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  isLoading: boolean;
  onLoad: (values: ViewSubjectResultFiltersValues) => void;
}

export default function SubjectResultFilterForm({ isLoading, onLoad }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViewSubjectResultFiltersValues>({
    resolver: zodResolver(viewSubjectResultFiltersSchema),
    defaultValues: { subjectId: "", classId: "", term: "", session: "" },
  });

  return (
    <form onSubmit={handleSubmit(onLoad)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormSelect label="Subject" placeholder="Select Subject" options={subjectOptions} error={errors.subjectId?.message} isLoading={isLoading} {...register("subjectId")} />
        <FormSelect label="Class" placeholder="Select Class" options={classOptions} error={errors.classId?.message} isLoading={isLoading} {...register("classId")} />
        <FormSelect label="Term" placeholder="Select Term" options={termOptions} error={errors.term?.message} isLoading={isLoading} {...register("term")} />
        <FormSelect label="Session" placeholder="Select Session" options={sessionOptions} error={errors.session?.message} isLoading={isLoading} {...register("session")} />
      </div>
      <SubmitButton label="Load Results" isLoading={isLoading} className="w-50"/>
    </form>
  );
}