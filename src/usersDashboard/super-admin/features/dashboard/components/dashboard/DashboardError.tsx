import { AlertCircle } from "lucide-react";
import Button from "@/shared/ui/Button";

export default function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="dashboard-p">
      <div role="alert" className="flex flex-col items-center gap-3 rounded-3xl border border-border-line02 bg-white px-6 py-16 text-center">
        <span className="flex-center h-12 w-12 rounded-full bg-red-50 text-danger">
          <AlertCircle size={22} aria-hidden />
        </span>
        <p className="text-sm font-medium text-text-primary">We couldn&apos;t load the dashboard</p>
        <p className="text-xs text-text-muted">Check your connection and try again.</p>
        <Button variant="outline" size="sm" onClick={onRetry}>Retry</Button>
      </div>
    </div>
  );
}