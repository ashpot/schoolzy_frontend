import React from "react";

interface MetricCardProps {
  /** Card title (e.g., "Total Students") */
  title: string;
  /** Large numeric value */
  value: string | number;
  /** Subtitle (e.g., "+12% from last month") */
  subtitle?: string;
  /** Manually control trend color; defaults to auto-detection based on +/- */
  trend?: "up" | "down" | "neutral";
  /** Optional icon displayed top-right */
  icon?: React.ReactNode;
  /** Loading state – shows skeleton */
  isLoading?: boolean;
  /** Error state – shows a friendly message instead of value */
  isError?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 * Detects trend from subtitle string.
 * Returns 'up' if starts with +, 'down' if -, else 'neutral'.
 */
const detectTrend = (subtitle?: string): "up" | "down" | "neutral" => {
  if (!subtitle) return "neutral";
  if (subtitle.trim().startsWith("+")) return "up";
  if (subtitle.trim().startsWith("-")) return "down";
  return "neutral";
};

const trendColors = {
  up: "text-green-600",
  down: "text-red-600",
  neutral: "text-gray-500",
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  isLoading = false,
  isError = false,
  errorMessage = "Could not load data",
  className = "",
}) => {
  const trendDirection = trend ?? detectTrend(subtitle);

  return (
    <div
      className={`
        rounded-lg bg-white p-5
        shadow-[0_2px_12px_0_hsla(215,50%,23%,0.08)]
        transition-shadow hover:shadow-md
        ${className}
      `}
    >
      {/* Header: title + optional icon */}
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>

      {/* Value or loading/error state */}
      {isError ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : isLoading ? (
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-1" />
      ) : (
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      )}

      {/* Subtitle with trend color */}
      {!isError && !isLoading && subtitle && (
        <p className={`text-sm flex items-center gap-1 ${trendColors[trendDirection]}`}>
          <span>{subtitle}</span>
          {trendDirection !== "neutral" && (
            <span className="text-xs">
              {trendDirection === "up" ? "▲" : "▼"}
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default MetricCard;