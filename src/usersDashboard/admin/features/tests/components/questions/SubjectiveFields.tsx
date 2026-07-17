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
      <label className="block text-sm font-medium text-label mb-1.5">
        Correct Answer <span className="text-danger">*</span>
      </label>
      <textarea
        placeholder="Enter the expected correct answer…"
        disabled={isLoading}
        rows={4}
        className={`w-full px-3 py-2.5 rounded-xl border bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none disabled:opacity-60 ${
          errors.correctAnswer
            ? "border-danger"
            : "border-border-line02"
        }`}
        {...register("correctAnswer")}
      />
      {errors.correctAnswer && (
        <p className="mt-1 text-xs text-danger">
          {errors.correctAnswer.message}
        </p>
      )}
    </div>
  );
}