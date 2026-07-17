import { ChevronDown, ArrowRight } from "lucide-react";
import { mockFees } from "../../data/mockData";
import { formatNaira } from "../../utils/feeUtils";
import FeeTypeBadge from "../shared/FeeTypeBadge";
import Button from "@/shared/ui/Button";

interface PaidListFilterProps {
  selectedFeeId: string;
  onFeeChange: (feeId: string) => void;
  onLoad: () => void;
  isLoading: boolean;
}

export default function PaidListFilter({ selectedFeeId, onFeeChange, onLoad, isLoading }: PaidListFilterProps) {
  const selectedFee = mockFees.find((f) => f.id === selectedFeeId);

  // Stable color index from fees array
  const feeColorIndex = mockFees.findIndex((f) => f.id === selectedFeeId);

  return (
    <div className="bg-white rounded-2xl card-shadow p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
          <ChevronDown size={13} className="text-brand-primary" />
        </div>
        <h3 className="font-semibold text-text-primary">Filter</h3>
      </div>

      <div className="flex items-end gap-3">
        {/* Fee select */}
        <div className="flex-1">
          <label className="text-sm font-medium text-label block mb-1.5">Select Fee *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 rounded border border-border-line02 bg-gray-100" />
            </span>
            <select
              value={selectedFeeId}
              onChange={(e) => onFeeChange(e.target.value)}
              className="w-full appearance-none pl-8 pr-8 py-2.5 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 cursor-pointer transition-all"
            >
              <option value="">Select a fee…</option>
              {mockFees.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>

          {/* Pills shown after fee selected */}
          {selectedFee && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <FeeTypeBadge name={selectedFee.feeTypeName} index={feeColorIndex} size="sm" />
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                {selectedFee.term}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                {formatNaira(selectedFee.amount)}
              </span>
            </div>
          )}
        </div>

        {/* Load button */}
        <Button
          variant="primary"
          size="md"
          rightIcon={<ArrowRight size={15} />}
          isLoading={isLoading}
          onClick={onLoad}
          disabled={!selectedFeeId}
          className="shrink-0 mb-0.5"
        >
          Load Paid List
        </Button>
      </div>
    </div>
  );
}