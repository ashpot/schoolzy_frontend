import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slideFromLeft } from "../animations/variants";
import { useAttendanceSummary } from "../hooks/useAcademics";
import PageHeader from "@/shared/ui/PageHeader";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../components/shared/FormHeader";
import ActiveFiltersBar from "../components/manage-scores/ActiveFiltersBar";
import AttendanceStatCards from "../components/attendance-summaries/AttendanceStatCards";
import WeeklyTrendChart from "../components/attendance-summaries/WeeklyTrendChart";
import AttendanceDistributionChart from "../components/attendance-summaries/AttendanceDistributionChart";
import StudentBreakdownTable from "../components/attendance-summaries/StudentBreakdownTable";
import { mockAttendanceSummary } from "../data/mockData";
import type { AttendanceSummaryData } from "../types/attendanceSummary";

const schema = z.object({
  term: z.string().min(1, "Please select a term"),
  session: z.string().min(1, "Please select a session"),
  class: z.string().min(1, "Please select a class"),
  class_group: z.string().min(1, "Please select a class group"),
});
type FormValues = z.infer<typeof schema>;

const AttendanceSummariesPage: React.FC = () => {
  const [summary, setSummary] = useState<AttendanceSummaryData | null>(null);
  const loadMutation = useAttendanceSummary();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { term: "", session: "", class: "", class_group: "" },
  });

  const onSubmit = (values: FormValues) => {
    loadMutation.mutate(values, {
      onSuccess: () => {
        setSummary(mockAttendanceSummary);
      },
    });
  };

  const handleReset = () => {
    reset();
    setSummary(null);
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
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Attendance Summaries"
          subtitle="View class level attendance analytics, trends and per student breakdown."
          showAdd={false}
        />
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-line02 bg-white text-text-secondary text-sm font-medium hover:bg-bg-soft transition-colors"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <motion.div variants={slideFromLeft} initial="hidden" animate="show" className="bg-white rounded-2xl card-shadow">
        <FormHeader title="Attendance Filters" icon={<BarChart3 className="w-4 h-4 text-brand-primary" />} />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
          <div className="grid md:grid-cols-4 gap-4 mb-5">
            <FormSelect label="Class" placeholder="Select class" options={termOptions}
              isLoading={loadMutation.isPending} error={errors.class?.message} {...register("class")} />
            <FormSelect label="Class Group" placeholder="Select class group" options={sessionOptions}
              isLoading={loadMutation.isPending} error={errors.class_group?.message} {...register("class_group")} />
            <FormSelect label="Session" placeholder="Select session" options={termOptions}
              isLoading={loadMutation.isPending} error={errors.session?.message} {...register("session")} />
            <FormSelect label="Term" placeholder="Select term" options={termOptions}
              isLoading={loadMutation.isPending} error={errors.term?.message} {...register("term")} />
          </div>
          <div className="flex items-center gap-4">
            <SubmitButton label="Load Summary" isLoading={loadMutation.isPending} className="w-50" />
            {summary && (
              <ActiveFiltersBar filters={[{ label: summary.className }, { label: summary.term }, { label: summary.session }]} />
            )}
          </div>
        </form>
      </motion.div>

      {!summary && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
            <BarChart3 className="w-9 h-9 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-nav mb-2">No data loaded yet</h3>
          <p className="text-sm text-text-muted max-w-md">
            Select a class, group, term and session above then click{" "}
            <span className="font-semibold text-text-nav">Load Summary</span>
          </p>
        </motion.div>
      )}

      {summary && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
          <AttendanceStatCards data={summary} />
          <div className="flex gap-6 items-stretch">
            <WeeklyTrendChart data={summary} />
            <AttendanceDistributionChart data={summary} />
          </div>
          <StudentBreakdownTable data={summary} />
        </motion.div>
      )}
    </div>
  );
};

export default AttendanceSummariesPage;