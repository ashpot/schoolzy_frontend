import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, Lock } from "lucide-react";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import Button from "@/shared/ui/Button";
import { resultSetupSchema, type ResultSetupValues } from "../../schemas/uploadResults";
import { useResultSetupOptions } from "../../hooks/useUploadResults";

interface ResultSetupProps {
  locked: boolean;
  isLoading: boolean;
  error?: string;
  onLoad: (values: ResultSetupValues) => void;
  onChangeSetup: () => void;
}

export default function ResultSetup({ locked, isLoading, error, onLoad, onChangeSetup }: ResultSetupProps) {
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } =
    useForm<ResultSetupValues>({
      resolver: zodResolver(resultSetupSchema),
      defaultValues: { term: "", classGroup: "", subject: "" },
    });

  const classGroup = watch("classGroup");
  const opts = useResultSetupOptions(classGroup);
  const busy = isLoading || locked || opts.loading;

  // Pre-select the active term (sorted first) once the options arrive
  useEffect(() => {
    if (opts.termOptions[0] && !getValues("term")) setValue("term", opts.termOptions[0].value);
  }, [opts.termOptions.length]);

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <ClipboardList size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Result Setup</h2>
      </div>

      <form onSubmit={handleSubmit(onLoad)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelect
            label="Term *"
            placeholder="Select term"
            options={opts.termOptions}
            error={errors.term?.message}
            isLoading={busy}
            {...register("term")}
          />
          <FormSelect
            label="Class Group *"
            placeholder="Select class group"
            options={opts.groupOptions}
            error={errors.classGroup?.message}
            isLoading={busy}
            {...register("classGroup", { onChange: () => setValue("subject", "") })}
          />
          <FormSelect
            label="Subject *"
            placeholder={classGroup ? "Select subject" : "Select a class group first"}
            options={opts.subjectOptions}
            error={errors.subject?.message}
            isLoading={busy}
            {...register("subject")}
          />
        </div>

        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-border-line02 text-xs text-text-secondary">
          <span className="mt-0.5 shrink-0">ⓘ</span>
          <span>
            Each score is out of its assessment's maximum and counts toward the term total by its percentage.
            Totals and grades are previews. Use <strong className="text-text-primary">Enter</strong> to move down a
            column and <strong className="text-text-primary">Tab</strong> to move across.
          </span>
        </div>

        {error && <p className="text-xs text-danger">{error}</p>}

        {locked ? (
          <div className="flex items-center gap-3 flex-wrap">
            <Button type="button" variant="outline" size="md" leftIcon={<Lock size={14} />} onClick={onChangeSetup}>
              Change setup
            </Button>
            <span className="text-xs text-text-muted">Setup is locked while you enter scores</span>
          </div>
        ) : (
          <SubmitButton label="Load Scoresheet" isLoading={isLoading} className="sm:w-56" />
        )}
      </form>
    </div>
  );
}