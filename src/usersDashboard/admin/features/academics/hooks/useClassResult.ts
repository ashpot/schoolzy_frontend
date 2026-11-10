import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { ACADEMICS_ENDPOINTS } from "../api";
import type { ClassResultFilters, ClassResultResponse } from "../types/classResult";
import { buildClassSheet } from "../utils/classResultSheet";

// `select` runs the reshaping once per fetch (memoised by TanStack), not on every render
export const useClassResult = (filters: ClassResultFilters | null) =>
  useQuery({
    queryKey: ["class-results", filters?.classGroupId, filters?.termId],
    enabled: filters !== null,
    retry: false,
    queryFn: () =>
      apiRequest<ClassResultResponse>(
        ACADEMICS_ENDPOINTS.CLASS_RESULT(filters!.classGroupId, filters!.termId)
      ),
    select: buildClassSheet,
  });