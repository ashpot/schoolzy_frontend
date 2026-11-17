import { useState } from "react";
import { PAGE_SIZE } from "../utils/constants";

export interface Paged<T> {
  pageItems: T[];
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  setPage: (p: number) => void;
}

export function usePaged<T>(items: T[], pageSize = PAGE_SIZE): Paged<T> {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return {
    pageItems,
    page: safePage,
    totalPages,
    total: items.length,
    from: items.length ? start + 1 : 0,
    to: start + pageItems.length,
    setPage,
  };
}