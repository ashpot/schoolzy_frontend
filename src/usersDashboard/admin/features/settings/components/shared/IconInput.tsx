import React, { forwardRef } from "react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  hint?: string; // for inline label hints like "— page URL"
}

const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  ({ label, name, error, isLoading, icon, hint, className = "", ...props }, ref) => {
    const isDisabled = isLoading || props.disabled;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={name}
          className="text-xs font-semibold text-label leading-4.5 tracking-wide"
        >
          {label}
          {hint && (
            <span className="text-text-muted font-normal ml-1">{hint}</span>
          )}
        </label>

        <div className="relative">
          {/* Left icon */}
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
              {icon}
            </span>
          )}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            {icon}
          </span>

          <input
            id={name}
            name={name}
            ref={ref}
            disabled={isDisabled}
            className={`w-full rounded-2xl border pl-9 pr-3 py-4 text-sm transition
              focus:outline-none focus:ring-1 bg-bg-input
              placeholder:text-text-muted placeholder:font-lato placeholder:text-[13px]
              ${
                error
                  ? "border-border-danger focus:border-danger focus:ring-red-200"
                  : "border-border-line02 focus:border-brand-primary focus:ring-brand-hover"
              }
              disabled:cursor-not-allowed disabled:bg-gray-100
              ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs text-danger mt-0.5" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

IconInput.displayName = "IconInput";

export default IconInput;