import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";

import { resultSetupSchema, type ResultSetupValues } from "../../schemas";
import { classOptions, subjectOptions, termOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  isLoading: boolean;
  onLoad: (values: ResultSetupValues) => void;
}

export default function ResultSetupForm({ isLoading, onLoad }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultSetupValues>({
    resolver: zodResolver(resultSetupSchema),
    defaultValues: { classId: "", subjectId: "", term: "" },
  });

  return (
    <form onSubmit={handleSubmit(onLoad)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormSelect label="Class" placeholder="Select Class" options={classOptions} error={errors.classId?.message} isLoading={isLoading} {...register("classId")} />
        <FormSelect label="Subject" placeholder="Select Subject" options={subjectOptions} error={errors.subjectId?.message} isLoading={isLoading} {...register("subjectId")} />
        <FormSelect label="Term" placeholder="Select Term" options={termOptions} error={errors.term?.message} isLoading={isLoading} {...register("term")} />
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-border-line02 bg-bg-input px-4 py-3 text-body-small text-text-secondary">
        <Info size={16} className="mt-0.5 shrink-0 text-brand-primary" />
        <p>
          Scores are entered as: <span className="text-purple-600 font-medium">Assignment /30</span> +{" "}
          <span className="text-blue-600 font-medium">Test /20</span> +{" "}
          <span className="text-amber-600 font-medium">Exam /50</span> ={" "}
          <span className="font-medium text-text-primary">Total /100</span>. Totals and grades are auto-calculated.
        </p>
      </div>

      <SubmitButton label="Load Students" isLoading={isLoading} className="w-50"/>
    </form>
  );
}