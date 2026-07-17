import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { importScoresFiltersSchema, type ImportScoresFiltersValues } from "../../schemas";
import { classOptions, subjectOptions, termOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";

interface Props {
  values: ImportScoresFiltersValues;
  onChange: (values: ImportScoresFiltersValues) => void;
}

export default function ImportFiltersForm({ values, onChange }: Props) {
  const { register, watch, formState: { errors } } = useForm<ImportScoresFiltersValues>({
    resolver: zodResolver(importScoresFiltersSchema),
    defaultValues: values,
  });

  const watched = watch();

  // Sync up to parent on change without a submit button — filters gate the upload zone
  if (JSON.stringify(watched) !== JSON.stringify(values)) {
    onChange(watched);
  }

  return (
    <form noValidate className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormSelect label="Class" placeholder="Select Class" options={classOptions} error={errors.classId?.message} {...register("classId")} />
      <FormSelect label="Subject" placeholder="Select Subject" options={subjectOptions} error={errors.subjectId?.message} {...register("subjectId")} />
      <FormSelect label="Term" placeholder="Select Term" options={termOptions} error={errors.term?.message} {...register("term")} />
    </form>
  );
}