import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Tag, Hash } from "lucide-react";
import { classSchema, type ClassValues } from "../../schemas";
import { sectionSelectOptions } from "../../data/mockData";
import { useAddClass } from "../../hooks/useSections";
import type { Class } from "../../types";
import FormSelect   from "@/shared/ui/FormSelect";
import Button from "@/shared/ui/Button";

interface Props { onSuccess: (c: Class) => void; }

export default function ClassForm({ onSuccess }: Props) {
  const addClass = useAddClass();

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ClassValues>({
    resolver: zodResolver(classSchema),
    defaultValues: { name: "", code: "", section: "" },
  });

  const codeLen = (watch("code") ?? "").length;

  const onSubmit = (values: ClassValues) => {
    addClass.mutate(values, {
      onSuccess: () => { onSuccess({ id: Date.now().toString(), ...values, code: values.code.toUpperCase() }); reset(); },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <Plus size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Add Class</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-label mb-1.5">Name *</label>
          <div className="relative">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="e.g. JSS 1" disabled={addClass.isPending}
              className="w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              {...register("name")} />
          </div>
          {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-label">Code *</label>
            <span className="text-xs text-text-muted">{codeLen}/8</span>
          </div>
          <div className="relative">
            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" maxLength={8} placeholder="E.G. JSS1" disabled={addClass.isPending}
              className="w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all uppercase"
              {...register("code")} />
          </div>
          {errors.code && <p className="mt-1 text-xs text-danger">{errors.code.message}</p>}
        </div>

        <FormSelect label="Section *" error={errors.section?.message} isLoading={addClass.isPending}
          options={sectionSelectOptions} placeholder="Select section" {...register("section")} />
        <Button
          leftIcon={<Plus size={19} />}
          size="lg" type="submit"
          isLoading={addClass.isPending} className="w-full font-medium rounded-xl"
        >
          Add class
        </Button>
      </form>
    </div>
  );
}