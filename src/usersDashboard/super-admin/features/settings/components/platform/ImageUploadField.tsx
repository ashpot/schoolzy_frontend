import { useRef } from "react";
import { Controller, type Control } from "react-hook-form";
import { Upload, X } from "lucide-react";
import type { BrandingValues } from "../../schemas";

interface ImageUploadFieldProps {
  control: Control<BrandingValues>;
  name: "logo" | "favicon" | "loginBg";
  label: string;
  hint: string;
  accept: string;
  currentUrl: string | null;
}

export default function ImageUploadField({ control, name, label, hint, accept, currentUrl }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-secondary">{label}</span>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = ""; // lets the same file be picked again
              if (file) field.onChange(file);
            }}
          />
          {field.value ? (
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border-line02 bg-bg-input px-4 py-5">
              <span className="truncate text-sm text-text-primary">{field.value.name}</span>
              <button type="button" aria-label={`Remove ${label}`} onClick={() => field.onChange(undefined)} className="text-text-muted hover:text-danger"><X size={16} /></button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex w-full flex-col items-center gap-1.5 rounded-2xl border border-dashed border-border-line03 px-4 py-6 text-center transition-colors hover:border-brand-primary"
            >
              {currentUrl ? <img src={currentUrl} alt={`Current ${label}`} className="mb-1 h-10 max-w-[160px] object-contain" /> : <Upload size={20} className="text-text-muted" aria-hidden />}
              <span className="text-sm font-medium text-text-primary">{currentUrl ? "Click to replace" : "Click to upload"}</span>
              <span className="text-xs text-text-muted">{hint}</span>
            </button>
          )}
          {fieldState.error && <p role="alert" className="mt-1 text-xs text-danger">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}