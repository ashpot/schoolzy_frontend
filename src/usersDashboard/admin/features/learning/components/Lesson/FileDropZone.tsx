import { useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";

interface FileDropZoneProps {
  file: File | null;
  error?: string;
  disabled?: boolean;
  onSelect: (file: File) => void;
}

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export default function FileDropZone({ file, error, disabled, onSelect }: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const zoneClass = dragOver
    ? "border-brand-primary bg-blue-50"
    : file
    ? "border-green-400 bg-green-50"
    : error
    ? "border-danger bg-red-50"
    : "border-border-line02 bg-bg-input hover:border-brand-primary hover:bg-blue-50";

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && !disabled) onSelect(f);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-label mb-1.5">
        File <span className="text-danger">*</span>
      </label>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${zoneClass}`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          disabled={disabled}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onSelect(f); }}
        />
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-green-700">{file.name}</p>
            <p className="text-xs text-green-600">{formatSize(file.size)}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex-center">
              <Upload className="w-5 h-5 text-brand-primary" />
            </div>
            <p className="text-sm text-text-secondary">
              Drop file here or <span className="text-brand-primary font-medium">click to browse</span>
            </p>
            <p className="text-xs text-text-muted">PDF, DOC, DOCX, PPT — max 20 MB</p>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}