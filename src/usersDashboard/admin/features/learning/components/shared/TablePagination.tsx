interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  itemLabel = "items",
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="px-6 py-4 border-t border-border-line02 flex items-center justify-between">
      <p className="text-sm text-text-muted">
        Showing{" "}
        <span className="font-medium text-text-nav">
          {startIndex}–{endIndex}
        </span>{" "}
        of{" "}
        <span className="font-medium text-text-nav">
          {totalItems}
        </span>{" "}
        {itemLabel}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg flex-center text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-brand-primary text-white"
                : "text-text-secondary hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary"
        >
          ›
        </button>
      </div>
    </div>
  );
}