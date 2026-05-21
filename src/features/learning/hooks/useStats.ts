export function useStats<T>(
  items: T[],
  statusField: keyof T,
  validStatuses: string[]
) {
  const stats = validStatuses.reduce(
    (acc, status) => {
      acc[status] = items.filter((item) => item[statusField] === status).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const total = items.length;
  const marked = total - (stats.unmarked || 0);

  return {
    ...stats,
    total,
    marked,
    percentage: total > 0 ? (marked / total) * 100 : 0,
  };
}