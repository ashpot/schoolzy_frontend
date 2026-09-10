import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { createTestSchema, type CreateTestValues } from "../../schemas";
import { useCreateTest } from "../../hooks/useTests";
import { subjectOptions, classOptions, testTypeOptions, formatOptions } from "../../data/mockData";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  onTestCreated: () => void;
}

export default function TestForm({ onTestCreated }: Props) {
  const createMutation = useCreateTest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTestValues>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      title:       "",
      subject:     "",
      class:       "",
      type:        "",
      timeAllowed: 0,
      format:      "",
    },
  });

  const onSubmit = (values: CreateTestValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onTestCreated();
        reset({
          title: "", subject: "", class: "", type: "",
          timeAllowed: 0,
          format: "",
        });
      },
    });
  };

  const isLoading = createMutation.isPending;

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-md bg-blue-50 flex-center">
          <Plus className="w-3.5 h-3.5 text-brand-primary" />
        </div>
        <h2 className="text-sm font-semibold text-text-nav">
          Create Test
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          <FormInput
            label="Title"
            placeholder="e.g. English Language Exam"
            required
            isLoading={isLoading}
            error={errors.title?.message}
            {...register("title")}
          />
          <FormSelect
            label="Subject"
            placeholder="Select Subject"
            options={subjectOptions}
            required
            isLoading={isLoading}
            error={errors.subject?.message}
            {...register("subject")}
          />
          <FormSelect
            label="Class"
            placeholder="Select Class"
            options={classOptions}
            required
            isLoading={isLoading}
            error={errors.class?.message}
            {...register("class")}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4">
          <FormSelect
            label="Type"
            placeholder="Select Type"
            options={testTypeOptions}
            required
            isLoading={isLoading}
            error={errors.type?.message}
            {...register("type")}
          />
          <FormInput
            label="Time Allowed (minutes)"
            placeholder="e.g. 60"
            type="number"
            required
            isLoading={isLoading}
            error={errors.timeAllowed?.message}
            {...register("timeAllowed", { valueAsNumber: true })}
          />
          <FormSelect
            label="Format (internal or external)"
            placeholder="Select Format"
            options={formatOptions}
            required
            isLoading={isLoading}
            error={errors.format?.message}
            {...register("format")}
          />
        </div>

        <div className="pt-1">
          <SubmitButton label="Create Test" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}