import { AlertCircle, Clock } from "lucide-react";
import Button from "@/shared/ui/Button";

export function TabSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-3xl bg-sa-gray-soft" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-3xl bg-sa-gray-soft" />
    </div>
  );
}

export function TabError({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-3xl border border-border-line02 bg-white px-6 py-16 text-center">
      <span className="flex-center h-14 w-14 rounded-full bg-sa-red-soft text-sa-red-icon">
        <AlertCircle size={24} aria-hidden />
      </span>
      <p className="text-sm font-medium text-text-primary">We couldn&apos;t load this section</p>
      <Button type="button" variant="outline" size="sm" onClick={onRetry}>Retry</Button>
    </div>
  );
}

// Shown for tabs whose backend endpoint doesn't exist yet (see LIVE_TABS).
export function TabUnavailable({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-border-line02 bg-white px-6 py-16 text-center">
      <span className="flex-center h-14 w-14 rounded-full bg-sa-amber-soft text-sa-amber-icon">
        <Clock size={24} aria-hidden />
      </span>
      <p className="text-sm font-medium text-text-primary">{label} isn&apos;t available yet</p>
      <p className="max-w-sm text-xs text-text-muted">
        This section will show real data as soon as the backend endpoint is ready.
      </p>
    </div>
  );
}