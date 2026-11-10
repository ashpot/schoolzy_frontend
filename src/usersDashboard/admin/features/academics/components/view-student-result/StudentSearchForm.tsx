import React, { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../shared/FormHeader";
import StudentSearchInput from "./StudentSearchInput";
import { slideFromLeft } from "../../animations/variants";
import { useAcademicLookups, useStudentSearchIndex } from "../../hooks/useStudentResult";
import type { SearchParams } from "../../types/studentResult";
import { studentResultSearchSchema, type StudentResultSearchValues } from "../../schemas";

interface Props {
  isLoading: boolean;
  onSearch: (params: SearchParams) => void;
}

const StudentSearchForm: React.FC<Props> = ({ isLoading, onSearch }) => {
  const { data: students = [], isLoading: studentsLoading, error: studentsError } = useStudentSearchIndex();
  const { sessions, terms, isLoading: lookupsLoading } = useAcademicLookups();

  const { register, handleSubmit, control, setValue, formState: { errors } } =
    useForm<StudentResultSearchValues>({
      resolver: zodResolver(studentResultSearchSchema),
      defaultValues: { studentName: "", studentId: "", sessionId: "", termId: "" },
    });

  const sessionId = useWatch({ control, name: "sessionId" });
  const studentId = useWatch({ control, name: "studentId" });

  // Default to the active session
  useEffect(() => {
    if (sessionId || !sessions.length) return;
    const pick = sessions.find((s) => s.is_active) ?? sessions[0];
    setValue("sessionId", String(pick.id));
  }, [sessions, sessionId, setValue]);

  // Terms follow the chosen session, defaulting to its active term
  const termOptions = useMemo(
    () => terms.filter((t) => String(t.session) === sessionId),
    [terms, sessionId]
  );
  useEffect(() => {
    if (!sessionId) return;
    const pick = termOptions.find((t) => t.is_active) ?? termOptions[0];
    setValue("termId", pick ? String(pick.id) : "");
  }, [sessionId, termOptions, setValue]);

  const onSubmit = (v: StudentResultSearchValues) =>
    onSearch({ studentId: v.studentId, termId: v.termId });

  return (
    <motion.div variants={slideFromLeft} initial="hidden" animate="show" className="bg-white rounded-2xl card-shadow">
      <FormHeader title="Search Student Result" icon={<Search className="w-4 h-4 text-brand-primary" />} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-5">
          <Controller
            control={control}
            name="studentName"
            render={({ field }) => (
              <StudentSearchInput
                value={field.value}
                students={students}
                isLoading={studentsLoading}
                loadError={studentsError instanceof Error ? studentsError.message : undefined}
                isSelected={Boolean(studentId)}
                disabled={isLoading}
                error={errors.studentName?.message ?? errors.studentId?.message}
                onTextChange={(text) => { field.onChange(text); setValue("studentId", ""); }}
                onSelect={(s) => {
                  field.onChange(s.fullName);
                  setValue("studentId", s.id, { shouldValidate: true });
                }}
              />
            )}
          />
          <FormSelect
            label="Session" placeholder="Select session"
            options={sessions.map((s) => ({ value: String(s.id), label: s.name + (s.is_active ? " (active)" : "") }))}
            isLoading={isLoading || lookupsLoading}
            error={errors.sessionId?.message}
            {...register("sessionId")}
          />
          <FormSelect
            label="Term" placeholder="Select term"
            options={termOptions.map((t) => ({ value: String(t.id), label: t.name + (t.is_active ? " (active)" : "") }))}
            isLoading={isLoading || lookupsLoading}
            error={errors.termId?.message}
            {...register("termId")}
          />
        </div>
        <SubmitButton label="Load Search Results" isLoading={isLoading} className="w-50" />
      </form>
    </motion.div>
  );
};

export default StudentSearchForm;