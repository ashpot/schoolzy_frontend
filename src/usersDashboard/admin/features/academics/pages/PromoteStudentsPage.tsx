import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slideFromLeft } from "../animations/variants";
import { usePromoteClass, usePromoteStudent, useRepeatStudent, useUndoPromotion } from "../hooks/useAcademics";
import PageHeader from "@/shared/ui/PageHeader";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../components/shared/FormHeader";
import type { PromoteStudentRow } from "../types/promoteStudents";
import { mockPromoteStudents } from "../data/mockData";
import PromoteStudentsTable from "../components/promote-students/PromoteStudentsTable";

const schema = z.object({
  class: z.string().min(1, "Please select a class"),
  class_group: z.string().min(1, "Please select a class group"),
});
type FormValues = z.infer<typeof schema>;

const PromoteStudentsPage: React.FC = () => {
  const [promoteRows, setPromoteRows] = useState<PromoteStudentRow[] | null>(null);
  const promoteMutation = usePromoteStudent();
  const repeatMutation = useRepeatStudent();
  const undoMutation = useUndoPromotion();
  const loadMutation = usePromoteClass()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { class_group: "", class: "" },
  });

  const onSubmit = (values: FormValues) => {
  loadMutation.mutate(values, {
    onSuccess: () => {
      setPromoteRows(mockPromoteStudents);
        console.log("testing button")
    },
  });
};

const handlePromote = (id: string) => {
  promoteMutation.mutate({ id, nextClass: "JSS 2A" }, {
    onSuccess: () => {
      setPromoteRows((prev) => prev?.map((r) => (r.id === id ? { ...r, status: "promoted" as const } : r)) ?? null);
    },
  });
};

const handleRepeat = (id: string) => {
  repeatMutation.mutate({ id }, {
    onSuccess: () => {
      setPromoteRows((prev) => prev?.map((r) => (r.id === id ? { ...r, status: "repeated" as const, nextClass: r.currentClass } : r)) ?? null);
    },
  });
};

const handleUndo = (id: string) => {
  undoMutation.mutate({ id }, {
    onSuccess: () => {
      setPromoteRows((prev) => prev?.map((r) => (r.id === id ? { ...r, status: "pending" as const } : r)) ?? null);
    },
  });
};

const handlePromoteSelected = (ids: string[]) => {
  ids.forEach((id) => handlePromote(id));
};

  const termOptions = [
    { value: "First Term", label: "First Term" },
    { value: "Second Term", label: "Second Term" },
    { value: "Third Term", label: "Third Term" },
  ];

  const sessionOptions = [
    { value: "2025/2026", label: "2025/2026" },
    { value: "2024/2025", label: "2024/2025" },
    { value: "2023/2024", label: "2023/2024" },
  ];

  return (
    <div>
      <PageHeader
        title="Promote Students"
        subtitle="Load a class to review and promote students to the next level."
        showAdd={false}
      />

      {/* Filter Card */}
      <motion.div
        variants={slideFromLeft}
        initial="hidden"
        animate="show"
        className="bg-white rounded-2xl card-shadow mb-6"
      >
        <FormHeader
            title="Select Class"
            icon={<Users className="w-4 h-4 text-brand-primary" />}

          />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div>
              <FormSelect
                label="Class"
                placeholder="Select class"
                options={termOptions}
                isLoading={loadMutation.isPending}
                error={errors.class?.message}
                {...register("class")}
              />
            </div>

            <div>
              <FormSelect
                label="Class Group"
                placeholder="Select class group"
                options={sessionOptions}
                isLoading={loadMutation.isPending}
                error={errors.class_group?.message}
                {...register("class_group")}
              />
            </div>
          </div>

          {/* Load Button */}
          <SubmitButton
            label="Load Students"
            isLoading={loadMutation.isPending}
            className="w-50"
          />
        </form>
      </motion.div>

      {/* Empty State */}
      {!promoteRows && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
            <TrendingUp className="w-9 h-9 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-nav mb-2">
            No class loaded yet
          </h3>
          <p className="text-sm text-text-muted max-w-md">
            Select a class and group above then click{" "}
            <span className="font-semibold text-text-nav">Load Students</span>
          </p>
        </motion.div>
      )}

      {promoteRows && (
        <div className="mt-6">
          <PromoteStudentsTable
            className="JSS 1A"
            promoteToOptions={[{ value: "JSS 2", label: "JSS 2" }, { value: "JSS 3", label: "JSS 3" }]}
            rows={promoteRows}
            onPromote={handlePromote}
            onRepeat={handleRepeat}
            onUndo={handleUndo}
            onPromoteSelected={handlePromoteSelected}
            isPending={promoteMutation.isPending || repeatMutation.isPending || undoMutation.isPending}
          />
        </div>
      )}
    </div>
  );
};

export default PromoteStudentsPage;