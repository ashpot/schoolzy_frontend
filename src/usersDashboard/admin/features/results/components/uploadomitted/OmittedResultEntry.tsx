import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardCheck, RotateCcw } from "lucide-react";
import { assessmentTypeOptions, classOptions, subjectOptions } from "../../data/mockData";
import { useSaveOmittedResult } from "../../hooks/useUploadOmitted";
import type { LoadedRecord } from "../../types";
import FormSelect         from "@/shared/ui/FormSelect";
import Button             from "@/shared/ui/Button";
import SubmitButton       from "@/shared/ui/SubmitButton";
import StudentProfileCard from "./StudentProfileCard";
import GradeResultCard    from "./GradeResultCard";
import OmittedFooter      from "./OmittedFooter";
import { omittedScoreSchema, type OmittedScoreValues } from "../../schemas/uploadOmited";

function computeGrade(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100;
  if (pct >= 75) return "A";
  if (pct >= 65) return "B";
  if (pct >= 55) return "C";
  if (pct >= 40) return "D";
  return "F";
}

interface Props { record: LoadedRecord; }

export default function OmittedResultEntry({ record }: Props) {
  const saveResult = useSaveOmittedResult();

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<OmittedScoreValues>({
    resolver: zodResolver(omittedScoreSchema),
    defaultValues: { assessmentType: "", score: "" as unknown as number },
  });

  const watchedType  = watch("assessmentType");
  const watchedScore = watch("score");
  const maxScore     = assessmentTypeOptions.find((o) => o.value === watchedType)?.maxScore ?? 0;
  const numericScore = Number(watchedScore);
  const grade        = watchedType && !isNaN(numericScore) && numericScore >= 0 && maxScore > 0
    ? computeGrade(numericScore, maxScore)
    : null;

  const classLabel   = classOptions.find((o) => o.value === record.class)?.label     ?? record.class;
  const subjectLabel = subjectOptions.find((o) => o.value === record.subject)?.label ?? record.subject;

  const onSubmit = (values: OmittedScoreValues) => {
    saveResult.mutate({ record, scores: values });
  };

  const infoFields = [
    { label: "CLASS",   value: classLabel              },
    { label: "SUBJECT", value: subjectLabel             },
    { label: "STUDENT", value: record.student.name     },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
              <ClipboardCheck size={16} className="text-brand-primary" />
            </div>
            <h2 className="section-title">Omitted Result Entry</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Previously Omitted
          </span>
        </div>

        <div className="p-6 space-y-5">
          <StudentProfileCard record={record} />

          {/* Info fields */}
          <div className="grid grid-cols-3 gap-3">
            {infoFields.map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-border-line02 px-4 py-3">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm font-medium text-text-primary truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-border-line02" />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">Score Entry</span>
            <div className="flex-1 border-t border-border-line02" />
          </div>

          {/* Score form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <FormSelect
                label="Assessment Type *"
                error={errors.assessmentType?.message}
                isLoading={saveResult.isPending}
                options={assessmentTypeOptions}
                placeholder="Select assessment type"
                {...register("assessmentType")}
              />
              {watchedType && (
                <p className="mt-1.5 text-xs font-medium text-brand-primary">
                  Maximum score for this assessment: {maxScore}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-label mb-1.5">Score *</label>
                <input
                  type="number"
                  min={0}
                  max={maxScore || undefined}
                  placeholder="Enter score"
                  className="w-full px-4 py-3 text-base rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  {...register("score")}
                />
                {errors.score && (
                  <p className="mt-1 text-xs text-danger">{errors.score.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-label mb-1.5">Max Score</label>
                <input
                  type="number"
                  value={maxScore || ""}
                  readOnly
                  disabled
                  className="w-full px-4 py-3 text-base text-center font-medium rounded-lg border border-border-line02 bg-gray-100 text-text-primary cursor-not-allowed"
                />
              </div>
            </div>

            {grade && <GradeResultCard grade={grade} score={numericScore} maxScore={maxScore} />}

            <div className="flex justify-end gap-3 pt-1">
              <Button
                type="button"
                variant="ghost"
                leftIcon={<RotateCcw size={14} />}
                onClick={() => reset()}
                disabled={saveResult.isPending}
              >
                Reset
              </Button>
              <SubmitButton label="Save Result" isLoading={saveResult.isPending} />
            </div>
          </form>
        </div>
      </div>

      <OmittedFooter
        student={record.student}
        grade={grade}
        onSave={handleSubmit(onSubmit)}
        isLoading={saveResult.isPending}
      />
    </>
  );
}