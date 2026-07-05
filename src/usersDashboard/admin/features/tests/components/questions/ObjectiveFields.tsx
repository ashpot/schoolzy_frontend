import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { List } from "lucide-react";
import type { QuestionFormValues } from "../../schemas";
import { correctOptionOptions } from "../../data/mockData";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";

interface Props {
  register:  UseFormRegister<QuestionFormValues>;
  errors:    FieldErrors<QuestionFormValues>;
  isLoading: boolean;
}

export default function ObjectiveFields({ register, errors, isLoading }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <List className="w-4 h-4 text-brand-primary" />
        <span className="text-sm font-medium text-text-nav">
          Answer Options
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Option A"
          placeholder="Enter option A"
          isLoading={isLoading}
          error={errors.optionA?.message}
          {...register("optionA")}
        />
        <FormInput
          label="Option B"
          placeholder="Enter option B"
          isLoading={isLoading}
          error={errors.optionB?.message}
          {...register("optionB")}
        />
        <FormInput
          label="Option C"
          placeholder="Enter option C"
          isLoading={isLoading}
          error={errors.optionC?.message}
          {...register("optionC")}
        />
        <FormInput
          label="Option D"
          placeholder="Enter option D"
          isLoading={isLoading}
          error={errors.optionD?.message}
          {...register("optionD")}
        />
      </div>

      <FormSelect
        label="Correct Option"
        placeholder="Select correct option"
        options={correctOptionOptions}
        isLoading={isLoading}
        error={errors.correctOption?.message}
        {...register("correctOption")}
      />
    </div>
  );
}