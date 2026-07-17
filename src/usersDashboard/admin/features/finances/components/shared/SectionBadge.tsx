interface SectionBadgeProps {
  label: string;
  size?: "sm" | "md";
}

const sectionStyles: Record<string, string> = {
  Nursery: "bg-pink-50  text-pink-700  border border-pink-100",
  Primary: "bg-blue-50  text-blue-700  border border-blue-100",
  Junior:  "bg-green-50 text-green-700 border border-green-100",
  Senior:  "bg-amber-50 text-amber-700 border border-amber-100",
};

export default function SectionBadge({ label, size = "md" }: SectionBadgeProps) {
  const colorClass = sectionStyles[label] ?? "bg-gray-50 text-gray-600 border border-gray-200";
  const sizeClass  = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colorClass} ${sizeClass}`}>
      {label}
    </span>
  );
}