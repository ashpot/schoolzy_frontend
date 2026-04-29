import React from "react";

const variantClasses: Record<string, string> = {
  primary: "bg-blue-100 text-blue-800 border-blue-200",
  secondary: "bg-gray-100 text-gray-700 border-gray-200",
  outline:
    "bg-transparent text-blue-700 border-blue-400 hover:bg-blue-50",
  destructive: "bg-red-100 text-red-800 border-red-200",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  info: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

const dotColors: Record<string, string> = {
  primary: "bg-blue-600",
  secondary: "bg-gray-500",
  outline: "bg-blue-600",
  destructive: "bg-red-600",
  success: "bg-green-600",
  warning: "bg-amber-500",
  info: "bg-cyan-600",
};

const sizeClasses: Record<string, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant from your system */
  variant?: keyof typeof variantClasses;
  /** Badge size */
  size?: keyof typeof sizeClasses;
  /** Show a small colored dot on the left */
  dot?: boolean;
  /** Optional loading spinner – great for TanStack Query states */
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable badge/status indicator.
 * Variants: primary, secondary, outline, destructive, success, warning, info
 * Supports optional dot, size adjustments, and a loading spinner.
 */
const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  size = "md",
  dot = false,
  isLoading = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {/* Loading spinner */}
      {isLoading && (
        <svg
          className="h-3 w-3 animate-spin"
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
      )}

      {/* Status dot */}
      {dot && !isLoading && (
        <span
          className={`h-2 w-2 rounded-full ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}

      {children}
    </span>
  );
};

export default Badge;