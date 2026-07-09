import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart3 } from "lucide-react";
// import { FormHeader, FormSelect, SubmitButton } from "@/shared/ui";
import { checkResultSchema, type CheckResultValues } from "../../schemas";
import { termOptions, sessionOptions } from "../../data/mockData";
import FormHeader from "@/shared/ui/FormHeader";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  onCheck: (values: CheckResultValues) => void;
  isLoading: boolean;
}

export default function CheckResultForm({ onCheck, isLoading }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<CheckResultValues>({
    resolver: zodResolver(checkResultSchema),
    defaultValues: { term: "", session: "" },
  });

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={BarChart3} title="Check Result" />
      <p className="text-body-small text-text-secondary mt-1 mb-5">
        Select a term and session to view your result sheet.
      </p>
      <form onSubmit={handleSubmit(onCheck)} noValidate className="flex flex-col sm:flex-row sm:items-end gap-4">
        <Controller
          control={control}
          name="term"
          render={({ field }) => (
            <FormSelect label="Select Term" placeholder="Choose term" options={termOptions}
              error={errors.term?.message} isLoading={isLoading} {...field} />
          )}
        />
        <Controller
          control={control}
          name="session"
          render={({ field }) => (
            <FormSelect label="Select Session" placeholder="Choose session" options={sessionOptions}
              error={errors.session?.message} isLoading={isLoading} {...field} />
          )}
        />
        <SubmitButton label="Check Result" isLoading={isLoading}/>
      </form>
    </div>
  );
}