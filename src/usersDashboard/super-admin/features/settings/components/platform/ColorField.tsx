import { Controller, type Control } from "react-hook-form";
import type { BrandingValues } from "../../schemas";

interface ColorFieldProps {
  control: Control<BrandingValues>;
  name: "primaryColor" | "secondaryColor" | "accentColor";
  label: string;
}

const VALID = /^#[0-9A-Fa-f]{6}$/;

export default function ColorField({ control, name, label }: ColorFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const valid = VALID.test(field.value);
        return (
          <div>
            <label htmlFor={`sa-${name}`} className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-secondary">{label}</label>
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border-line03" style={{ backgroundColor: valid ? field.value : "transparent" }}>
                <input
                  type="color"
                  aria-label={`${label} picker`}
                  value={valid ? field.value.toLowerCase() : "#000000"}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </span>
              <input
                id={`sa-${name}`}
                ref={field.ref}
                name={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                onBlur={field.onBlur}
                maxLength={7}
                autoComplete="off"
                aria-invalid={Boolean(fieldState.error)}
                className="w-full rounded-xl border border-border-line02 bg-bg-input px-4 py-3 font-mono text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
            {fieldState.error && <p role="alert" className="mt-1 text-xs text-danger">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}