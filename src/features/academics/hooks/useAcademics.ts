import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  mockSubjects,
  mockSubjectTeachers,
  mockAssessmentTypes,
  mockGrades,
  mockPsychomotiveMetrics,
} from "../data/mockData";
import type {
  Subject,
  SubjectTeacherAssignment,
  AssessmentType,
  Grade,
  PsychomotiveMetric,
  SchoolSection,
} from "../types";

const PER_PAGE = 8;

function paginate<T>(data: T[], page: number) {
  const start = (page - 1) * PER_PAGE;
  return { items: data.slice(start, start + PER_PAGE), total: data.length };
}

function filterBySection<T extends { section: SchoolSection }>(
  data: T[],
  section: SchoolSection | "All"
) {
  return section === "All" ? data : data.filter((d) => d.section === section);
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBJECTS
// ─────────────────────────────────────────────────────────────────────────────
let subjectsStore = [...mockSubjects];

export function useSubjectsList(page: number, search: string, section: SchoolSection | "All") {
  return useQuery({
    queryKey: ["academics", "subjects", page, search, section],
    queryFn: async () => {
      // TODO: replace with api.get(`/academics/subjects?page=${page}&search=${search}&section=${section}`)
      await new Promise((r) => setTimeout(r, 200));
      let filtered = filterBySection(subjectsStore, section);
      if (search)
        filtered = filtered.filter(
          (s) =>
            s.subjectName.toLowerCase().includes(search.toLowerCase()) ||
            s.code.toLowerCase().includes(search.toLowerCase())
        );
      return paginate(filtered, page);
    },
  });
}

export function useAddSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Subject, "id">) => {
      // TODO: replace with api.post("/academics/subjects", payload)
      await new Promise((r) => setTimeout(r, 500));
      const newItem: Subject = {
        ...payload,
        id: `SUB-${String(subjectsStore.length + 1).padStart(3, "0")}`,
      };
      subjectsStore = [newItem, ...subjectsStore];
      return newItem;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "subjects"] }),
  });
}

export function useDeleteSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: replace with api.delete(`/academics/subjects/${id}`)
      await new Promise((r) => setTimeout(r, 300));
      subjectsStore = subjectsStore.filter((s) => s.id !== id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "subjects"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBJECT TEACHERS
// ─────────────────────────────────────────────────────────────────────────────
let subjectTeachersStore = [...mockSubjectTeachers];

export function useSubjectTeachersList(page: number, search: string, section: SchoolSection | "All") {
  return useQuery({
    queryKey: ["academics", "subject-teachers", page, search, section],
    queryFn: async () => {
      // TODO: replace with api.get(`/academics/subject-teachers?page=${page}&search=${search}&section=${section}`)
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
      // TODO: replace with api.post("/academics/subject-teachers", payload)
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
      // TODO: replace with api.delete(`/academics/subject-teachers/${id}`)
      await new Promise((r) => setTimeout(r, 300));
      subjectTeachersStore = subjectTeachersStore.filter((s) => s.id !== id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "subject-teachers"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT TYPES
// ─────────────────────────────────────────────────────────────────────────────
let assessmentTypesStore = [...mockAssessmentTypes];

export function useAssessmentTypesList(page: number, search: string, section: SchoolSection | "All") {
  return useQuery({
    queryKey: ["academics", "assessment-types", page, search, section],
    queryFn: async () => {
      // TODO: replace with api.get(`/academics/assessment-types?page=${page}&search=${search}&section=${section}`)
      await new Promise((r) => setTimeout(r, 200));
      let filtered = filterBySection(assessmentTypesStore, section);
      if (search)
        filtered = filtered.filter(
          (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.code.toLowerCase().includes(search.toLowerCase())
        );
      return paginate(filtered, page);
    },
  });
}

export function useAddAssessmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<AssessmentType, "id">) => {
      // TODO: replace with api.post("/academics/assessment-types", payload)
      await new Promise((r) => setTimeout(r, 500));
      const newItem: AssessmentType = {
        ...payload,
        id: `AT-${String(assessmentTypesStore.length + 1).padStart(3, "0")}`,
      };
      assessmentTypesStore = [newItem, ...assessmentTypesStore];
      return newItem;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "assessment-types"] }),
  });
}

export function useDeleteAssessmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: replace with api.delete(`/academics/assessment-types/${id}`)
      await new Promise((r) => setTimeout(r, 300));
      assessmentTypesStore = assessmentTypesStore.filter((a) => a.id !== id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "assessment-types"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// GRADES
// ─────────────────────────────────────────────────────────────────────────────
let gradesStore = [...mockGrades];

export function useGradesList(page: number, search: string, section: SchoolSection | "All") {
  return useQuery({
    queryKey: ["academics", "grades", page, search, section],
    queryFn: async () => {
      // TODO: replace with api.get(`/academics/grades?page=${page}&search=${search}&section=${section}`)
      await new Promise((r) => setTimeout(r, 200));
      let filtered = filterBySection(gradesStore, section);
      if (search)
        filtered = filtered.filter(
          (g) =>
            g.caption.toLowerCase().includes(search.toLowerCase()) ||
            g.remark.toLowerCase().includes(search.toLowerCase())
        );
      return paginate(filtered, page);
    },
  });
}

export function useAddGrade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Grade, "id">) => {
      // TODO: replace with api.post("/academics/grades", payload)
      await new Promise((r) => setTimeout(r, 500));
      const newItem: Grade = {
        ...payload,
        id: `GRD-${String(gradesStore.length + 1).padStart(3, "0")}`,
      };
      gradesStore = [newItem, ...gradesStore];
      return newItem;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "grades"] }),
  });
}

export function useDeleteGrade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: replace with api.delete(`/academics/grades/${id}`)
      await new Promise((r) => setTimeout(r, 300));
      gradesStore = gradesStore.filter((g) => g.id !== id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "grades"] }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PSYCHOMOTIVE
// ─────────────────────────────────────────────────────────────────────────────
let psychomotiveStore = [...mockPsychomotiveMetrics];

export function usePsychomotiveList(page: number, search: string, section: SchoolSection | "All") {
  return useQuery({
    queryKey: ["academics", "psychomotive", page, search, section],
    queryFn: async () => {
      // TODO: replace with api.get(`/academics/psychomotive?page=${page}&search=${search}&section=${section}`)
      await new Promise((r) => setTimeout(r, 200));
      let filtered = filterBySection(psychomotiveStore, section);
      if (search)
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
      return paginate(filtered, page);
    },
  });
}

export function useAddPsychomotive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<PsychomotiveMetric, "id">) => {
      // TODO: replace with api.post("/academics/psychomotive", payload)
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
      // TODO: replace with api.delete(`/academics/psychomotive/${id}`)
      await new Promise((r) => setTimeout(r, 300));
      psychomotiveStore = psychomotiveStore.filter((p) => p.id !== id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academics", "psychomotive"] }),
  });
}