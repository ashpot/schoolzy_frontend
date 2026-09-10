import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  mockSubjectTeachers,
  mockPsychomotiveMetrics,
} from "../data/mockData";
import type {
  SubjectTeacherAssignment,
  PsychomotiveMetric,
  SectionListItem,
  Grade, GradePayload, GradeResponse,
  Subject, SubjectPayload, SubjectResponse,
  AssessmentType, AssessmentTypePayload, AssessmentTypeResponse,
} from "../types";
import type { GradeFormValues, SubjectFormValues, AssessmentTypeFormValues, ResultCommentFormValues, PsychomotiveFormValues, AttendanceFormValues } from "../schemas";
import { apiRequest } from "@/shared/lib/apiClient";
import { ACADEMICS_ENDPOINTS } from "../api";

const PER_PAGE = 8;

function paginate<T>(data: T[], page: number) {
  const start = (page - 1) * PER_PAGE;
  return { items: data.slice(start, start + PER_PAGE), total: data.length };
}

// `section` filter value is the id (string) from the dropdown (sectionOptions
// is built as value: String(s.id)). Items carry the section *title* (for
// SectionBadge), so translate id -> title before comparing.
function filterBySection<T extends { section: string }>(
  data: T[],
  section: string | "All",
  sectionNameById: Map<number, string>
) {
  if (section === "All") return data;
  const title = sectionNameById.get(Number(section));
  return title ? data.filter((d) => d.section === title) : data;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS (dropdown, shared by Grades, Subjects, Assessment Types)
// ─────────────────────────────────────────────────────────────────────────────
export function useSectionsList() {
  return useQuery({
    queryKey: ["academics", "sections", "list"],
    queryFn: async () => {
      return apiRequest<SectionListItem[]>(ACADEMICS_ENDPOINTS.LIST_SECTIONS);
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBJECTS
// ─────────────────────────────────────────────────────────────────────────────
export function useSubjectsList(page: number, search: string, section: string | "All") {
  const sectionsQuery = useSectionsList();
  const sectionNameById = new Map((sectionsQuery.data ?? []).map((s) => [s.id, s.title]));

  return useQuery({
    queryKey: ["academics", "subjects", "list", page, search, section, sectionsQuery.data],
    enabled: !sectionsQuery.isLoading,
    queryFn: async () => {
      const raw = await apiRequest<SubjectResponse[]>(ACADEMICS_ENDPOINTS.LIST_SUBJECTS);
      const mapped: Subject[] = raw.map((s) => ({
        id: String(s.id),
        subjectName: s.name,
        code: s.code,
        section: sectionNameById.get(s.section) ?? "Unknown",
        elective: s.elective,
      }));

      let filtered = filterBySection(mapped, section, sectionNameById);
      if (search) {
        filtered = filtered.filter(
          (s) =>
            s.subjectName.toLowerCase().includes(search.toLowerCase()) ||
            s.code.toLowerCase().includes(search.toLowerCase())
        );
      }
      return paginate(filtered, page);
    },
  });
}

export function useAddSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: SubjectFormValues) => {
      const payload: SubjectPayload = {
        name: values.subjectName,
        code: values.code,
        section: Number(values.section),
      };
      return apiRequest<SubjectResponse>(ACADEMICS_ENDPOINTS.CREATE_SUBJECT, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "subjects"] }),
  });
}

export function useDeleteSubject() {
  const qc = useQueryClient();
  return useMutation({
    //@ts-ignore
    mutationFn: async (id: string) => {
      // TODO: no delete endpoint for subjects in the API doc yet
      await new Promise((r) => setTimeout(r, 300));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "subjects"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBJECT TEACHERS (unchanged — still mock)
// ─────────────────────────────────────────────────────────────────────────────
let subjectTeachersStore = [...mockSubjectTeachers];

export function useSubjectTeachersList(page: number, search: string, section: string | "All") {
  return useQuery({
    queryKey: ["academics", "subject-teachers", page, search, section],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      let filtered = subjectTeachersStore;
      if (search)
        filtered = filtered.filter(
          (s) =>
            s.subjectName.toLowerCase().includes(search.toLowerCase()) ||
            s.teacher.toLowerCase().includes(search.toLowerCase()) ||
            s.class.toLowerCase().includes(search.toLowerCase())
        );
      return paginate(filtered, page);
    },
  });
}

export function useAssignSubjectTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      teacherId: string;
      teacherName: string;
      classId: string;
      className: string;
      subjectIds: string[];
      subjectNames: string[];
    }) => {
      await new Promise((r) => setTimeout(r, 600));
      const newItems: SubjectTeacherAssignment[] = payload.subjectNames.map((name, i) => ({
        id: `STA-${String(subjectTeachersStore.length + i + 1).padStart(3, "0")}`,
        class: payload.className,
        subjectName: name,
        teacher: payload.teacherName,
        elective: "Admin Seun",
      }));
      subjectTeachersStore = [...newItems, ...subjectTeachersStore];
      return newItems;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "subject-teachers"] }),
  });
}

export function useDeleteSubjectTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((r) => setTimeout(r, 300));
      subjectTeachersStore = subjectTeachersStore.filter((s) => s.id !== id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "subject-teachers"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT TYPES
// ─────────────────────────────────────────────────────────────────────────────
export function useAssessmentTypesList(page: number, search: string, section: string | "All") {
  const sectionsQuery = useSectionsList();
  const sectionNameById = new Map((sectionsQuery.data ?? []).map((s) => [s.id, s.title]));

  return useQuery({
    queryKey: ["academics", "assessment-types", "list", page, search, section, sectionsQuery.data],
    enabled: !sectionsQuery.isLoading,
    queryFn: async () => {
      const raw = await apiRequest<AssessmentTypeResponse[]>(ACADEMICS_ENDPOINTS.LIST_ASSESSMENT_TYPES);
      const mapped: AssessmentType[] = raw.map((a) => ({
        id: String(a.id),
        name: a.name,
        section: a.section != null ? sectionNameById.get(a.section) ?? "Unknown" : "All Sections",
        code: a.code ?? "",
        baseMark: a.base_mark,
        terminalPercent: a.terminal_percentage,
        weekly: a.weeklable,
      }));

      let filtered = filterBySection(mapped, section, sectionNameById);
      if (search) {
        filtered = filtered.filter(
          (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.code.toLowerCase().includes(search.toLowerCase())
        );
      }
      return paginate(filtered, page);
    },
  });
}

export function useAddAssessmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: AssessmentTypeFormValues) => {
      const payload: AssessmentTypePayload = {
        name: values.name,
        code: values.code,
        terminal_percentage: values.terminalPercent,
        base_mark: values.baseMark,
        weeklable: values.weekly,
        section: Number(values.section),
      };
      return apiRequest<AssessmentTypeResponse>(ACADEMICS_ENDPOINTS.CREATE_ASSESSMENT_TYPE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "assessment-types"] }),
  });
}

export function useDeleteAssessmentType() {
  const qc = useQueryClient();
  return useMutation({
    //@ts-ignore
    mutationFn: async (id: string) => {
      // TODO: no delete endpoint for assessment types in the API doc yet
      await new Promise((r) => setTimeout(r, 300));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "assessment-types"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// GRADES
// ─────────────────────────────────────────────────────────────────────────────
export function useGradesList(page: number, search: string, section: string | "All") {
  const sectionsQuery = useSectionsList();
  const sectionNameById = new Map((sectionsQuery.data ?? []).map((s) => [s.id, s.title]));

  return useQuery({
    queryKey: ["academics", "grades", "list", page, search, section, sectionsQuery.data],
    enabled: !sectionsQuery.isLoading,
    queryFn: async () => {
      const raw = await apiRequest<GradeResponse[]>(ACADEMICS_ENDPOINTS.LIST_GRADES);
      const mapped: Grade[] = raw.map((g) => ({
        id: String(g.id),
        caption: g.caption,
        minScore: g.minimum_score,
        maxScore: g.maximum_score,
        remark: g.remark ?? "Pass", // API sends null in practice
        section: sectionNameById.get(g.section) ?? "Unknown",
      }));

      let filtered = filterBySection(mapped, section, sectionNameById);
      if (search) {
        filtered = filtered.filter(
          (g) =>
            g.caption.toLowerCase().includes(search.toLowerCase()) ||
            g.remark.toLowerCase().includes(search.toLowerCase())
        );
      }
      return paginate(filtered, page);
    },
  });
}

export function useAddGrade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: GradeFormValues) => {
      const payload: GradePayload = {
        caption: values.caption,
        minimum_score: values.minScore,
        maximum_score: values.maxScore,
        section: Number(values.section),
      };
      return apiRequest<GradeResponse>(ACADEMICS_ENDPOINTS.CREATE_GRADE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "grades"] }),
  });
}

export function useDeleteGrade() {
  const qc = useQueryClient();
  return useMutation({
    //@ts-ignore
    mutationFn: async (id: string) => {
      // TODO: no delete endpoint for grades in the API doc yet
      await new Promise((r) => setTimeout(r, 300));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "grades"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PSYCHOMOTIVE (unchanged — still mock)
// ─────────────────────────────────────────────────────────────────────────────
let psychomotiveStore = [...mockPsychomotiveMetrics];

export function usePsychomotiveList(page: number, search: string, section: string | "All") {
  return useQuery({
    queryKey: ["academics", "psychomotive", page, search, section],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      let filtered = section === "All" ? psychomotiveStore : psychomotiveStore.filter((d) => d.section === section);
      if (search)
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
      return paginate(filtered, page);
    },
  });
}

export function useAddPsychomotive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<PsychomotiveMetric, "id">) => {
      await new Promise((r) => setTimeout(r, 500));
      const newItem: PsychomotiveMetric = {
        ...payload,
        id: `PSY-${String(psychomotiveStore.length + 1).padStart(3, "0")}`,
      };
      psychomotiveStore = [newItem, ...psychomotiveStore];
      return newItem;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "psychomotive"] }),
  });
}

export function useDeletePsychomotive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((r) => setTimeout(r, 300));
      psychomotiveStore = psychomotiveStore.filter((p) => p.id !== id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "psychomotive"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULTS / PROMOTION / SCORES / ATTENDANCE (unchanged, still mock)
// ─────────────────────────────────────────────────────────────────────────────
export const useLoadStudentResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { studentName: string; term: string; session: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["student-results"] }),
  });
};

export const useLoadClassResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { term: string; session: string; class: string; class_group: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["class-results"] }),
  });
};

export const usePromoteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { class: string; class_group: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["promote-class"] }),
  });
};

export const useManageScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { subject: string; assessment_type: string; term: string; session: string; class: string; class_group: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["manage-score"] }),
  });
};

export const useAttendanceSummary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { term: string; session: string; class: string; class_group: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendance-summary"] }),
  });
};

export const useSaveAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AttendanceFormValues) => {
      // TODO: Replace with actual API call e.g. api.post(`/academics/attendance-summary/`, payload)
      await new Promise((r) => setTimeout(r, 800));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-result"] });
    },
  });
};

export const useSavePsychomotive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PsychomotiveFormValues) => {
      // TODO: Replace with actual API call e.g. api.post(`/academics/psychomotive-scores/`, payload)
      await new Promise((r) => setTimeout(r, 800));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-result"] });
    },
  });
};

export const useSaveResultComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ResultCommentFormValues) => {
      // TODO: Replace with actual API call e.g. api.post(`/academics/result-comments/`, payload)
      await new Promise((r) => setTimeout(r, 800));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-result"] });
    },
  });
};
export const useSaveScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; score: number }) => {
      // TODO: Replace with actual API call e.g. api.post(`/academics/scores/${payload.id}/`, payload)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["manage-scores"] }),
  });
};

export const useSaveAllScores = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; score: number }[]) => {
      // TODO: Replace with actual API call e.g. api.post(`/academics/scores/bulk-save/`, payload)
      await new Promise((r) => setTimeout(r, 800));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["manage-scores"] }),
  });
};

export const usePromoteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; nextClass: string }) => {
      // TODO: Replace with actual API call e.g. api.post(`/academics/promote/`, payload)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["promote-students"] }),
  });
};

export const useRepeatStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      // TODO: Replace with actual API call e.g. api.post(`/academics/repeat/`, payload)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["promote-students"] }),
  });
};

export const useUndoPromotion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      // TODO: Replace with actual API call e.g. api.post(`/academics/undo-promotion/`, payload)
      await new Promise((r) => setTimeout(r, 400));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["promote-students"] }),
  });
};