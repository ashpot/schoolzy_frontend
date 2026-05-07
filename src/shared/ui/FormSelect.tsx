import React, { forwardRef } from "react";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  error?: string;
  isLoading?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, name, error, isLoading, options, placeholder, className = "", ...props }, ref) => {
    const isDisabled = isLoading || props.disabled;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={name}
            className="text-xs font-semibold text-label leading-4.5 tracking-wide"
          >
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          ref={ref}
          disabled={isDisabled}
          className={`w-full rounded-2xl border px-3 py-3 md:py-4 text-sm transition
            focus:outline-none focus:ring-1 bg-bg-input text-text-primary
            disabled:cursor-not-allowed disabled:bg-gray-100
            ${
              error
                ? "border-border-danger focus:border-danger focus:ring-red-200"
                : "border-border-line02 focus:border-brand-primary focus:ring-brand-hover"
            }
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" className="text-text-muted">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-danger mt-0.5" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;