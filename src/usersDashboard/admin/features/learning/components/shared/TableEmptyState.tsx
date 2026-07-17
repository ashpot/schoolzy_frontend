interface TableEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  minHeight?: string;
}

export function TableEmptyState({
  icon,
  title,
  description,
  minHeight = "400px",
}: TableEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ minHeight }}
    >
      <div className="w-16 h-16 rounded-full bg-blue-50 flex-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-text-nav mb-1">
        {title}
      </h3>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}