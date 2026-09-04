import React from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/shared/ui/Button";
import type { BulkUploadConfig } from "../../../types/BulkUpload";

interface ImportSuccessStepProps {
  config: BulkUploadConfig;
  result: { imported: number; skipped: number };
  onDone: () => void;
  onViewList: () => void;
}

const ImportSuccessStep: React.FC<ImportSuccessStepProps> = ({ config, result, onDone, onViewList }) => (
  <div className="flex flex-col items-center text-center py-6">
    <div className="w-14 h-14 rounded-full bg-success/10 flex-center mb-4">
      <CheckCircle2 className="text-success" size={28} />
    </div>
    <h3 className="text-lg font-semibold text-text-primary">{config.entityLabelPlural} Imported Successfully</h3>
    <p className="text-body-small text-text-secondary mt-1">
      {result.imported} {config.entityLabel.toLowerCase()}{result.imported === 1 ? "" : "s"} have been added to the school.
    </p>

    <div className="grid grid-cols-2 gap-3 mt-5 w-full max-w-xs">
      <div className="rounded-xl bg-success/10 px-4 py-3">
        <p className="text-2xl font-semibold text-success">{result.imported}</p>
        <p className="text-xs text-text-muted mt-0.5">Imported</p>
      </div>
      <div className="rounded-xl bg-danger/10 px-4 py-3">
        <p className="text-2xl font-semibold text-danger">{result.skipped}</p>
        <p className="text-xs text-text-muted mt-0.5">Skipped</p>
      </div>
    </div>

    <div className="flex items-center gap-3 mt-6">
      <Button variant="outline" onClick={onDone}>Done</Button>
      <Button variant="primary" onClick={onViewList}>View {config.entityLabelPlural}</Button>
    </div>
  </div>
);

export default ImportSuccessStep;