import { CheckCircle, AlertCircle } from "lucide-react";
import { formatNaira } from "../../utils/feeUtils";

interface BalanceBadgeProps {
  amount: number;
  totalFeeAmount: number;
}

export default function BalanceBadge({ amount, totalFeeAmount }: BalanceBadgeProps) {
  const balance = totalFeeAmount - amount;

  if (balance <= 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
        <CheckCircle size={11} />
        Paid
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
      <AlertCircle size={11} />
      {formatNaira(balance)}
    </span>
  );
}