import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BulkUploadConfig, BulkUploadStep, ReviewFilter } from "../types/BulkUpload";

interface ImportResult {
  imported: number;
  skipped: number;
}

export const useBulkUpload = (config: BulkUploadConfig, queryKey: string) => {
  const [step, setStep] = useState<BulkUploadStep>(1);
  const [file, setFile] = useState<File | null>(null);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all");
  const queryClient = useQueryClient();

  const importMutation = useMutation<ImportResult, Error, void>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // return api.post(`/${queryKey}/bulk-import`, { file });
      await new Promise((r) => setTimeout(r, 1200));
      return { imported: config.mockImportedCount, skipped: config.mockSkippedCount };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setStep(4);
    },
  });

  const reset = () => {
    setStep(1);
    setFile(null);
    setReviewFilter("all");
    importMutation.reset();
  };

  const filteredRows = config.mockReviewData.filter((row) => {
    if (reviewFilter === "all") return true;
    if (reviewFilter === "ready") return row.status === "ready";
    if (reviewFilter === "warnings") return row.status === "warning";
    return row.status === "error";
  });

  return {
    step, file, reviewFilter, filteredRows,
    readyCount: config.mockReviewData.filter((r) => r.status === "ready").length,
    warningCount: config.mockReviewData.filter((r) => r.status === "warning").length,
    errorCount: config.mockReviewData.filter((r) => r.status === "error").length,
    setFile, setReviewFilter,
    goToUpload: () => setStep(2),
    goToDownload: () => setStep(1),
    goToReview: () => setStep(3),
    importMutation, reset,
  };
};