import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";

function pageWindow(page: number, total: number): number[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const start = Math.min(Math.max(page - 2, 1), total - 4);
  return Array.from({ length: 5 }, (_, i) => start + i);
}

interface SchoolsPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  onPage: (p: number) => void;
}

const arrow =
  "flex-center h-10 w-10 rounded-xl text-text-secondary transition-colors hover:bg-sa-gray-soft disabled:opacity-40 disabled:hover:bg-transparent";

export default function SchoolsPagination({ page, totalPages, total, from, to, onPage }: SchoolsPaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-4 border-t border-border-line02 px-6 py-4"
    >
      <p className="text-sm text-text-secondary">
        Showing {from}–{to} of {total} schools
      </p>
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onPage(page - 1)} className={arrow}>
          <ChevronLeft size={16} />
        </button>
        {pageWindow(page, totalPages).map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === page ? "page" : undefined}
            onClick={() => onPage(n)}
            className="relative flex-center h-10 min-w-10 rounded-xl px-3 text-sm font-medium"
          >
            {n === page && (
              <motion.span
                layoutId="sa-schools-page-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-brand-primary"
              />
            )}
            <span className={cn("relative z-10", n === page ? "text-white" : "text-text-secondary")}>{n}</span>
          </button>
        ))}
        <button type="button" aria-label="Next page" disabled={page === totalPages} onClick={() => onPage(page + 1)} className={arrow}>
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}