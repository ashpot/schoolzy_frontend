import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { ACADEMICS_ENDPOINTS } from "../api";
import { useSectionsList } from "./useAcademics";
import type { PsychomotiveItem, PsychomotivePayload, PsychomotiveResponse } from "../types/psychomotive";
import type { PsychomotiveMetricFormValues } from "../schemas";

const PER_PAGE = 8;

export function usePsychomotiveList(page: number, search: string, section: string) {
  const sectionsQuery = useSectionsList();
  const titleById = new Map((sectionsQuery.data ?? []).map((s) => [s.id, s.title]));

  return useQuery({
    queryKey: ["academics", "psychomotive", "list", page, search, section, sectionsQuery.data],
    enabled: !sectionsQuery.isLoading,
    queryFn: async () => {
      const raw = await apiRequest<PsychomotiveResponse[]>(ACADEMICS_ENDPOINTS.LIST_PSYCHOMOTIVE);

      let mapped: PsychomotiveItem[] = [...raw]
        .sort((a, b) => b.id - a.id) // newest first
        .map((r) => ({
          id: String(r.id),
          title: r.title,
          section: titleById.get(r.section) ?? "Unknown",
          sectionId: r.section,
        }));

      if (section !== "All") mapped = mapped.filter((i) => String(i.sectionId) === section);
      if (search) mapped = mapped.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

      const start = (page - 1) * PER_PAGE;
      return { items: mapped.slice(start, start + PER_PAGE), total: mapped.length };
    },
  });
}

export function useAddPsychomotiveMetric() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: PsychomotiveMetricFormValues) => {
      const payload: PsychomotivePayload = {
        title: values.title,
        section: Number(values.section),
      };
      return apiRequest<PsychomotiveResponse>(ACADEMICS_ENDPOINTS.CREATE_PSYCHOMOTIVE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "psychomotive"] }),
  });
}

// TODO: no update/delete endpoints confirmed for psychomotive-evaluation yet.
// Add useEditPsychomotiveMetric / useDeletePsychomotiveMetric once the backend provides them.