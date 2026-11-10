import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileEdit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../shared/FormHeader";
import { slideFromLeft } from "../../animations/variants";
import { manageScoreFilterSchema, type ManageScoreFilterValues } from "../../schemas";
import { useScoreFilterOptions } from "../../hooks/useManageScore";
import type { ScoreFilters } from "../../types/manageScore";

interface ScoreFilterFormProps {
  isLoading: boolean;
  onLoad: (filters: ScoreFilters) => void;
}

export default function ScoreFilterForm({ isLoading, onLoad }: ScoreFilterFormProps) {
  const termDefaulted = useRef(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ManageScoreFilterValues>({
    resolver: zodResolver(manageScoreFilterSchema),
    defaultValues: { classGroup: "", subject: "", assessmentType: "", term: "" },
  });

  const classGroup = watch("classGroup");
  const opts = useScoreFilterOptions(classGroup);
  const busy = isLoading || opts.loading;

  // Pre-select the active term (sorted first) once the options arrive
  useEffect(() => {
    if (opts.termOptions[0] && !termDefaulted.current) {
      termDefaulted.current = true;
      setValue("term", opts.termOptions[0].value);
    }
  }, [opts.termOptions.length]);

  const onSubmit = (v: ManageScoreFilterValues) => {
    const label = (list: { value: string; label: string }[], val: string) =>
      list.find((o) => o.value === val)?.label ?? "";
    onLoad({
      classGroupId: v.classGroup,
      termId: v.term,
      subjectId: v.subject,
      assessmentTypeId: v.assessmentType,
      labels: [
        label(opts.groupOptions, v.classGroup),
        label(opts.subjectOptions, v.subject),
        label(opts.assessmentOptions, v.assessmentType),
        label(opts.termOptions, v.term),
      ],
      max: opts.maxOf(v.assessmentType),
    });
  };

  const pick = (what: string) => (classGroup ? `Select ${what}` : "Select a class group first");

  return (
    <motion.div variants={slideFromLeft} initial="hidden" animate="show" className="bg-white rounded-2xl card-shadow mb-6">
      <FormHeader title="Search Student Result" icon={<FileEdit className="w-4 h-4 text-brand-primary" />} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
        <div className="grid md:grid-cols-4 gap-4 mb-5">
          <FormSelect label="Class Group" placeholder="Select class group" options={opts.groupOptions}
            isLoading={busy} error={errors.classGroup?.message}
            {...register("classGroup", { onChange: () => { setValue("subject", ""); setValue("assessmentType", ""); } })} />
          <FormSelect label="Subject" placeholder={pick("subject")} options={opts.subjectOptions}
            isLoading={busy} error={errors.subject?.message} {...register("subject")} />
          <FormSelect label="Assessment Type" placeholder={pick("assessment")} options={opts.assessmentOptions}
            isLoading={busy} error={errors.assessmentType?.message} {...register("assessmentType")} />
          <FormSelect label="Term" placeholder="Select term" options={opts.termOptions}
            isLoading={busy} error={errors.term?.message} {...register("term")} />
        </div>
        <SubmitButton label="Load Scores" isLoading={isLoading} className="w-50" />
      </form>
    </motion.div>
  );
}