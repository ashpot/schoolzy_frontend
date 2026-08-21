import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Tag, Hash } from "lucide-react";
import { classGroupSchema, type ClassGroupValues } from "../../schemas";
import { useAddClassGroup, useClassesList } from "../../hooks/useSections";
import Button from "@/shared/ui/Button";
import FormSelect from "@/shared/ui/FormSelect";
import type { ClassGroupListItem } from "../../types";

interface Props { onSuccess: (g: ClassGroupListItem) => void; }

export default function ClassGroupForm({ onSuccess }: Props) {
  const addGroup = useAddClassGroup();
  const { data: classes, isLoading: classesLoading } = useClassesList();

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ClassGroupValues>({
    resolver: zodResolver(classGroupSchema),
    defaultValues: { name: "", code: "", parentClass: "" },
  });

  const codeLen = (watch("code") ?? "").length;

  const classOptions = (classes ?? []).map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  const onSubmit = (values: ClassGroupValues) => {
    addGroup.mutate(values, {
      onSuccess: (data) => { onSuccess(data); reset(); },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <Plus size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Add Class Group</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-label mb-1.5">Name *</label>
          <div className="relative">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="e.g. JSS 1 Science" disabled={addGroup.isPending}
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
            <input type="text" maxLength={8} placeholder="E.G. J1SCI" disabled={addGroup.isPending}
              className="w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all uppercase"
              {...register("code")} />
          </div>
          {errors.code && <p className="mt-1 text-xs text-danger">{errors.code.message}</p>}
        </div>

        <FormSelect
          label="Parent Class *"
          error={errors.parentClass?.message}
          isLoading={addGroup.isPending || classesLoading}
          options={classOptions}
          placeholder={classesLoading ? "Loading classes..." : "Select parent class"}
          {...register("parentClass")}
        />

        <Button
          leftIcon={<Plus size={19} />}
          size="lg" type="submit"
          isLoading={addGroup.isPending}
          className="w-full font-medium rounded-xl"
        >
          Add Class Group
        </Button>
      </form>
    </div>
  );
}