import React, { forwardRef } from "react";

// Variant styles
const variantStyles: Record<string, string> = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-hover focus:ring-brand-primary border-brand-primary",
  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 border-gray-200",
  outline:
    "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500 border-blue-600",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-red-600",
};

// Size styles
const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-base gap-2",
  lg: "px-6 py-3 text-lg gap-2.5",
};

// Common base styles
const baseStyles =
  "inline-flex items-center justify-center rounded font-semibold border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: keyof typeof variantStyles;
  /** Size preset */
  size?: keyof typeof sizeStyles;
  /** Show loading spinner (e.g., from useMutation.isPending) */
  isLoading?: boolean;
  /** Icon on the left side */
  leftIcon?: React.ReactNode;
  /** Icon on the right side */
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Reusable button with variants, sizes, icons, and loading state.
 * Perfectly integrates with TanStack Query (useMutation.isPending).
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {/* Left icon (or spinner if loading) */}
        {isLoading ? (
          <Spinner />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}

        {/* Label */}
        {children}

        {/* Right icon (hidden when loading to avoid clutter) */}
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Small spinner component (inline for simplicity)
const Spinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export default Button;