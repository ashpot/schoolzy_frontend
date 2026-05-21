import type { FileType } from "../../types";

export const ITEMS_PER_PAGE = 8;

export const FILE_TYPE_STYLES: Record<FileType, string> = {
  PDF:  "bg-red-50 text-red-600",
  DOC:  "bg-blue-50 text-blue-600",
  DOCX: "bg-blue-50 text-blue-600",
  PPT:  "bg-orange-50 text-orange-600",
};

export const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

export const STATUS_ACTIVE: Record<string, string> = {
  present: "bg-green-500 text-white border-green-500",
  absent:  "bg-red-500  text-white border-red-500",
  late:    "bg-amber-500 text-white border-amber-500",
};

export const STATUS_IDLE =
  "bg-white text-[var(--color-text-secondary)] border-[var(--color-border-line02)] hover:border-gray-300";

export const STATUS_PILLS = [
  { label: "Present",  key: "present",  dot: "bg-green-500", pill: "border-green-200 bg-green-50 text-green-700" },
  { label: "Absent",   key: "absent",   dot: "bg-red-500",   pill: "border-red-200 bg-red-50 text-red-600" },
  { label: "Late",     key: "late",     dot: "bg-amber-500", pill: "border-amber-200 bg-amber-50 text-amber-700" },
  { label: "Unmarked", key: "unmarked", dot: "bg-gray-300",  pill: "border-gray-200 bg-gray-50 text-gray-500" },
] as const;

export const FOOTER_STATS = [
  { label: "Present",  key: "present",  dot: "bg-green-500", text: "text-green-700" },
  { label: "Absent",   key: "absent",   dot: "bg-red-500",   text: "text-red-600" },
  { label: "Late",     key: "late",     dot: "bg-amber-500", text: "text-amber-700" },
  { label: "Unmarked", key: "unmarked", dot: "bg-gray-300",  text: "text-gray-500" },
] as const;