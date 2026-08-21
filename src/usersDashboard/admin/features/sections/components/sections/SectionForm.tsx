import { useForm, /*Controller*/ } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Tag, Hash } from "lucide-react";
import { sectionSchema, type SectionValues } from "../../schemas";
import { useAddSection } from "../../hooks/useSections";
import type { SectionPayload } from "../../types";
import Button from "@/shared/ui/Button";
import {z} from "zod";
import type { SectionListItem } from "../../../academics/types";

interface Props { onSuccess: (s: SectionListItem) => void; }

export default function SectionForm({ onSuccess }: Props) {
  const addSection = useAddSection();

  const { register, handleSubmit, watch, /*control,*/ reset, formState: { errors } } = useForm<z.input<typeof sectionSchema>, any, SectionValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: { title: "", code: "",},
  });

  const codeLen = (watch("code") ?? "").length;

  const onSubmit = (values: SectionPayload) => {
    addSection.mutate(values, {
      onSuccess: (data) => { onSuccess(data); reset(); },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <Plus size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Add Section</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-label mb-1.5">Title *</label>
          <div className="relative">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="e.g. Sciences" disabled={addSection.isPending}
              className="w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              {...register("title")} />
          </div>
          {errors.title && <p className="mt-1 text-xs text-danger">{errors.title.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-label">Code *</label>
            <span className="text-xs text-text-muted">{codeLen}/8</span>
          </div>
          <div className="relative">
            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" maxLength={8} placeholder="E.G. SCI" disabled={addSection.isPending}
              className="w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all uppercase"
              {...register("code")} />
          </div>
          {errors.code && <p className="mt-1 text-xs text-danger">{errors.code.message}</p>}
        </div>

        {/* <Controller
          name="showPosition"
          control={control}
          render={({ field }) => (
            <div className="flex items-start gap-3 p-4 rounded-xl border border-border-line02 bg-bg-input/40">
              <button type="button" onClick={() => field.onChange(!field.value)}
                className={`relative mt-0.5 w-10 h-6 rounded-full transition-all duration-200 shrink-0 ${field.value ? "bg-brand-primary" : "bg-gray-200"}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${field.value ? "left-5" : "left-1"}`} />
              </button>
              <div>
                <p className="text-sm font-medium text-text-primary">Show position in result</p>
                <p className="text-xs text-text-secondary mt-0.5">Display student ranking within this section on result sheets</p>
              </div>
            </div>
          )}
        /> */}
        <Button
          leftIcon={<Plus size={19} />}
          size="lg" type="submit"
          isLoading={addSection.isPending}
          className="w-full font-medium rounded-xl"
        >
          Add section
        </Button>
      </form>
    </div>
  );
}