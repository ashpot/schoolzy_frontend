import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import type { ClassValues, ClassGroupValues, FormTeacherValues, DenominatorValues } from "../schemas";
import type { ClassGroupPayload, ClassPayload, SectionPayload, SectionListItem, ClassListItem, ClassGroupResponse, ClassResponse, SectionResponse } from "../types";
import { apiRequest } from "@/shared/lib/apiClient";
import { SECTIONS_ENDPOINTS } from "../api";


const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Delete factory ───────────────────────────────────────────────────────────
function createDelete(queryKey: string) {
  return function () {
    const qc = useQueryClient();
    return useMutation({// @ts-ignore
      mutationFn: async (id: string) => {
        // TODO: Replace with actual API call e.g. api.delete(`/${queryKey}/${id}`)
        await delay(500);
        return { success: true };
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
    });
  };
}

export const useDeleteSection     = createDelete("sections");
export const useDeleteClass       = createDelete("classes");
export const useDeleteClassGroup  = createDelete("class-groups");
export const useDeleteAssignment  = createDelete("form-teachers");
export const useDeleteDenominator = createDelete("denominators");

// ─── Add mutations ──────────────
export const useAddSection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SectionPayload) => {
      return apiRequest<SectionResponse>(SECTIONS_ENDPOINTS.CREATE_SECTION, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sections"] }),
  });
};

export const useAddClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: ClassValues) => {
      const payload: ClassPayload = {
        name: values.name,
        code: values.code,
        section: Number(values.section),
      };
      return apiRequest<ClassResponse>(SECTIONS_ENDPOINTS.CREATE_CLASS, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }),
  });
};

export const useAddClassGroup = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: ClassGroupValues) => {
      const payload: ClassGroupPayload = {
        name: values.name,
        code: values.code,
        parent_class: Number(values.parentClass),
      };
      return apiRequest<ClassGroupResponse>(SECTIONS_ENDPOINTS.CREATE_CLASS_GROUP, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["class-groups"] }),
  });
};

export const useAssignFormTeacher = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FormTeacherValues) => {
      // TODO: Replace with actual API call
      // return api.post("/form-teachers", payload);
      await delay(800); return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["form-teachers"] }),
  });
};

export const useAddDenominator = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DenominatorValues) => {
      // TODO: Replace with actual API call
      // return api.post("/denominators", payload);
      await delay(800); return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["denominators"] }),
  });
};

// List queries (for dropdowns)
export const useSectionsList = () => {
  return useQuery({
    queryKey: ["sections", "list"],
    queryFn: async () => {
      return apiRequest<SectionListItem[]>(SECTIONS_ENDPOINTS.LIST_SECTIONS);
    },
  });
};

export const useClassesList = () => {
  return useQuery({
    queryKey: ["classes", "list"],
    queryFn: async () => {
      return apiRequest<ClassListItem[]>(SECTIONS_ENDPOINTS.LIST_CLASSES);
    },
  });
};