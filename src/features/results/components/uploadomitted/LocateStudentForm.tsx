import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, ArrowRight, RotateCcw } from "lucide-react";
import { classOptions, classGroupOptions, subjectOptions, studentOptions } from "../../data/mockData";
import { useLoadStudentRecord } from "../../hooks/useUploadOmitted";
import type { LoadedRecord } from "../../types";
import FormSelect from "@/shared/ui/FormSelect";
import Button     from "@/shared/ui/Button";
import { locateStudentSchema, type LocateStudentValues } from "../../schemas/uploadOmited";

interface Props {
  isLoaded: boolean;
  onLoad:   (record: LoadedRecord) => void;
  onClear:  () => void;
}

export default function LocateStudentForm({ isLoaded, onLoad, onClear }: Props) {
  const loadRecord = useLoadStudentRecord();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LocateStudentValues>({
    resolver: zodResolver(locateStudentSchema),
    defaultValues: { class: "", classGroup: "", subject: "", student: "" },
  });

  const onSubmit = (values: LocateStudentValues) => {
    loadRecord.mutate(values, { onSuccess: (record) => onLoad(record) });
  };

  const handleReset = () => {
    reset();
    onClear();
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <Search size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Locate Student Record</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormSelect
            label="Class *"
            error={errors.class?.message}
            isLoading={loadRecord.isPending}
            options={classOptions}
            placeholder="Select class"
            {...register("class")}
          />
          <FormSelect
            label="Class Group *"
            error={errors.classGroup?.message}
            isLoading={loadRecord.isPending}
            options={classGroupOptions}
            placeholder="Select group"
            {...register("classGroup")}
          />
          <FormSelect
            label="Subject *"
            error={errors.subject?.message}
            isLoading={loadRecord.isPending}
            options={subjectOptions}
            placeholder="Select subject"
            {...register("subject")}
          />
          <FormSelect
            label="Student *"
            error={errors.student?.message}
            isLoading={loadRecord.isPending}
            options={studentOptions}
            placeholder="Select student"
            {...register("student")}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            leftIcon={<ArrowRight size={16} />}
            isLoading={loadRecord.isPending}
          >
            Load Student Record
          </Button>
          {isLoaded && (
            <Button type="button" variant="ghost" leftIcon={<RotateCcw size={14} />} onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}