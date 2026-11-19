import { motion } from "framer-motion";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import type { PayMethod } from "../../types";
import { METHOD_COLORS } from "../../utils/tones";

export default function PaymentMethodsCard({ shares }: { shares: { method: PayMethod; pct: number }[] }) {
  return (
    <SectionCard title="Payment Methods">
      <ul className="space-y-4">
        {shares.map(({ method, pct }) => (
          <li key={method}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-primary">{method}</span>
              <span className="font-semibold tabular-nums text-text-primary">{pct}%</span>
            </div>
            <div
              role="progressbar"
              aria-label={method}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-1.5 h-2 overflow-hidden rounded-full bg-sa-gray-line"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: METHOD_COLORS[method] }}
              />
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}