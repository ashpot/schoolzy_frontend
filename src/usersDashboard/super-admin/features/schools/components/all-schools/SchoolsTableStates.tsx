import { AlertCircle, Building2 } from "lucide-react";
import Button from "@/shared/ui/Button";

export function TableSkeleton() {
  return (
    <div className="space-y-4 p-6" aria-busy="true" aria-label="Loading schools">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-xl bg-sa-gray-soft" />
          <div className="h-4 flex-1 animate-pulse rounded-lg bg-sa-gray-soft" />
        </div>
      ))}
    </div>
  );
}

export function TableEmpty({ filtered }: { filtered: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="flex-center h-14 w-14 rounded-full bg-sa-blue-soft text-sa-blue-icon">
        <Building2 size={24} aria-hidden />
      </span>
      <p className="text-sm font-medium text-text-primary">
        {filtered ? "No schools match your filters" : "No schools yet"}
      </p>
      <p className="text-xs text-text-muted">
        {filtered ? "Try a different search or clear the filters." : "Add your first school to get started."}
      </p>
    </div>
  );
}

export function TableError({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="flex-center h-14 w-14 rounded-full bg-sa-red-soft text-sa-red-icon">
        <AlertCircle size={24} aria-hidden />
      </span>
      <p className="text-sm font-medium text-text-primary">We couldn&apos;t load schools</p>
      <p className="text-xs text-text-muted">Check your connection and try again.</p>
      <Button type="button" variant="outline" size="sm" onClick={onRetry}>Retry</Button>
    </div>
  );
}