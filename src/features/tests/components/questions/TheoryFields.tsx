import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { QuestionFormValues } from "../../schemas";

interface Props {
  register:  UseFormRegister<QuestionFormValues>;
  errors:    FieldErrors<QuestionFormValues>;
  isLoading: boolean;
}

export default function TheoryFields({ register, isLoading }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-label)] mb-1.5">
        Theory Answer{" "}
        <span className="text-[var(--color-text-muted)] font-normal">(optional)</span>
      </label>
      <textarea
        placeholder="Enter model answer or marking guide (optional)…"
        disabled={isLoading}
        rows={4}
        className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border-line02)] bg-[var(--color-bg-input)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all resize-none disabled:opacity-60"
        {...register("theoryAnswer")}
      />
    </div>
  );
}