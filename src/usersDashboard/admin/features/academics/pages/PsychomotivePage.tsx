import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { slideFromRight, slideFromLeft } from "../animations/variants";
import { useSectionsList } from "../hooks/useAcademics";
import {
  useAddPsychomotiveMetric,
  useDeletePsychomotiveMetric,
  useEditPsychomotiveMetric,
} from "../hooks/usePsychomotive";
import { psychomotiveMetricSchema, type PsychomotiveMetricFormValues } from "../schemas";
import type { PsychomotiveItem } from "../types/psychomotive";
import AcademicsListPanel from "../components/shared/AcademicsListPanel";
import DeleteButton from "../components/shared/DeleteButton";
import EditModal, { type EditField } from "@/shared/modal/EditModal";
import PageHeader from "@/shared/ui/PageHeader";
import FormHeader from "../components/shared/FormHeader";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import SectionBadge from "../components/shared/SectionBadge";
import { fieldFadeUp } from "@/shared/utils/animations";
import EditButton from "@/shared/ui/EditButton";

const PER_PAGE = 8;

const PSYCH_EDIT_FIELDS: EditField<PsychomotiveItem>[] = [
  { key: "title", label: "Title" },
];

const PsychomotivePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<string>("All"); // section id as string, or "All"
  const [items, setItems] = useState<PsychomotiveItem[]>([]); // session-only: GET list is broken (500)
  const [editingMetric, setEditingMetric] = useState<PsychomotiveItem | null>(null);

  const sectionsQuery = useSectionsList();
  const addMutation = useAddPsychomotiveMetric();
  const deleteMutation = useDeletePsychomotiveMetric();
  const editMutation = useEditPsychomotiveMetric();

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
      onSuccess: (res) => {
        const title = sectionsQuery.data?.find((s) => s.id === res.section)?.title ?? "Unknown";
        setItems((prev) => [
          { id: String(res.id), title: res.title, section: title, sectionId: res.section },
          ...prev,
        ]);
        reset();
        setPage(1);
      },
    });
  };

  const handleSaveEdit = (updated: PsychomotiveItem) => {
    editMutation.mutate(
      { id: updated.id, title: updated.title },
      {
        onSuccess: () => {
          setItems((prev) => prev.map((i) => (i.id === updated.id ? { ...i, title: updated.title } : i)));
          setEditingMetric(null);
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => setItems((prev) => prev.filter((i) => i.id !== id)),
    });
  };

  // Client-side filter + pagination over the session list
  const filtered = useMemo(() => {
    let list = section === "All" ? items : items.filter((i) => String(i.sectionId) === section);
    if (search) list = list.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [items, section, search]);

  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
      render: (row: PsychomotiveItem) => (
        <div className="flex justify-end items-center gap-1">
          <EditButton onClick={() => setEditingMetric(row)} />
          <DeleteButton onConfirm={() => handleDelete(row.id)} isLoading={deleteMutation.isPending} />
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

            <motion.div variants={fieldFadeUp}>
              <SubmitButton label="Add Metric" isLoading={addMutation.isPending} />
            </motion.div>
          </form>
        </motion.div>

        {/* List (session-only until GET works) */}
        <motion.div variants={slideFromRight} initial="hidden" animate="show">
          <AcademicsListPanel
            title="Metrics List"
            count={filtered.length}
            columns={columns}
            data={pageItems}
            total={filtered.length}
            page={page}
            perPage={PER_PAGE}
            search={search}
            section={section}
            isLoading={false}
            onSearch={setSearch}
            onPageChange={setPage}
            onSectionChange={setSection}
            searchPlaceholder="Search metrics…"
          />
        </motion.div>
      </div>

      <EditModal<PsychomotiveItem>
        isOpen={editingMetric !== null}
        title="Psychomotive Metric"
        fields={PSYCH_EDIT_FIELDS}
        initialData={editingMetric}
        onSave={handleSaveEdit}
        onCancel={() => setEditingMetric(null)}
      />
    </div>
  );
};

export default PsychomotivePage;