import { cn } from "@/shared/utils/cn";

const block = "animate-pulse rounded-3xl bg-bg-soft";

export default function DashboardSkeleton() {
  return (
    <div className="dashboard-p space-y-6" aria-busy="true" aria-label="Loading dashboard">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={cn(block, "h-[170px]")} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className={cn(block, "h-[400px]")} />
        <div className={cn(block, "h-[400px]")} />
      </div>
      <div className={cn(block, "h-[420px]")} />
    </div>
  );
}