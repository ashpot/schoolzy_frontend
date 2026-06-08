import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter, ClipboardList } from "lucide-react";
import { viewScoresFilterSchema, type ViewScoresFilterValues } from "../../schemas/viewScores";
import { classOptions, classGroupOptions, subjectOptions, termOptions } from "../../data/mockData";
import { useLoadViewScores } from "../../hooks/useViewScores";
import type { ViewScore } from "../../types";
import FormSelect from "@/shared/ui/FormSelect";
import Button     from "@/shared/ui/Button";
import FilterPill from "../shared/FilterPill";

interface Props {
  isLoaded:      boolean;
  activeFilters: ViewScoresFilterValues | null;
  onLoad:        (filters: ViewScoresFilterValues, scores: ViewScore[]) => void;
}

export default function ScoresFilters({ isLoaded, activeFilters, onLoad }: Props) {
  const loadScores = useLoadViewScores();

  const { register, handleSubmit, formState: { errors } } = useForm<ViewScoresFilterValues>({
    resolver: zodResolver(viewScoresFilterSchema),
    defaultValues: { class: "", classGroup: "", subject: "", term: "" },
  });

  const onSubmit = (v: ViewScoresFilterValues) => loadScores.mutate(v, { onSuccess: (s) => onLoad(v, s) });

  const classLabel   = classOptions.find((o) => o.value === activeFilters?.class)?.label           ?? "";
  const groupLabel   = classGroupOptions.find((o) => o.value === activeFilters?.classGroup)?.label ?? "";
  const subjectLabel = subjectOptions.find((o) => o.value === activeFilters?.subject)?.label       ?? "";
  const termLabel    = termOptions.find((o) => o.value === activeFilters?.term)?.label             ?? "";

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <Filter size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Filters</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormSelect label="Class *"       error={errors.class?.message}      isLoading={loadScores.isPending} options={classOptions}      placeholder="Select class"   {...register("class")}      />
          <FormSelect label="Class Group *" error={errors.classGroup?.message} isLoading={loadScores.isPending} options={classGroupOptions} placeholder="Select group"   {...register("classGroup")} />
          <FormSelect label="Subject *"     error={errors.subject?.message}    isLoading={loadScores.isPending} options={subjectOptions}    placeholder="Select subject" {...register("subject")}    />
          <FormSelect label="Term *"        error={errors.term?.message}       isLoading={loadScores.isPending} options={termOptions}       placeholder="Select term"    {...register("term")}       />
        </div>

        {isLoaded && activeFilters && (
          <div className="flex flex-wrap gap-2">
            <FilterPill label={`${classLabel} ${groupLabel}`} color="blue"   />
            <FilterPill label={subjectLabel}                  color="purple" />
            <FilterPill label={termLabel}                     color="amber"  />
          </div>
        )}

        <Button type="submit" variant="primary" leftIcon={<ClipboardList size={16} />} isLoading={loadScores.isPending}>
          Load Scores
        </Button>
      </form>
    </div>
  );
}