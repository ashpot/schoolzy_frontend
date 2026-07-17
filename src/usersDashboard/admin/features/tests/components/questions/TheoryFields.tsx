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
      <label className="block text-sm font-medium text-label mb-1.5">
        Theory Answer{" "}
        <span className="text-text-muted font-normal">(optional)</span>
      </label>
      <textarea
        placeholder="Enter model answer or marking guide (optional)…"
        disabled={isLoading}
        rows={4}
        className="w-full px-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none disabled:opacity-60"
        {...register("theoryAnswer")}
      />
    </div>
  );
}