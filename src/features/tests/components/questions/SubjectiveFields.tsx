import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { QuestionFormValues } from "../../schemas";

interface Props {
  register:  UseFormRegister<QuestionFormValues>;
  errors:    FieldErrors<QuestionFormValues>;
  isLoading: boolean;
}

export default function SubjectiveFields({ register, errors, isLoading }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-label)] mb-1.5">
        Correct Answer <span className="text-[var(--color-danger)]">*</span>
      </label>
      <textarea
        placeholder="Enter the expected correct answer…"
        disabled={isLoading}
        rows={4}
        className={`w-full px-3 py-2.5 rounded-xl border bg-[var(--color-bg-input)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all resize-none disabled:opacity-60 ${
          errors.correctAnswer
            ? "border-[var(--color-danger)]"
            : "border-[var(--color-border-line02)]"
        }`}
        {...register("correctAnswer")}
      />
      {errors.correctAnswer && (
        <p className="mt-1 text-xs text-[var(--color-danger)]">
          {errors.correctAnswer.message}
        </p>
      )}
    </div>
  );
}