import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Info } from "lucide-react";
import { formTeacherSchema, type FormTeacherValues } from "../../schemas";
import {
  useAssignFormTeacher, useAssignmentsList, useClassGroupsList, useTeacherOptionsList,
} from "../../hooks/useSections";
import FormSelect from "@/shared/ui/FormSelect";
import Button from "@/shared/ui/Button";

export default function FormTeacherForm() {
  const assignTeacher = useAssignFormTeacher();
  const { data: groups = [], isLoading: groupsLoading } = useClassGroupsList();
  const { data: teachers = [], isLoading: teachersLoading } = useTeacherOptionsList();
  const { data: assignments = [] } = useAssignmentsList();

  const { register, handleSubmit, reset, watch, setError, formState: { errors } } = useForm<FormTeacherValues>({
    resolver: zodResolver(formTeacherSchema),
    defaultValues: { classValue: "", teacherId: "" },
  });

  const groupOptions = groups.map((g) => ({ value: String(g.id), label: `${g.name} (${g.code})` }));
  const teacherOptions = teachers.map((t) => ({ value: String(t.id), label: `${t.first_name} ${t.last_name}` }));

  // Show who is currently the class group's form teacher
  const selectedGroup = groups.find((g) => String(g.id) === watch("classValue"));

  const onSubmit = (values: FormTeacherValues) => {
    // The backend allows duplicates, so block an identical pair here
    const duplicate = assignments.some(
      (a) => String(a.classGroupId) === values.classValue && String(a.teacherId) === values.teacherId
    );
    if (duplicate) {
      setError("teacherId", { message: "This teacher is already assigned to this class" });
      return;
    }
    assignTeacher.mutate(values, { onSuccess: () => reset() });
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
        <FormSelect label="Class *" error={errors.classValue?.message}
          isLoading={assignTeacher.isPending || groupsLoading}
          options={groupOptions}
          placeholder={groupsLoading ? "Loading classes..." : "Select class"}
          {...register("classValue")} />

        {selectedGroup && (
          <p className="text-xs text-text-muted -mt-2">
            Current form teacher:{" "}
            <span className="font-medium text-text-primary">{selectedGroup.form_teacher_name ?? "None yet"}</span>
          </p>
        )}

        <FormSelect label="Teacher *" error={errors.teacherId?.message}
          isLoading={assignTeacher.isPending || teachersLoading}
          options={teacherOptions}
          placeholder={teachersLoading ? "Loading teachers..." : "Select teacher"}
          {...register("teacherId")} />

        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 border border-border-line02 text-xs text-text-secondary">
          <Info size={13} className="shrink-0" />
          Will be recorded as assigned by <span className="font-semibold text-text-primary mx-1">Admin (You)</span>
        </div>

        {assignTeacher.isError && (
          <p className="text-xs text-danger">{assignTeacher.error.message}</p>
        )}

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