import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Button from "@/shared/ui/Button";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";

export function DetailSkeleton() {
  return (
    <div className="dashboard-p space-y-6" aria-busy="true" aria-label="Loading school">
      <div className="h-5 w-32 animate-pulse rounded-lg bg-sa-gray-soft" />
      <div className="h-40 animate-pulse rounded-3xl bg-sa-gray-soft" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-3xl bg-sa-gray-soft" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-3xl bg-sa-gray-soft" />
    </div>
  );
}

export function DetailError({ message, onRetry }: { message?: string; onRetry: () => void }) {
  const notFound = message === "School not found.";
  return (
    <div className="dashboard-p">
      <div role="alert" className="flex flex-col items-center gap-3 rounded-3xl border border-border-line02 bg-white px-6 py-16 text-center">
        <span className="flex-center h-14 w-14 rounded-full bg-sa-red-soft text-sa-red-icon">
          <AlertCircle size={24} aria-hidden />
        </span>
        <p className="text-sm font-medium text-text-primary">
          {notFound ? "School not found" : "We couldn't load this school"}
        </p>
        <p className="text-xs text-text-muted">
          {notFound ? "It may have been deleted or the link is wrong." : "Check your connection and try again."}
        </p>
        <div className="mt-2 flex gap-3">
          <Link
            to={SA_PATHS.schools}
            className="rounded-xl border border-border-line03 px-4 py-2 text-sm font-medium text-text-primary hover:border-brand-primary hover:text-brand-primary"
          >
            Back to Schools
          </Link>
          {!notFound && <Button type="button" variant="outline" size="sm" onClick={onRetry}>Retry</Button>}
        </div>
      </div>
    </div>
  );
}