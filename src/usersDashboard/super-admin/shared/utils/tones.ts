export type Tone = "blue" | "green" | "amber" | "red" | "gray" | "purple";

export const toneBadge: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-green-50 text-green-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-600",
  gray: "bg-gray-100 text-gray-500",
  purple: "bg-purple-50 text-purple-700",
};

export const toneIconTile: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-500",
  gray: "bg-gray-100 text-gray-500",
  purple: "bg-purple-50 text-purple-600",
};

export const toneTile: Record<Tone, string> = {
  blue: "bg-blue-50 border-blue-100",
  green: "bg-green-50 border-green-100",
  amber: "bg-amber-50 border-amber-200",
  red: "bg-red-50 border-red-100",
  gray: "bg-bg-input border-border-line02",
  purple: "bg-purple-50 border-purple-100",
};

export const toneBar: Record<Tone, string> = {
  blue: "bg-brand-primary",
  green: "bg-success",
  amber: "bg-warning",
  red: "bg-danger",
  gray: "bg-gray-400",
  purple: "bg-purple-500",
};