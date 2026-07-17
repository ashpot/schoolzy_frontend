import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Hash } from "lucide-react";
import { termSchema, type TermValues } from "../../schemas";
import { useCreateTerm } from "../../hooks/useSessions";
import { sessionSelectOptions } from "../../data/mockData";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  onSuccess: (values: TermValues) => void;
}

const TAGS = ["1st", "2nd", "3rd"] as const;

export default function TermForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TermValues>({
    resolver: zodResolver(termSchema),
    defaultValues: {
      name:            "",
      sessionId:       "",
      tag:             "1st",
      startDate:       "",
      endDate:         "",
      isActive:        false,
      resultPublished: false,
    },
  });

  const mutation = useCreateTerm();
  const selectedTag = watch("tag");

  const onSubmit = (values: TermValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onSuccess(values);
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <BookOpen size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Add Term</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormInput
          label="Term Name *"
          placeholder="e.g. First Term"
          error={errors.name?.message}
          isLoading={mutation.isPending}
          {...register("name")}
        />

        <FormSelect
          label="Session *"
          placeholder="Select session"
          options={sessionSelectOptions}
          error={errors.sessionId?.message}
          {...register("sessionId")}
        />

        {/* Tag buttons */}
        <div>
          <p className="text-sm font-medium text-label mb-2">Tag (term number)</p>
          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <div className="flex gap-2">
                {TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => field.onChange(t)}
                    className={`w-full flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                      selectedTag === t
                        ? "bg-brand-primary text-white border-brand-primary"
                        : "bg-bg-input text-text-secondary border-border-line02 hover:border-brand-primary hover:text-brand-primary"
                    }`}
                  >
                    <Hash size={12} />
                    {t}
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        <FormInput
          label="Start Date *"
          type="date"
          error={errors.startDate?.message}
          isLoading={mutation.isPending}
          {...register("startDate")}
        />

        <FormInput
          label="End Date *"
          type="date"
          error={errors.endDate?.message}
          isLoading={mutation.isPending}
          {...register("endDate")}
        />

        {/* Active toggle */}
        <label className="flex items-start gap-3 p-4 rounded-xl border border-border-line02 bg-bg-input cursor-pointer hover:border-brand-primary transition-colors">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-[hsl(205,83%,45%)]"
            {...register("isActive")}
          />
          <div>
            <p className="text-sm font-medium text-text-primary">Set as Active Term</p>
            <p className="text-xs text-text-muted mt-0.5">Will deactivate the currently active term</p>
          </div>
        </label>

        {/* Result Published toggle */}
        <label className="flex items-start gap-3 p-4 rounded-xl border border-border-line02 bg-bg-input cursor-pointer hover:border-brand-primary transition-colors">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-[hsl(205,83%,45%)]"
            {...register("resultPublished")}
          />
          <div>
            <p className="text-sm font-medium text-text-primary">Result Published</p>
            <p className="text-xs text-text-muted mt-0.5">Mark results as published for this term</p>
          </div>
        </label>

        <SubmitButton label="Create Term" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}