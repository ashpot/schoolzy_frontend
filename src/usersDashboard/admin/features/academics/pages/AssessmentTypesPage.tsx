import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { slideFromRight, slideFromLeft } from "../animations/variants";
import { useAssessmentTypesList, useAddAssessmentType, useDeleteAssessmentType, useSectionsList } from "../hooks/useAcademics";
import { assessmentTypeSchema, type AssessmentTypeFormValues } from "../schemas";
import type { AssessmentType } from "../types";
import AcademicsListPanel from "../components/shared/AcademicsListPanel";
import DeleteButton from "../components/shared/DeleteButton";
import PageHeader from "@/shared/ui/PageHeader";
import FormSelect from "@/shared/ui/FormSelect";
import FormInput from "@/shared/ui/FormInput";
import { fieldFadeUp } from "@/shared/utils/animations";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../components/shared/FormHeader";
import SectionBadge from "../components/shared/SectionBadge";

const AssessmentTypesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<string | "All">("All");

  const { data, isLoading } = useAssessmentTypesList(page, search, section);
  const { data: sections, isLoading: sectionsLoading } = useSectionsList();
  const addMutation = useAddAssessmentType();
  const deleteMutation = useDeleteAssessmentType();

  const sectionOptions = (sections ?? []).map((s) => ({
    value: String(s.id),
    label: s.title,
  }));

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AssessmentTypeFormValues>({
    resolver: zodResolver(assessmentTypeSchema),
    defaultValues: { name: "", section: "", code: "", terminalPercent: 0, baseMark: 100, weekly: false },
  });

  const onSubmit = (values: AssessmentTypeFormValues) => {
    addMutation.mutate(values, { onSuccess: () => reset() });
  };

  const columns = [
    {
      key: "num",
      header: "#",
      className: "w-12",
      render: (_: AssessmentType, i: number) => (
        <span className="text-text-muted text-xs">{String((page - 1) * 8 + i + 1).padStart(2, "0")}</span>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (row: AssessmentType) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: "section",
      header: "Section",
      render: (row: AssessmentType) => <SectionBadge section={row.section} />,
    },
    {
      key: "code",
      header: "Code",
      render: (row: AssessmentType) => <span className="font-mono text-xs text-text-secondary">{row.code}</span>,
    },
    {
      key: "baseMark",
      header: "Base Mark",
      render: (row: AssessmentType) => <span className="font-semibold">{row.baseMark}</span>,
    },
    {
      key: "terminalPercent",
      header: "Terminal %",
      render: (row: AssessmentType) => <span className="font-semibold">{row.terminalPercent}%</span>,
    },
    {
      key: "weekly",
      header: "Weekly",
      render: (row: AssessmentType) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold font-lato ${row.weekly ? "text-emerald-600 bg-emerald-50" : "text-danger/80 bg-red-50"}`}>
          {row.weekly ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      className: "text-right",
      render: (row: AssessmentType) => (
        <div className="flex justify-end">
          <DeleteButton onConfirm={() => deleteMutation.mutate(row.id)} isLoading={deleteMutation.isPending} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
          title="Assessment Types"
          subtitle="Define and manage assessment categories per school section"
          addLabel="Add Assessment Type"
          onAdd={() => document.getElementById("at-name-input")?.focus()}
      />

      <div className="grid xl:grid-cols-[380px_1fr] gap-5">
        {/* Form */}
        <motion.div variants={slideFromLeft} initial="hidden" animate="show" className="bg-white rounded-2xl card-shadow h-fit">
            <FormHeader
              title="Add Assessment Type"
              icon={<Plus className="w-3.5 h-3.5 text-brand-primary" />}
            />

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col p-5 gap-4">
            <div className="flex flex-col gap-1">
              <FormInput
                label="Name"
                placeholder="e.g. Classwork, Test, Exam…"
                isLoading={addMutation.isPending}
                error={errors.name?.message}
                {...register("name")}
                id="at-name-input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <FormSelect
                label="Section"
                placeholder={sectionsLoading ? "Loading sections..." : "Select..."}
                options={sectionOptions}
                isLoading={addMutation.isPending || sectionsLoading}
                error={errors.section?.message}
                {...register("section")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <FormInput
                label="Code"
                placeholder="E.G. CW, TST, EXM…"
                isLoading={addMutation.isPending}
                error={errors.code?.message}
                {...register("code")}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-label leading-4.5 tracking-wide">Terminal %</label>
                <div className="relative">
                  <input
                    {...register("terminalPercent", { valueAsNumber: true })}
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0–100"
                    className="w-full rounded-2xl border px-3 py-4 pr-7 text-sm transition focus:outline-none focus:ring-1 bg-bg-input placeholder:text-text-muted border-border-line02 focus:border-brand-primary focus:ring-brand-hover"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">%</span>
                </div>
                {errors.terminalPercent && <p className="text-xs text-danger mt-0.5">{errors.terminalPercent.message}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <FormInput
                  type="number"
                  label="Base Mark"
                  min={0}
                  placeholder="e.g. 100"
                  isLoading={addMutation.isPending}
                  error={errors.baseMark?.message}
                  {...register("baseMark", { valueAsNumber: true })}
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-border-line02 hover:border-brand-primary/30 transition-colors">
              <div className="relative mt-0.5">
                <input type="checkbox" {...register("weekly")} className="sr-only peer" />
                <div className="w-4 h-4 rounded border-2 border-border-line02 bg-bg-input peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-colors flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-nav font-lato">Weekly Assessment</p>
                <p className="text-xs text-text-muted mt-0.5">Mark if this assessment type recurs weekly</p>
              </div>
            </label>

            <motion.div variants={fieldFadeUp}>
              <SubmitButton
                label="Add Assessment Type"
                isLoading={addMutation.isPending} />
            </motion.div>
          </form>
        </motion.div>

        {/* List */}
        <motion.div variants={slideFromRight} initial="hidden" animate="show">
          <AcademicsListPanel
            title="Assessment Types List"
            count={data?.total ?? 0}
            columns={columns}
            data={data?.items ?? []}
            total={data?.total ?? 0}
            page={page}
            search={search}
            section={section}
            isLoading={isLoading}
            onSearch={setSearch}
            onPageChange={setPage}
            onSectionChange={setSection}
            searchPlaceholder="Search types…"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AssessmentTypesPage;