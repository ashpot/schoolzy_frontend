import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import type { ClassValues, ClassGroupValues, FormTeacherValues, DenominatorValues } from "../schemas";
import type {
  ClassGroupPayload, ClassPayload, SectionPayload, SectionListItem, ClassListItem,
  ClassGroupResponse, ClassResponse, SectionResponse, ClassGroupListItem,
  Denominator, DenominatorPayload, DenominatorResponse,
  FormTeacherAssignment, AssignedClassPayload, AssignedClassResponse,
} from "../types";
import { apiRequest } from "@/shared/lib/apiClient";
import { SECTIONS_ENDPOINTS } from "../api";
import { USERS_ENDPOINTS } from "@/usersDashboard/admin/features/users/api";
import { toDenominator } from "../utils/denominatorMapper";
import { toAssignment } from "../utils/assignmentMapper";


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
    onSuccess: (data) => {
      qc.setQueryData<SectionListItem[]>(["sections", "list"], (old = []) => [
        { id: data.id, title: data.title, code: data.code, show_position_in_result: data.show_position_in_result },
        ...old,
      ]);
    },
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
    onSuccess: (data) => {
      qc.setQueryData<ClassListItem[]>(["classes", "list"], (old = []) => [
        { id: data.id, section_title: data.section_title, name: data.name, code: data.code, section: data.section },
        ...old,
      ]);
    },
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
    onSuccess: (data) => {
      qc.setQueryData<ClassGroupListItem[]>(["class-groups", "list"], (old = []) => [
        {
          id: data.id,
          parent_class_name: data.parent_class_name,
          section_name: data.section_name,
          number_of_students: data.number_of_students,
          form_teacher_name: data.form_teacher_name,
          name: data.name,
          code: data.code,
          parent_class: data.parent_class,
        },
        ...old,
      ]);
    },
  });
};

export const useAssignFormTeacher = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: FormTeacherValues) => {
      const payload: AssignedClassPayload = {
        class_group: Number(values.classValue),
        teacher: Number(values.teacherId),
      };
      return apiRequest<AssignedClassResponse>(SECTIONS_ENDPOINTS.ASSIGN_CLASS_TEACHER, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["form-teachers"] });
      // class groups carry form_teacher_name, so refresh them too
      qc.invalidateQueries({ queryKey: ["class-groups"] });
    },
  });
};

export const useAddDenominator = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: DenominatorValues) => {
      const payload: DenominatorPayload = {
        denominator: values.denominator,
        target_class: Number(values.classValue),
      };
      return apiRequest<DenominatorResponse>(SECTIONS_ENDPOINTS.CREATE_DENOMINATOR, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["denominators"] }),
  });
};

// List queries (for dropdowns + tables)
export const useSectionsList = () => {
  return useQuery({
    queryKey: ["sections", "list"],
    queryFn: async () => apiRequest<SectionListItem[]>(SECTIONS_ENDPOINTS.LIST_SECTIONS),
  });
};


export const useClassesList = () => {
  return useQuery({
    queryKey: ["classes", "list"],
    queryFn: async () => apiRequest<ClassListItem[]>(SECTIONS_ENDPOINTS.LIST_CLASSES),
  });
};

export const useClassGroupsList = () => {
  return useQuery({
    queryKey: ["class-groups", "list"],
    queryFn: async () => apiRequest<ClassGroupListItem[]>(SECTIONS_ENDPOINTS.LIST_CLASS_GROUPS),
  });
};

export const useDenominatorsList = () => {
  return useQuery({
    queryKey: ["denominators", "list"],
    queryFn: async (): Promise<Denominator[]> => {
      const raw = await apiRequest<DenominatorResponse[]>(SECTIONS_ENDPOINTS.LIST_DENOMINATORS);
      return raw.map(toDenominator);
    },
  });
};

interface NamedUser {
  id: number;
  first_name: string;
  last_name: string;
}

// The backend returns ids only, so fetch assignments + class groups + users
// together and resolve names in one query. Newest first.
export const useAssignmentsList = () => {
  return useQuery({
    queryKey: ["form-teachers", "list"],
    queryFn: async (): Promise<FormTeacherAssignment[]> => {
      const [raw, groups, users] = await Promise.all([
        apiRequest<AssignedClassResponse[]>(SECTIONS_ENDPOINTS.LIST_ASSIGNED_CLASSES),
        apiRequest<ClassGroupListItem[]>(SECTIONS_ENDPOINTS.LIST_CLASS_GROUPS),
        apiRequest<NamedUser[]>(USERS_ENDPOINTS.LIST_ALL),
      ]);
      const groupMap = new Map(groups.map((g) => [g.id, g]));
      const userMap = new Map(users.map((u) => [u.id, `${u.first_name} ${u.last_name}`]));
      return [...raw]
        .sort((a, b) => b.id - a.id)
        .map((r) => toAssignment(r, groupMap, userMap));
    },
  });
};

interface TeacherOption {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
}

// Teacher dropdown source — ?role= is broken server-side (returns
// unfiltered list), so fetch everyone and filter client-side by real role.
export const useTeacherOptionsList = () => {
  return useQuery({
    queryKey: ["users", "teachers", "options"],
    queryFn: async () => {
      const raw = await apiRequest<TeacherOption[]>(USERS_ENDPOINTS.LIST_ALL);
      return raw.filter((u) => u.role === "Teacher");
    },
  });
};