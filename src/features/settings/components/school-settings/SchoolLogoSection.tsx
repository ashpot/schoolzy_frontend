import { Upload, School } from "lucide-react";
import { useRef, useState } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { SchoolSettingsValues } from "../../schemas";

interface Props {
  control: Control<SchoolSettingsValues>;
}

export default function SchoolLogoSection({ control }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <Controller
      name="logo"
      control={control}
      render={({ field }) => (
        <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) { handleFile(file); field.onChange(file); }
            }}
            onClick={() => inputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all
              ${dragging ? "border-brand-primary bg-blue-50/50" : "border-border-line02 bg-bg-input hover:border-brand-primary/50"}`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex-center">
              <Upload size={18} className="text-brand-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text-primary">Click or drag to upload</p>
              <p className="text-xs text-text-muted mt-0.5">PNG, JPG, SVG — max 5 MB</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) { handleFile(file); field.onChange(file); }
              }}
            />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Preview</p>
            <div className="w-24 h-24 rounded-xl border border-border-line02 bg-bg-input flex-center">
              {preview
                ? <img src={preview} alt="Logo preview" className="w-full h-full object-contain rounded-xl" />
                : <School size={28} className="text-text-muted/40" />
              }
            </div>
          </div>
        </div>
      )}
    />
  );
}