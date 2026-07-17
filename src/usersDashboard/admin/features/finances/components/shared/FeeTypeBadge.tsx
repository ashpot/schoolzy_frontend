import { Tag } from "lucide-react";
import { feeTypeColor } from "../../utils/feeUtils";

interface FeeTypeBadgeProps {
  name: string;
  index: number;
  size?: "sm" | "md";
}

export default function FeeTypeBadge({ name, index, size = "md" }: FeeTypeBadgeProps) {
  const colorClass = feeTypeColor(index);
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${colorClass} ${sizeClass}`}>
      <Tag size={10} />
      {name}
    </span>
  );
}