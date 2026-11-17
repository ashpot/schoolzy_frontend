import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Upload, X } from "lucide-react";
import type { CreateSchoolInput } from "../../schemas";

export default function LogoUploadField() {
  const { control } = useFormContext<CreateSchoolInput>();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name="logo"
      render={({ field, fieldState }) => (
        <div>
          <span className="mb-1.5 block text-sm font-medium text-label">School Logo</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = ""; // lets the same file be picked again after removing it
              if (file) field.onChange(file);
            }}
          />
          {field.value ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border-line02 bg-bg-input px-4 py-3">
              <span className="truncate text-sm text-text-primary">{field.value.name}</span>
              <button
                type="button"
                aria-label="Remove logo"
                onClick={() => field.onChange(undefined)}
                className="text-text-muted hover:text-danger"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border-line03 bg-bg-input py-3 text-sm text-text-muted transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              <Upload size={16} aria-hidden /> Upload Logo
            </button>
          )}
          {fieldState.error && (
            <p role="alert" className="mt-1 text-xs text-danger">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}