import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { fadeUp } from "../animations/variants";
import ImportFiltersForm from "../components/import-scores/ImportFiltersForm";
import CsvUploadZone from "../components/import-scores/CsvUploadZone";
import { useUploadCsv, useDownloadTemplate } from "../hooks/useImportScores";
import type { ImportScoresFiltersValues } from "../schemas";
import SubmitButton from "@/shared/ui/SubmitButton";

export default function ImportScoresPage() {
  const [filters, setFilters] = useState<ImportScoresFiltersValues>({ classId: "", subjectId: "", term: "" });
  const { control, handleSubmit, watch, setValue } = useForm<{ file: File | null }>({ defaultValues: { file: null } });
  const file = watch("file");

  const uploadCsv = useUploadCsv();
  const downloadTemplate = useDownloadTemplate();

  const filtersComplete = filters.classId && filters.subjectId && filters.term;

  const onSubmit = handleSubmit((values) => {
    if (!values.file || !filtersComplete) return;
    uploadCsv.mutate({ ...filters, file: values.file }, { onSuccess: () => setValue("file", null) });
  });

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Import Results via CSV</h1>
        <p className="text-body-small text-text-secondary mt-1">Upload a CSV file with student scores. Download the template first to ensure the correct format.</p>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6">
        <ImportFiltersForm values={filters} onChange={setFilters} />
      </div>

      <CsvUploadZone
        control={control}
        disabled={uploadCsv.isPending}
        onDownloadTemplate={() => downloadTemplate.mutate({ classId: filters.classId, subjectId: filters.subjectId })}
        isDownloading={downloadTemplate.isPending}
      />

      {file && filtersComplete && (
        <form onSubmit={onSubmit} noValidate>
          <SubmitButton label="Upload and Save Scores" isLoading={uploadCsv.isPending} />
        </form>
      )}
    </motion.div>
  );
}