import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { slideFromRight, slideFromLeft } from "../animations/variants";
import { useSectionsList } from "../hooks/useAcademics";
import { useAddPsychomotiveMetric, usePsychomotiveList } from "../hooks/usePsychomotive";
import { psychomotiveMetricSchema, type PsychomotiveMetricFormValues } from "../schemas";
import type { PsychomotiveItem } from "../types/psychomotive";
import AcademicsListPanel from "../components/shared/AcademicsListPanel";
import PageHeader from "@/shared/ui/PageHeader";
import FormHeader from "../components/shared/FormHeader";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import SectionBadge from "../components/shared/SectionBadge";
import { fieldFadeUp } from "@/shared/utils/animations";
import EditButton from "@/shared/ui/EditButton";

const PER_PAGE = 8;

const PsychomotivePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<string>("All"); // section id as string, or "All"
  const [notice, setNotice] = useState<string | null>(null);

  const sectionsQuery = useSectionsList();
  const { data, isLoading, isError, refetch } = usePsychomotiveList(page, search, section);
  const addMutation = useAddPsychomotiveMetric();

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const sectionOptions = useMemo(
    () => (sectionsQuery.data ?? []).map((s) => ({ value: String(s.id), label: s.title })),
    [sectionsQuery.data]
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PsychomotiveMetricFormValues>({
    resolver: zodResolver(psychomotiveMetricSchema),
    defaultValues: { title: "", section: "" },
  });

  const onSubmit = (values: PsychomotiveMetricFormValues) => {
    addMutation.mutate(values, {
      onSuccess: () => { reset(); setPage(1); },
    });
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      className: "w-28",
      render: (row: PsychomotiveItem) => <span className="font-mono text-xs text-text-muted">{row.id}</span>,
    },
    {
      key: "title",
      header: "Title",
      render: (row: PsychomotiveItem) => <span className="font-medium">{row.title}</span>,
    },
    {
      key: "section",
      header: "Section",
      render: (row: PsychomotiveItem) => <SectionBadge section={row.section} />,
    },
    {
      key: "action",
      header: "Action",
      className: "text-right",
      render: () => (
        <div className="flex justify-end items-center gap-1">
          {/* TODO: no update endpoint yet. Wire api.patch once available */}
          <EditButton onClick={() => setNotice("Editing metrics isn't available yet.")} />
          {/* TODO: no delete endpoint yet. Wire api.delete once available */}
          <button
            type="button"
            onClick={() => setNotice("Deleting metrics isn't available yet.")}
            className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Psychomotive Evaluations"
        subtitle="Manage psychomotive evaluation metrics per school section"
        addLabel="Add Metric"
        onAdd={() => document.getElementById("psych-title-input")?.focus()}
      />

      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2.5 mb-4 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-700"
        >
          <Info size={14} /> {notice}
        </motion.div>
      )}

      <div className="grid xl:grid-cols-[380px_1fr] gap-5">
        <motion.div
          variants={slideFromLeft}
          initial="hidden" animate="show"
          className="bg-white rounded-2xl card-shadow h-fit">
          <FormHeader
            title="Add Psych Evaluation Metric"
            icon={<Plus className="w-3.5 h-3.5 text-brand-primary" />}
          />
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col p-5 gap-4">
            <FormInput
              label="Title"
              placeholder="e.g. Fine motor skills"
              isLoading={addMutation.isPending}
              error={errors.title?.message}
              id="psych-title-input"
              {...register("title")}
            />

            <FormSelect
              label="Section"
              placeholder={sectionsQuery.isLoading ? "Loading sections..." : "Select..."}
              options={sectionOptions}
              isLoading={addMutation.isPending || sectionsQuery.isLoading}
              error={errors.section?.message}
              {...register("section")}
            />

            {addMutation.isError && (
              <p className="text-xs text-danger">{addMutation.error.message}</p>
            )}

            <motion.div variants={fieldFadeUp}>
              <SubmitButton label="Add Metric" isLoading={addMutation.isPending} />
            </motion.div>
          </form>
        </motion.div>

        <motion.div variants={slideFromRight} initial="hidden" animate="show">
          {isError ? (
            <div className="bg-white rounded-2xl card-shadow py-16 text-center">
              <p className="text-sm text-danger">Couldn't load metrics.</p>
              <button type="button" onClick={() => refetch()} className="text-xs text-brand-primary hover:underline mt-1">
                Try again
              </button>
            </div>
          ) : (
            <AcademicsListPanel
              title="Metrics List"
              count={data?.total ?? 0}
              columns={columns}
              data={data?.items ?? []}
              total={data?.total ?? 0}
              page={page}
              perPage={PER_PAGE}
              search={search}
              section={section}
              isLoading={isLoading}
              onSearch={setSearch}
              onPageChange={setPage}
              onSectionChange={setSection}
              searchPlaceholder="Search metrics…"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PsychomotivePage;