import { useRef, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import { UploadCloud, Download, FileText, X } from "lucide-react";

interface Props {
  control: Control<{ file: File | null }>;
  disabled: boolean;
  onDownloadTemplate: () => void;
  isDownloading: boolean;
}

export default function CsvUploadZone({ control, disabled, onDownloadTemplate, isDownloading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Controller
      name="file"
      control={control}
      render={({ field: { value, onChange } }) => {
        const handleFiles = (fileList: FileList | null) => {
          const file = fileList?.[0];
          if (file && file.name.endsWith(".csv")) onChange(file);
        };

        return (
          <div className="bg-white rounded-2xl card-shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="section-title">CSV File Upload</h3>
                <p className="text-body-small text-text-secondary mt-1">Download the template first to get the correct format with student names pre-filled.</p>
              </div>
              <button
                type="button"
                onClick={onDownloadTemplate}
                disabled={isDownloading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-border-line02 hover:border-brand-primary hover:text-brand-primary transition-colors disabled:opacity-50"
              >
                <Download size={15} /> {isDownloading ? "Preparing..." : "Download Template"}
              </button>
            </div>

            {value ? (
              <div className="flex items-center justify-between rounded-xl border border-border-line02 bg-bg-input px-4 py-4">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-brand-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{value.name}</p>
                    <p className="text-xs text-text-muted">{(value.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button type="button" onClick={() => onChange(null)} disabled={disabled} className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors disabled:opacity-40">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
                className={`rounded-xl border-2 border-dashed px-6 py-16 flex flex-col items-center text-center cursor-pointer transition-colors ${
                  isDragging ? "border-brand-primary bg-blue-50" : "border-border-line02 hover:border-brand-primary/50"
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex-center mb-4">
                  <UploadCloud size={24} className="text-brand-primary" />
                </div>
                <h4 className="font-semibold text-text-primary">Upload CSV file</h4>
                <p className="text-body-small text-text-secondary mt-1">Drag & drop or click to browse · CSV files only</p>
                <p className="text-xs text-text-muted mt-1">Download the template first to ensure correct format</p>
                <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
              </div>
            )}
          </div>
        );
      }}
    />
  );
}