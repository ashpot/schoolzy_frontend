import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { pageFade, slideFromRight, slideFromLeft } from "../animations/variants";
import { usePsychomotiveList, useAddPsychomotive, useDeletePsychomotive } from "../hooks/useAcademics";
import { SECTION_OPTIONS } from "../types";
import type { PsychomotiveMetric, SchoolSection } from "../types";
import AcademicsListPanel from "../components/shared/AcademicsListPanel";
import SectionBadge from "@/features/users/components/shared/SectionBadge";
import DeleteButton from "../components/shared/DeleteButton";
import PageHeader from "@/shared/ui/PageHeader";
import FormHeader from "../components/shared/FormHeader";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import { fieldFadeUp } from "@/features/users/animations/variants";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  section: z.enum(["Nursery", "Primary", "Junior Secondary", "Senior Secondary"], {message: 'Please select a section...'}),
});
type FormValues = z.infer<typeof schema>;

const PsychomotivePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<SchoolSection | "All">("All");

  const { data, isLoading } = usePsychomotiveList(page, search, section);
  const addMutation = useAddPsychomotive();
  const deleteMutation = useDeletePsychomotive();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", section: "Nursery" },
  });

  const onSubmit = (values: FormValues) => {
    addMutation.mutate(values, { onSuccess: () => reset() });
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      className: "w-28",
      render: (row: PsychomotiveMetric) => <span className="font-mono text-xs text-text-muted">{row.id}</span>,
    },
    {
      key: "title",
      header: "Title",
      render: (row: PsychomotiveMetric) => <span className="font-medium">{row.title}</span>,
    },
    {
      key: "section",
      header: "Section",
      render: (row: PsychomotiveMetric) => <SectionBadge section={row.section} />,
    },
    {
      key: "action",
      header: "Action",
      className: "text-right",
      render: (row: PsychomotiveMetric) => (
        <div className="flex justify-end">
          <DeleteButton onConfirm={() => deleteMutation.mutate(row.id)} isLoading={deleteMutation.isPending} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Psychomotive Evaluations"
        subtitle="Manage psychomotice evaluation metrics per school section"
        addLabel="Add Metric"
        onAdd={() => document.getElementById("psych-title-input")?.focus()}
      />

      <div className="grid xl:grid-cols-[380px_1fr] gap-5">
        {/* Form */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden" animate="show"
          className="bg-white rounded-2xl card-shadow h-fit">
          <FormHeader
            title="Add Psych Evaluation Metric"
            icon={<Plus className="w-3.5 h-3.5 text-brand-primary" />}
          />
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col p-5 gap-4">
            <div className="flex flex-col gap-1">
              <FormInput
                  label="Title"
                  placeholder="e.g. Fine motor skills"
                  isLoading={addMutation.isPending}
                  error={errors.title?.message}
                  id="psych-title-input"
                  {...register("title")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <FormSelect
                label="Section" placeholder="Select..."
                options={SECTION_OPTIONS} isLoading={addMutation.isPending}
                error={errors.section?.message} {...register("section")}
              />
            </div>

             <motion.div variants={fieldFadeUp}>
              <SubmitButton
                label="Add Metrics"
                isLoading={addMutation.isPending} />
            </motion.div>
          </form>
        </motion.div>

        {/* List */}
        <motion.div variants={slideFromRight} initial="hidden" animate="show">
          <AcademicsListPanel
            title="Metrics List"
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
            searchPlaceholder="Search metrics…"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PsychomotivePage;