import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slideFromRight, slideFromLeft } from "../animations/variants";
import { useGradesList, useAddGrade, useDeleteGrade } from "../hooks/useAcademics";
import { SECTION_OPTIONS } from "../types";
import type { Grade, GradeRemark, SchoolSection } from "../types";
import AcademicsListPanel from "../components/shared/AcademicsListPanel";
import DeleteButton from "../components/shared/DeleteButton";
import PageHeader from "@/shared/ui/PageHeader";
import FormHeader from "../components/shared/FormHeader";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import { fieldFadeUp } from "@/shared/utils/animations";
import SectionBadge from "../components/shared/SectionBadge";

const schema = z.object({
  caption: z.string().min(1, "Caption is required"),
  minScore:z.number().min(0).max(100),
  maxScore: z.number().min(0).max(100),
  remark: z.string().min(1, "Remark is required"),
  section: z.enum(["Nursery", "Primary", "Junior Secondary", "Senior Secondary"], { message: "Please select a section" }),
});
type FormValues = z.infer<typeof schema>;

const PRESET_REMARKS: GradeRemark[] = ["Excellent", "Very Good", "Good", "Average", "Pass", "Fail"];

const remarkBadgeColor = (remark: string) => {
  const map: Record<string, string> = {
    Excellent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    "Very Good": "text-blue-600 bg-blue-50 border-blue-200",
    Good: "text-violet-600 bg-violet-50 border-violet-200",
    Average: "text-orange-500 bg-orange-50 border-orange-200",
    Pass: "text-yellow-600 bg-yellow-50 border-yellow-200",
    Fail: "text-danger bg-red-50 border-red-200",
  };
  return map[remark] ?? "text-text-secondary bg-gray-50 border-border-line02";
};

const GradePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<SchoolSection | "All">("All");
  const [customRemark, setCustomRemark] = useState("");

  const { data, isLoading } = useGradesList(page, search, section);
  const addMutation = useAddGrade();
  const deleteMutation = useDeleteGrade();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { caption: "", minScore: 0, maxScore: 100, remark: "", section: "Senior Secondary" },
  });

  const onSubmit = (values: FormValues) => {
    addMutation.mutate(values, {
      onSuccess: () => { reset(); setCustomRemark(""); },
    });
  };

  const columns = [
    {
      key: "num",
      header: "#",
      className: "w-12",
      render: (_: Grade, i: number) => (
        <span className="text-text-muted text-xs">{String((page - 1) * 8 + i + 1).padStart(2, "0")}</span>
      ),
    },
    {
      key: "caption",
      header: "Caption",
      render: (row: Grade) => <span className="font-bold text-text-nav">{row.caption}</span>,
    },
    {
      key: "minScore",
      header: "Min Score",
      render: (row: Grade) => <span className="font-semibold">{row.minScore}</span>,
    },
    {
      key: "maxScore",
      header: "Max Score",
      render: (row: Grade) => <span className="font-semibold">{row.maxScore}</span>,
    },
    {
      key: "range",
      header: "Range",
      render: (row: Grade) => <span className="text-text-secondary">{row.minScore} - {row.maxScore}</span>,
    },
    {
      key: "remark",
      header: "Remark",
      render: (row: Grade) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold font-lato border ${remarkBadgeColor(row.remark)}`}>
          {row.remark}
        </span>
      ),
    },
    {
      key: "section",
      header: "Section",
      render: (row: Grade) => <SectionBadge section={row.section} />,
    },
    {
      key: "action",
      header: "Action",
      className: "text-right",
      render: (row: Grade) => (
        <div className="flex justify-end">
          <DeleteButton onConfirm={() => deleteMutation.mutate(row.id)} isLoading={deleteMutation.isPending} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Grades"
        subtitle="Define grading boundaries and remarks per school section"
        addLabel="Add Grade"
        onAdd={() => document.getElementById("grade-caption-input")?.focus()}
      />

      <div className="grid xl:grid-cols-[380px_1fr] gap-5">
        {/* Form */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden" animate="show"
          className="bg-white rounded-2xl card-shadow h-fit">
          <FormHeader
            title="Add Grade"
            icon={<Plus className="w-3.5 h-3.5 text-brand-primary" />}
          />
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col p-5 gap-4">
            <div className="flex flex-col gap-1">
              <FormInput
                  label="Caption"
                  id="grade-caption-input"
                  placeholder="e.g. A1, B2, Excellent"
                  isLoading={addMutation.isPending}
                  error={errors.caption?.message}
                  {...register("caption")}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <FormInput
                  label="Min Score"
                  type="number"
                  min={0}
                  max={0}
                  placeholder="0"
                  isLoading={addMutation.isPending}
                  error={errors.caption?.message}
                  {...register("minScore", {valueAsNumber: true})}
              />
              </div>
              <div className="flex flex-col gap-1">
                <FormInput
                  label="Max Score"
                  type="number"
                  min={0}
                  max={0}
                  placeholder="100"
                  isLoading={addMutation.isPending}
                  error={errors.maxScore?.message}
                  {...register("maxScore", {valueAsNumber: true})}
              />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-label leading-4.5 tracking-wide">Remark</label>
              <Controller
                control={control}
                name="remark"
                render={({ field }) => (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_REMARKS.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => { field.onChange(r); setCustomRemark(""); }}
                          className={`px-3 py-1 rounded-full text-xs font-semibold font-lato border transition-all ${
                            field.value === r
                              ? "bg-brand-primary text-white border-brand-primary"
                              : "bg-white border-border-line02 text-text-secondary hover:border-brand-primary/40"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    <input
                      value={customRemark}
                      onChange={(e) => { setCustomRemark(e.target.value); field.onChange(e.target.value); }}
                      placeholder="Or type a custom remark…"
                      className="w-full rounded-2xl border px-3 py-3 text-sm transition focus:outline-none focus:ring-1 bg-bg-input placeholder:text-text-muted placeholder:font-lato placeholder:text-[13px] border-border-line02 focus:border-brand-primary focus:ring-brand-hover"
                    />
                  </>
                )}
              />
              {errors.remark && <p className="text-xs text-danger">{errors.remark.message}</p>}
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
                label="Add Grade"
                isLoading={addMutation.isPending} />
            </motion.div>
          </form>
        </motion.div>

        {/* List */}
        <motion.div variants={slideFromRight} initial="hidden" animate="show">
          <AcademicsListPanel
            title="Grades List"
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
            searchPlaceholder="Search grades…"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GradePage;