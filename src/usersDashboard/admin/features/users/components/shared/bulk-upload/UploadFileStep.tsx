import React, { useRef, useState } from "react";
import { UploadCloud, Download, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/shared/ui/Button";
import type { BulkUploadConfig } from "../../../types/BulkUpload";

interface UploadFileStepProps {
  config: BulkUploadConfig;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  onCancel: () => void;
  onBack: () => void;
  onContinue: () => void;
}

const UploadFileStep: React.FC<UploadFileStepProps> = ({ config, file, onFileSelect, onCancel, onBack, onContinue }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFileSelect(dropped);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-semibold text-text-primary">Upload {config.entityLabel} File</h3>
        <p className="text-body-small text-text-secondary mt-1">
          Upload the completed Schoolzy {config.entityLabel.toLowerCase()} template.
        </p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl py-14 px-6 flex flex-col items-center text-center cursor-pointer transition-colors ${
          isDragging ? "border-brand-primary bg-bg-input" : "border-border-line02"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.csv"
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
        />
        <div className="w-12 h-12 rounded-xl bg-bg-input flex-center mb-4">
          <UploadCloud className="text-brand-primary" size={20} />
        </div>
        {file ? (
          <p className="font-medium text-text-primary">{file.name}</p>
        ) : (
          <>
            <p className="font-medium text-text-primary">Drag and drop your file here</p>
            <p className="text-body-small text-text-secondary mt-1">
              or <span className="text-brand-primary underline">click to browse</span>
            </p>
          </>
        )}
        <span className="text-xs text-text-muted mt-3">Supported formats: .XLSX and .CSV · Maximum file size: 10 MB</span>
      </div>

      <button
        type="button"
        onClick={() => {
          // TODO: Replace with actual template download
          console.log(`Downloading ${config.templateFileName}`);
        }}
        className="flex items-center gap-2 text-sm text-brand-primary font-medium w-fit"
      >
        <Download size={14} /> Download Template
      </button>

      <div className="flex items-center justify-between pt-2 border-t border-border-line02">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<ArrowLeft size={15} />} onClick={onBack}>Back</Button>
          <Button variant="primary" rightIcon={<ArrowRight size={15} />} onClick={onContinue} disabled={!file}>
            Review Import
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadFileStep;