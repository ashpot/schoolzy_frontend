import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileEdit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slideFromLeft } from "../animations/variants";
import { useManageScore, useSaveAllScores, useSaveScore } from "../hooks/useAcademics";
import PageHeader from "@/shared/ui/PageHeader";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../components/shared/FormHeader";
import { mockScoreRows } from "../data/mockData";
import ActiveFiltersBar from "../components/manage-scores/ActiveFiltersBar";
import type { ScoreRow } from "../types/manageScores";
import ScoresTable from "../components/manage-scores/ScoresTable";

const schema = z.object({
  class: z.string().min(1, "Please select a class"),
  class_group: z.string().min(1, "Please select a class group"),
  subject: z.string().min(1, "Please select a subject"),
  assessment_type: z.string().min(1, "Please select an assessment type"),
  term: z.string().min(1, "Please select a term"),
  session: z.string().min(1, "Please select a session"),
});
type FormValues = z.infer<typeof schema>;

const ManageScoresPage: React.FC = () => {
  const loadMutation = useManageScore();
  const [scoreRows, setScoreRows] = useState<ScoreRow[] | null>(null);
  const saveScoreMutation = useSaveScore();
  const saveAllMutation = useSaveAllScores();


  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { class: "", class_group: "", subject: "", assessment_type: "", term: "", session: "" },
  });

  const onSubmit = (values: FormValues) => {
      loadMutation.mutate(values, {
        onSuccess: () => {
          setScoreRows(mockScoreRows);
        },
      });
    };
    const handleSaveRow = (id: string, score: number) => {
  saveScoreMutation.mutate({ id, score }, {
    onSuccess: () => {
      setScoreRows((prev) => prev?.map((r) => (r.id === id ? { ...r, score, status: "saved" } : r)) ?? null);
    },
  });
};

const handleSaveAll = () => {
  if (!scoreRows) return;
  const payload = scoreRows.filter((r) => r.score !== null).map((r) => ({ id: r.id, score: r.score! }));
  saveAllMutation.mutate(payload, {
    onSuccess: () => {
      setScoreRows((prev) => prev?.map((r) => (r.score !== null ? { ...r, status: "saved" as const } : r)) ?? null);
    },
  });
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
        title="Manage Scores"
        subtitle="Load student scores by class, class group, subject and assessment type."
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
            title="Search Student Result"
            icon={<FileEdit className="w-4 h-4 text-brand-primary" />}

          />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
          <div className="grid md:grid-cols-6 gap-4 mb-5">
            <div>
              <FormSelect
                label="Class"
                placeholder="Select class"
                options={sessionOptions}
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

            <div>
              <FormSelect
                label="Subject"
                placeholder="Select subject"
                options={sessionOptions}
                isLoading={loadMutation.isPending}
                error={errors.subject?.message}
                {...register("subject")}
              />
            </div>

            <div>
              <FormSelect
                label="Assessment Type"
                placeholder="Select assessment"
                options={sessionOptions}
                isLoading={loadMutation.isPending}
                error={errors.assessment_type?.message}
                {...register("assessment_type")}
              />
            </div>

            <div>
              <FormSelect
                label="Session"
                placeholder="Select session"
                options={sessionOptions}
                isLoading={loadMutation.isPending}
                error={errors.session?.message}
                {...register("session")}
              />
            </div>

            <div>
              <FormSelect
                label="Term"
                placeholder="Select term"
                options={termOptions}
                isLoading={loadMutation.isPending}
                error={errors.term?.message}
                {...register("term")}
              />

            </div>


          </div>

          {/* Load Button */}
          <SubmitButton
            label="Load Search Results"
            isLoading={loadMutation.isPending}
            className="w-50"
          />
        </form>
      </motion.div>

      {/* Empty State */}
      {!scoreRows && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
            <FileEdit className="w-9 h-9 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-nav mb-2">
            No scores loaded yet
          </h3>
          <p className="text-sm text-text-muted max-w-md">
            Fill in the filters above then click{" "}
            <span className="font-semibold text-text-nav">Load Scores</span>
            {" "} to get started
          </p>
        </motion.div>
      )}

      {scoreRows && (
        <div className="flex flex-col gap-6 mt-6">
          <ActiveFiltersBar
            filters={[
              { label: "SS 1 A" }, { label: "Mathematics" }, { label: "Exam (100 marks)" },
              { label: "First Term" }, { label: "2025/2026" },
            ]}
          />
          <ScoresTable
            rows={scoreRows}
            onSaveRow={handleSaveRow}
            onSaveAll={handleSaveAll}
            isSavingRow={saveScoreMutation.isPending}
            isSavingAll={saveAllMutation.isPending}
          />
        </div>
      )}
    </div>
  );
};

export default ManageScoresPage;