import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Info } from "lucide-react";
import { expenseSchema, type ExpenseValues } from "../../schemas";
import { useCreateExpense } from "../../hooks/useFinances";
import type { Expense } from "../../types";
import FormHeader from "@/shared/ui/FormHeader";
import SubmitButton from "@/shared/ui/SubmitButton";
import type {z} from "zod";

const STAFF = ["Mrs. Okafor", "Mr. Adebayo", "Miss Lawal", "Mr. Nwosu", "Mr. Chukwu"];

interface ExpenseFormProps {
  onSuccess: (expense: Expense) => void;
}

export default function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const mutation = useCreateExpense();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<z.input<typeof expenseSchema>, any, ExpenseValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { description: "", amount: undefined },
  });

  const descLen = (watch("description") ?? "").length;

  const onSubmit = (values: ExpenseValues) => {
    const recordedBy = STAFF[Math.floor(Math.random() * STAFF.length)];
    mutation.mutate(values, {
      onSuccess: () => {
        const newExpense: Expense = {
          id: Date.now().toString(),
          description: values.description,
          category: "Utilities",
          amount: values.amount,
          date: new Date().toISOString().split("T")[0],
          recordedBy,
        };
        onSuccess(newExpense);
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={Plus} title="Add Expense" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">

        {/* Description textarea with char counter */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-label">Description *</label>
            <span className="text-xs text-text-muted">{descLen} chars</span>
          </div>
          <textarea
            rows={3}
            placeholder="e.g. Electricity bill for January 2025…"
            disabled={mutation.isPending}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-bg-input text-text-primary placeholder:text-text-muted resize-none transition-all outline-none
              focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20
              ${errors.description ? "border-danger" : "border-border-line02"}
              ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-danger">{errors.description.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Amount *</label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted">₦</span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  disabled={mutation.isPending}
                  value={typeof field.value === "number" ? field.value : ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? ("" as unknown as number) : Number(e.target.value))}
                  className={`w-full pl-7 pr-3 py-2.5 rounded-xl border text-sm bg-bg-input text-text-primary placeholder:text-text-muted outline-none transition-all
                    focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20
                    ${errors.amount ? "border-danger" : "border-border-line02"}
                    ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
            )}
          />
          {errors.amount && (
            <p className="mt-1 text-xs text-danger">{errors.amount.message}</p>
          )}
        </div>

        {/* Recorded by hint */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input">
          <Info size={13} className="text-text-muted shrink-0" />
          <p className="text-xs text-text-muted">Recorded by will be assigned automatically</p>
        </div>

        <SubmitButton label="Add Expense" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}