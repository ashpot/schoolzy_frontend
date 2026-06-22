import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SectionValues, ClassValues, ClassGroupValues, FormTeacherValues, DenominatorValues } from "../schemas";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Delete factory ───────────────────────────────────────────────────────────
function createDelete(queryKey: string) {
  return function () {
    const qc = useQueryClient();
    return useMutation({
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

// ─── Add mutations ────────────────────────────────────────────────────────────
export const useAddSection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SectionValues) => {
      // TODO: Replace with actual API call
      // return api.post("/sections", payload);
      await delay(800); return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sections"] }),
  });
};

export const useAddClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ClassValues) => {
      // TODO: Replace with actual API call
      // return api.post("/classes", payload);
      await delay(800); return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }),
  });
};

export const useAddClassGroup = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ClassGroupValues) => {
      // TODO: Replace with actual API call
      // return api.post("/class-groups", payload);
      await delay(800); return { success: true, data: payload };
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