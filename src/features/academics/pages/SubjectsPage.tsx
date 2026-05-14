import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput as input, Plus } from "lucide-react";
import { pageFade, slideFromRight, slideFromLeft } from "../animations/variants";
import { useSubjectsList, useAddSubject, useDeleteSubject } from "../hooks/useAcademics";
import { SECTION_OPTIONS } from "../types";
import type { Subject, SchoolSection } from "../types";
import AcademicsListPanel from "../components/shared/AcademicsListPanel";
import SectionBadge from "../components/shared/SectionBadge";
import DeleteButton from "../components/shared/DeleteButton";
import PageHeader from "@/shared/ui/PageHeader";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import { fieldFadeUp } from "@/shared/utils/animations";
import FormInput from "@/shared/ui/FormInput";
import FormHeader from "../components/shared/FormHeader";

const schema = z.object({
  subjectName: z.string().min(2, "Subject name is required"),
  code: z.string().min(2, "Subject code is required"),
  section: z.enum(["Nursery", "Primary", "Junior Secondary", "Senior Secondary"], { message: "Please select a section" }),
  elective: z.boolean(),
});
type FormValues = z.infer<typeof schema>;

const SubjectsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<SchoolSection | "All">("All");

  const { data, isLoading } = useSubjectsList(page, search, section);
  const addMutation = useAddSubject();
  const deleteMutation = useDeleteSubject();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subjectName: "", code: "", section: "Primary", elective: false },
  });

  const onSubmit = (values: FormValues) => {
    addMutation.mutate(values, { onSuccess: () => reset() });
  };

  const columns = [
    {
      key: "num",
      header: "#",
      className: "w-12 text-text-muted",
      render: (_: Subject, i: number) => (
        <span className="text-text-muted text-xs">{String((page - 1) * 8 + i + 1).padStart(2, "0")}</span>
      ),
    },
    {
      key: "subjectName",
      header: "Subject Name",
      render: (row: Subject) => <span className="font-medium">{row.subjectName}</span>,
    },
    {
      key: "code",
      header: "Code",
      render: (row: Subject) => <span className="text-text-secondary font-mono text-xs">{row.code}</span>,
    },
    {
      key: "section",
      header: "Section",
      render: (row: Subject) => <SectionBadge section={row.section} />,
    },
    {
      key: "elective",
      header: "Elective",
      render: (row: Subject) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold font-lato ${row.elective ? "text-emerald-600 bg-emerald-50" : "text-text-muted bg-gray-100"}`}>
          {row.elective ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      className: "text-right",
      render: (row: Subject) => (
        <div className="flex justify-end">
          <DeleteButton onConfirm={() => deleteMutation.mutate(row.id)} isLoading={deleteMutation.isPending} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Subjects"
        subtitle="Manage curriculum subjects across all school sections"
        addLabel="Add Subject"
        onAdd={() => document.getElementById("subject-name-input")?.focus()}
      />
      <div className="grid xl:grid-cols-[380px_1fr] gap-5">
        {/* Form */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden" animate="show"
          className="bg-white rounded-2xl card-shadow h-fit border border-border-line04"
        >
          <FormHeader
            title="Add Subject"
            icon={<Plus className="w-3.5 h-3.5 text-brand-primary" />}
           />

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 p-5">
            <div className="flex flex-col gap-1">
                <FormInput
                  label="Subject Name"
                  placeholder="e.g. Mathematics"
                  isLoading={addMutation.isPending}
                  error={errors.subjectName?.message}
                  {...register("subjectName")}
                  />
            </div>

            <div className="flex flex-col gap-1">
              <FormInput
                  label="Subject Code"
                  placeholder="e.g. MAT-101"
                  isLoading={addMutation.isPending}
                  error={errors.code?.message}
                  {...register("code")}
                />
            </div>

            <div className="flex flex-col gap-1">
              <FormSelect
                label="Section" placeholder="Select..."
                options={SECTION_OPTIONS} isLoading={addMutation.isPending}
                error={errors.section?.message} {...register("section")}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input type="checkbox" {...register("elective")} className="sr-only peer" />
                <div className="w-4 h-4 rounded border-2 border-border-line02 bg-bg-input peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-colors flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-bg-input transition-opacity"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-nav font-lato">Elective Subject</p>
                <p className="text-xs text-text-muted mt-0.5">Mark if this subject is optional for students</p>
              </div>
            </label>

            <motion.div variants={fieldFadeUp}>
              <SubmitButton
                label="Add Subject"
                isLoading={addMutation.isPending} />
            </motion.div>
          </form>
        </motion.div>

        {/* List */}
        <motion.div variants={slideFromRight} initial="hidden" animate="show">
          <AcademicsListPanel
            title="Subjects List"
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
            searchPlaceholder="Search..."
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectsPage;