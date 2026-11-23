import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

const TRACK =
  "relative h-6 w-11 shrink-0 rounded-full bg-sa-gray-line transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-brand-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary/40 peer-disabled:opacity-50";

interface ToggleRowProps extends InputHTMLAttributes<HTMLInputElement> {
  heading: string;
  description?: string;
}

// Works with react-hook-form's register()
export const ToggleRow = forwardRef<HTMLInputElement, ToggleRowProps>(({ heading, description, ...rest }, ref) => (
  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border-line02 px-5 py-4">
    <span>
      <span className="block text-sm font-semibold text-text-primary">{heading}</span>
      {description && <span className="mt-0.5 block text-xs text-text-muted">{description}</span>}
    </span>
    <input ref={ref} type="checkbox" className="peer sr-only" {...rest} />
    <span className={TRACK} aria-hidden />
  </label>
));
ToggleRow.displayName = "ToggleRow";

interface SwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}

// Controlled switch for state that isn't part of a form
export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-50", checked ? "bg-brand-primary" : "bg-sa-gray-line")}
    >
      <span className={cn("absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform", checked && "translate-x-5")} />
    </button>
  );
}