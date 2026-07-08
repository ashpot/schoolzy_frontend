import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import { checkResultSchema, type CheckResultValues } from "../../schemas";
import { childOptions, sessionOptions, termOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import type { ResultSheet } from "../../types";
import { useLoadResult } from "../../hooks/useResults";

export default function ResultFilterForm({ onLoaded }: { onLoaded: (result: ResultSheet) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckResultValues>({
    resolver: zodResolver(checkResultSchema),
    defaultValues: { childId: "", session: "", term: "" },
  });

  const mutation = useLoadResult();

  const onSubmit = (values: CheckResultValues) => {
    mutation.mutate(values, { onSuccess: (data) => onLoaded(data) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-bg-input flex-center">
          <FileText size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Check Child Result</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormSelect
          label="Select Child"
          error={errors.childId?.message}
          isLoading={mutation.isPending}
          options={childOptions}
          placeholder="Choose a child"
          {...register("childId")}
        />
        <FormSelect
          label="Select Session"
          error={errors.session?.message}
          isLoading={mutation.isPending}
          options={sessionOptions}
          placeholder="Choose a session"
          {...register("session")}
        />
        <FormSelect
          label="Select Term"
          error={errors.term?.message}
          isLoading={mutation.isPending}
          options={termOptions}
          placeholder="Choose a term"
          {...register("term")}
        />

        <div className="md:col-span-3">
          <SubmitButton label="Load Result" isLoading={mutation.isPending} />
        </div>
      </form>
    </div>
  );
}