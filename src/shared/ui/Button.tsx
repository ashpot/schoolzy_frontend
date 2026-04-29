import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

type Variant = "primary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-white border border-brand-primary hover:bg-brand-primary/90",
  outline:
    "bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary/5",
  ghost:
    "bg-transparent border border-transparent hover:bg-bg-soft",
  destructive:
    "bg-transparent text-danger border border-danger hover:bg-red-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "py-3 px-4 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2.5",
};

const Spinner = () => (
  <svg
    className="animate-spin w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold",
          "active:scale-95 transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...rest}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;