import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, BarChart3, Info, Loader2, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { slideFromLeft } from "../animations/variants";
import { useAttendanceAnalytics, useTermOptions } from "../hooks/useAttendanceSummary";
import type { AttendanceSummaryFilters } from "../types/attendanceSummary";
import { useClassGroupsList } from "@/usersDashboard/admin/features/sections/hooks/useSections";
import { titleCase } from "@/usersDashboard/admin/features/learning/shared/utils/lessonNoteMapper";
import PageHeader from "@/shared/ui/PageHeader";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../components/shared/FormHeader";
import ActiveFiltersBar from "../components/manage-scores/ActiveFiltersBar";
import AttendanceStatCards from "../components/attendance-summaries/AttendanceStatCards";
import WeeklyTrendChart from "../components/attendance-summaries/WeeklyTrendChart";
import AttendanceDistributionChart from "../components/attendance-summaries/AttendanceDistributionChart";
import StudentBreakdownTable from "../components/attendance-summaries/StudentBreakdownTable";
import SummaryPlaceholder from "../components/attendance-summaries/SummaryPlaceholder";
import { attendanceSummaryFilterSchema, type AttendanceSummaryFilterValues } from "../schemas";

const AttendanceSummariesPage: React.FC = () => {
  const [filters, setFilters] = useState<AttendanceSummaryFilters | null>(null);
  const termDefaulted = useRef(false);

  const groupsQuery = useClassGroupsList();
  const termsQuery = useTermOptions();
  const query = useAttendanceAnalytics(filters);

  const groupOptions = (groupsQuery.data ?? []).map((g) => ({ value: String(g.id), label: titleCase(g.name) }));
  const termOptions = termsQuery.data ?? [];
  const defaultTerm = termOptions[0]?.value ?? ""; // active term is sorted first

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AttendanceSummaryFilterValues>({
    resolver: zodResolver(attendanceSummaryFilterSchema),
    defaultValues: { classGroup: "", term: "" },
  });

  // Pre-select the active term once the options arrive
  useEffect(() => {
    if (defaultTerm && !termDefaulted.current) {
      termDefaulted.current = true;
      setValue("term", defaultTerm);
    }
  }, [defaultTerm, setValue]);

  const onSubmit = (values: AttendanceSummaryFilterValues) => {
    const next = { classGroupId: values.classGroup, termId: values.term };
    if (filters?.classGroupId === next.classGroupId && filters?.termId === next.termId) query.refetch();
    else setFilters(next);
  };

  const handleReset = () => {
    reset({ classGroup: "", term: defaultTerm });
    setFilters(null);
  };

  const data = query.data;
  const busy = query.isFetching || groupsQuery.isLoading || termsQuery.isLoading;

  const renderBody = () => {
    if (!filters) {
      return (
        <SummaryPlaceholder
          icon={<BarChart3 className="w-9 h-9 text-brand-primary" />}
          title="No data loaded yet"
          text={<>Select a class group and term above then click <span className="font-semibold text-text-nav">Load Summary</span></>}
        />
      );
    }
    if (query.isLoading) {
      return <SummaryPlaceholder icon={<Loader2 className="w-9 h-9 text-brand-primary animate-spin" />} title="Loading summary..." text="Crunching attendance records" />;
    }
    if (query.error || !data) {
      return <SummaryPlaceholder icon={<AlertCircle className="w-9 h-9 text-danger" />} title="Couldn't load summary" text={query.error?.message ?? "Something went wrong"} />;
    }
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
        {!data.hasData && (
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100 text-sm text-amber-700">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            No attendance has been recorded for {data.className} between {data.termRange}.
          </div>
        )}
        <AttendanceStatCards data={data} />
        <div className="flex gap-6 items-stretch">
          <WeeklyTrendChart data={data} />
          <AttendanceDistributionChart data={data} />
        </div>
        <StudentBreakdownTable data={data} />
      </motion.div>
    );
  };

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
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <FormSelect label="Class Group" placeholder={groupsQuery.isLoading ? "Loading class groups..." : "Select class group"}
              options={groupOptions} isLoading={busy}
              error={errors.classGroup?.message ?? (groupsQuery.error ? "Couldn't load class groups" : undefined)}
              {...register("classGroup")} />
            <FormSelect label="Term" placeholder={termsQuery.isLoading ? "Loading terms..." : "Select term"}
              options={termOptions} isLoading={busy}
              error={errors.term?.message ?? (termsQuery.error ? "Couldn't load terms" : undefined)}
              {...register("term")} />
          </div>
          <div className="flex items-center gap-4">
            <SubmitButton label="Load Summary" isLoading={busy} className="w-50" />
            {data && <ActiveFiltersBar filters={[{ label: data.className }, { label: data.term }]} />}
          </div>
        </form>
      </motion.div>

      {renderBody()}
    </div>
  );
};

export default AttendanceSummariesPage;