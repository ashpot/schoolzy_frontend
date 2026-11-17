export type Tone = "blue" | "green" | "amber" | "red" | "gray" | "purple";

// Badges / pills
export const toneBadge: Record<Tone, string> = {
  blue: "bg-sa-blue-soft text-sa-blue-text",
  green: "bg-sa-green-soft text-sa-green-text",
  amber: "bg-sa-amber-soft text-sa-amber-text",
  red: "bg-sa-red-soft text-sa-red-text",
  gray: "bg-sa-gray-soft text-sa-gray-text",
  purple: "bg-sa-purple-soft text-sa-purple-text",
};

// Icon tiles: soft background + coloured glyph (keep exactly two classes: QuickActions reads the second)
export const toneIconTile: Record<Tone, string> = {
  blue: "bg-sa-blue-soft text-sa-blue-icon",
  green: "bg-sa-green-soft text-sa-green-icon",
  amber: "bg-sa-amber-soft text-sa-amber-icon",
  red: "bg-sa-red-soft text-sa-red-icon",
  gray: "bg-sa-gray-soft text-sa-gray-icon",
  purple: "bg-sa-purple-soft text-sa-purple-icon",
};

// Tinted cards with a matching border
export const toneTile: Record<Tone, string> = {
  blue: "bg-sa-blue-soft border-sa-blue-line",
  green: "bg-sa-green-soft border-sa-green-line",
  amber: "bg-sa-amber-soft border-sa-amber-line",
  red: "bg-sa-red-soft border-sa-red-line",
  gray: "bg-sa-gray-soft border-sa-gray-line",
  purple: "bg-sa-purple-soft border-sa-purple-line",
};

// Solid fills (progress bars, dots)
export const toneBar: Record<Tone, string> = {
  blue: "bg-sa-blue-icon",
  green: "bg-sa-green-icon",
  amber: "bg-sa-amber-icon",
  red: "bg-sa-red-icon",
  gray: "bg-sa-gray-icon",
  purple: "bg-sa-purple-icon",
};

// Plain coloured text (deltas, trend arrows)
export const toneText: Record<Tone, string> = {
  blue: "text-sa-blue-text",
  green: "text-sa-green-text",
  amber: "text-sa-amber-text",
  red: "text-sa-red-text",
  gray: "text-sa-gray-text",
  purple: "text-sa-purple-text",
};