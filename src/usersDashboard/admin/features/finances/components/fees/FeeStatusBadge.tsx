import { isOverdue } from "../../utils/feeUtils";

interface FeeStatusBadgeProps {
  dateDue: string;
}

export default function FeeStatusBadge({ dateDue }: FeeStatusBadgeProps) {
  if (!isOverdue(dateDue)) return null;

  return (
    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide bg-red-50 text-red-600 border border-red-100">
      OVERDUE
    </span>
  );
}