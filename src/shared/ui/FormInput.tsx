import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  /** Pass mutation.isPending or any boolean to disable the input */
  isLoading?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, error, isLoading, className = '', type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    // Determine if the input is disabled
    const isDisabled = isLoading || props.disabled;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={name}
          className="text-xs font-semibold text-label leading-4.5 tracking-wide"
        >
          {label}
        </label>

        {/* Relative wrapper for positioning the toggle button */}
        <div className="relative">
          <input
            id={name}
            name={name}
            ref={ref}
            type={inputType}
            disabled={isDisabled}
            className={`w-full rounded-2xl border px-3 py-4 text-sm transition
              focus:outline-none focus:ring-1 bg-bg-input placeholder:text-text-muted placeholder:font-lato
              placeholder:text-[13px]
              ${
                error
                  ? 'border-border-danger focus:border-danger focus:ring-red-200 outline-none'
                  : 'border-border-line02 focus:border-brand-primary focus:ring-brand-hover'
              }
              disabled:cursor-not-allowed disabled:bg-gray-100
              ${isPassword ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />

          {/* Password toggle button (only for password fields) */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isDisabled}
              tabIndex={-1} // avoid focusing when tabbing through form
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700
                focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
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

FormInput.displayName = 'FormInput';

export default FormInput;