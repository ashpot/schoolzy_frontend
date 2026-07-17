import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Info } from "lucide-react";
import { formTeacherSchema, type FormTeacherValues } from "../../schemas";
import { classSelectOptions, teacherSelectOptions, mockTeachers } from "../../data/mockData";
import { useAssignFormTeacher } from "../../hooks/useSections";
import type { FormTeacherAssignment } from "../../types";
import FormSelect   from "@/shared/ui/FormSelect";
import Button from "@/shared/ui/Button";

interface Props { onSuccess: (a: FormTeacherAssignment) => void; }

export default function FormTeacherForm({ onSuccess }: Props) {
  const assignTeacher = useAssignFormTeacher();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormTeacherValues>({
    resolver: zodResolver(formTeacherSchema),
    defaultValues: { classValue: "", teacherId: "" },
  });

  const onSubmit = (values: FormTeacherValues) => {
    assignTeacher.mutate(values, {
      onSuccess: () => {
        const teacher = mockTeachers.find((t) => t.id === values.teacherId);
        onSuccess({
          id:          Date.now().toString(),
          className:   values.classValue,
          teacherName: teacher?.name    ?? "",
          subject:     teacher?.subject ?? "",
          assignedBy:  "Admin",
          assignedAt:  new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        });
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <Plus size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Add Form Teacher</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormSelect label="Class *" error={errors.classValue?.message} isLoading={assignTeacher.isPending}
          options={classSelectOptions} placeholder="Select class" {...register("classValue")} />

        <FormSelect label="Teacher *" error={errors.teacherId?.message} isLoading={assignTeacher.isPending}
          options={teacherSelectOptions} placeholder="Select teacher" {...register("teacherId")} />

        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 border border-border-line02 text-xs text-text-secondary">
          <Info size={13} className="shrink-0" />
          Will be recorded as assigned by <span className="font-semibold text-text-primary mx-1">Admin (You)</span>
        </div>

        <Button
          leftIcon={<Plus size={19} />}
          size="lg" type="submit"
          isLoading={assignTeacher.isPending}
          className="w-full font-medium rounded-xl"
        >
          Assign Teacher
        </Button>
      </form>
    </div>
  );
}