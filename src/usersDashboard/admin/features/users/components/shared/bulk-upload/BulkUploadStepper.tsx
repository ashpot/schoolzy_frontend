import React from "react";
import { Check } from "lucide-react";
import type { BulkUploadStep } from "../../../types/BulkUpload";

const STEPS = [
  { id: 1, label: "Download Template" },
  { id: 2, label: "Upload File" },
  { id: 3, label: "Review & Import" },
] as const;

interface BulkUploadStepperProps {
  currentStep: BulkUploadStep;
}

const BulkUploadStepper: React.FC<BulkUploadStepperProps> = ({ currentStep }) => (
  <div className="flex items-center bg-bg-input rounded-xl px-4 py-3">
    {STEPS.map((step, i) => {
      const isDone = currentStep > step.id;
      const isActive = currentStep === step.id;
      return (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                isDone ? "bg-success text-white" : isActive ? "bg-brand-primary text-white" : "bg-white border border-border-line02 text-text-muted"
              }`}
            >
              {isDone ? <Check size={13} /> : step.id}
            </div>
            <span className={`text-sm font-medium whitespace-nowrap ${isActive ? "text-brand-primary" : isDone ? "text-success" : "text-text-muted"}`}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-3 ${isDone ? "bg-success" : "bg-border-line02"}`} />}
        </React.Fragment>
      );
    })}
  </div>
);

export default BulkUploadStepper;