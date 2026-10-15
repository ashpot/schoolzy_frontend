import { ITEMS_PER_PAGE } from "../../shared/utils/constants";

interface LessonNotesPaginationProps {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function LessonNotesPagination({ page, total, onPageChange }: LessonNotesPaginationProps) {
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const from = (page - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(page * ITEMS_PER_PAGE, total);

  return (
    <div className="px-6 py-4 border-t border-border-line02 flex items-center justify-between">
      <p className="text-sm text-text-muted">
        Showing <span className="font-medium text-text-nav">{from}–{to}</span> of{" "}
        <span className="font-medium text-text-nav">{total}</span> notes
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}
          className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary">
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button key={p} onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg flex-center text-sm font-medium transition-colors ${
              p === page ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-gray-100"
            }`}>
            {p}
          </button>
        ))}
        <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
          className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary">
          ›
        </button>
      </div>
    </div>
  );
}