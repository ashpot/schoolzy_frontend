import React from "react";
import { Download, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/shared/ui/Button";
import ReviewRow from "./ReviewRow";
import type { BulkUploadConfig, ReviewFilter, ReviewRow as ReviewRowType } from "../../../types/BulkUpload";

interface ReviewImportStepProps {
  config: BulkUploadConfig;
  rows: ReviewRowType[];
  filter: ReviewFilter;
  onFilterChange: (filter: ReviewFilter) => void;
  readyCount: number;
  warningCount: number;
  errorCount: number;
  isImporting: boolean;
  onCancel: () => void;
  onBack: () => void;
  onImport: () => void;
}

const FILTERS: { key: ReviewFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ready", label: "Ready" },
  { key: "warnings", label: "Warnings" },
  { key: "errors", label: "Errors" },
];

const ReviewImportStep: React.FC<ReviewImportStepProps> = ({
  config, rows, filter, onFilterChange, readyCount, warningCount, errorCount, isImporting, onCancel, onBack, onImport,
}) => {
  const total = config.mockReviewData.length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-semibold text-text-primary">Review {config.entityLabel} Import</h3>
        <p className="text-body-small text-text-secondary mt-1">Review the records before adding them to Schoolzy.</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-xl bg-bg-input px-4 py-3">
          <p className="text-2xl font-semibold text-text-primary">{total}</p>
          <p className="text-xs text-text-muted mt-0.5">Total Rows</p>
        </div>
        <div className="rounded-xl bg-success/10 px-4 py-3">
          <p className="text-2xl font-semibold text-success">{readyCount}</p>
          <p className="text-xs text-text-muted mt-0.5">Ready to Import</p>
        </div>
        <div className="rounded-xl bg-warning/10 px-4 py-3">
          <p className="text-2xl font-semibold text-warning">{warningCount}</p>
          <p className="text-xs text-text-muted mt-0.5">Warnings</p>
        </div>
        <div className="rounded-xl bg-danger/10 px-4 py-3">
          <p className="text-2xl font-semibold text-danger">{errorCount}</p>
          <p className="text-xs text-text-muted mt-0.5">Errors</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-bg-input rounded-lg p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                filter === f.key ? "bg-white text-brand-primary shadow-sm" : "text-text-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            // TODO: Replace with actual error report download
            console.log("Downloading error report");
          }}
          className="flex items-center gap-2 text-sm text-text-secondary border border-border-line02 rounded-lg px-3 py-1.5 hover:bg-bg-soft transition-colors"
        >
          <Download size={14} /> Download Error Report
        </button>
      </div>

      <div className="border border-border-line02 rounded-xl overflow-hidden max-h-64 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-bg-input sticky top-0">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted text-xs">ROW</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted text-xs">{config.identifierLabel.toUpperCase()}</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted text-xs">{config.entityLabel.toUpperCase()} NAME</th>
              {config.reviewColumns.map((col) => (
                <th key={col.key} className="text-left px-4 py-2.5 font-medium text-text-muted text-xs">{col.header.toUpperCase()}</th>
              ))}
              <th className="text-left px-4 py-2.5 font-medium text-text-muted text-xs">ISSUE</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted text-xs">STATUS</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted text-xs">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <ReviewRow key={row.id} row={row} rowNumber={i + 1} columns={config.reviewColumns} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-line02">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<ArrowLeft size={15} />} onClick={onBack}>Back</Button>
          <Button variant="primary" rightIcon={<ArrowRight size={15} />} isLoading={isImporting} onClick={onImport}>
            Import {readyCount} {config.entityLabelPlural}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewImportStep;