import React from "react";
import { Download, Info, CheckCircle2, Circle } from "lucide-react";
import Button from "@/shared/ui/Button";
import type { BulkUploadConfig } from "../../../types/BulkUpload";

interface DownloadTemplateStepProps {
  config: BulkUploadConfig;
  onCancel: () => void;
  onContinue: () => void;
}

const DownloadTemplateStep: React.FC<DownloadTemplateStepProps> = ({ config, onCancel, onContinue }) => (
  <div className="flex flex-col gap-5">
    <div className="border border-border-line02 rounded-xl py-10 px-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-bg-input flex-center mb-4">
        <Download className="text-brand-primary" size={20} />
      </div>
      <h3 className="font-semibold text-text-primary mb-1">Start with the Schoolzy template</h3>
      <p className="text-body-small text-text-secondary max-w-sm mb-5">
        Download the {config.entityLabel.toLowerCase()} template, enter the {config.entityLabel.toLowerCase()} information, then upload the completed file.
      </p>
      <Button
        variant="primary"
        leftIcon={<Download size={16} />}
        onClick={() => {
          // TODO: Replace with actual template download
          console.log(`Downloading ${config.templateFileName}`);
        }}
      >
        Download {config.entityLabel} Template
      </Button>
      <span className="text-xs text-text-muted mt-3">Supported formats: .XLSX and .CSV</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="border border-border-line02 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-danger" />
          <span className="text-xs font-semibold tracking-wide text-text-nav">REQUIRED FIELDS</span>
        </div>
        <ul className="flex flex-col gap-2">
          {config.requiredFields.map((field) => (
            <li key={field} className="flex items-center gap-2 text-sm text-text-secondary">
              <CheckCircle2 size={15} className="text-success shrink-0" />
              {field}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-border-line02 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-brand-primary" />
          <span className="text-xs font-semibold tracking-wide text-text-nav">OPTIONAL FIELDS</span>
        </div>
        <ul className="flex flex-col gap-2">
          {config.optionalFields.map((field) => (
            <li key={field} className="flex items-center gap-2 text-sm text-text-secondary">
              <Circle size={13} className="text-text-muted shrink-0" />
              {field}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="flex items-start gap-2 bg-bg-input rounded-lg px-4 py-3">
      <Info size={16} className="text-brand-primary shrink-0 mt-0.5" />
      <p className="text-body-small text-text-secondary">
        Do not change the column names in the template. This helps Schoolzy correctly import your data.
      </p>
    </div>

    <div className="flex items-center justify-between pt-2 border-t border-border-line02">
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button variant="primary" onClick={onContinue}>Continue to Upload</Button>
    </div>
  </div>
);

export default DownloadTemplateStep;