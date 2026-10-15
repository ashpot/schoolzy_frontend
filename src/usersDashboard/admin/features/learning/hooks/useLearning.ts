import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { USERS_ENDPOINTS } from "@/usersDashboard/admin/features/users/api";
import { useClassGroupsList, useClassesList } from "@/usersDashboard/admin/features/sections/hooks/useSections";
import type { LoadAttendanceValues, UploadLessonNoteValues } from "../schemas";
import type {
  AttendanceStudent, ClassGroupOption, LessonNote, LessonNoteResponse, SubjectResponse, UserNameResponse,
} from "../types";
import { mockAttendanceStudents } from "../data/mockData";
import { LEARNING_ENDPOINTS } from "../api";
import { titleCase, toLessonNote } from "../shared/utils/lessonNoteMapper";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Lesson notes (wired) ─────────────────────────────────────────────────────
// Backend returns teacher as an id only → resolve names via users list. Newest first.
export const useLessonNotesList = () =>
  useQuery({
    queryKey: ["lesson-notes", "list"],
    queryFn: async (): Promise<LessonNote[]> => {
      const [raw, users] = await Promise.all([
        apiRequest<LessonNoteResponse[]>(LEARNING_ENDPOINTS.LESSON_NOTES),
        apiRequest<UserNameResponse[]>(USERS_ENDPOINTS.LIST_ALL),
      ]);
      const userMap = new Map(users.map((u) => [u.id, `${u.first_name} ${u.last_name}`]));
      return [...raw].sort((a, b) => b.id - a.id).map((r) => toLessonNote(r, userMap));
    },
  });

export const useLessonSubjects = () =>
  useQuery({
    queryKey: ["subjects", "list"],
    queryFn: () => apiRequest<SubjectResponse[]>(LEARNING_ENDPOINTS.SUBJECTS),
  });

// Class groups carry no section id → map group → parent class → section
export const useClassGroupOptions = () => {
  const groups = useClassGroupsList();
  const classes = useClassesList();
  const sectionOf = new Map((classes.data ?? []).map((c) => [c.id, c.section]));
  const options: ClassGroupOption[] = (groups.data ?? []).map((g) => ({
    value: String(g.id),
    label: titleCase(g.name),
    section: sectionOf.get(g.parent_class) ?? null,
  }));
  return { options, isLoading: groups.isLoading || classes.isLoading };
};

export const useUploadLessonNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: UploadLessonNoteValues) => {
      // multipart: teacher is intentionally omitted (backend uses the auth token)
      const fd = new FormData();
      fd.append("title", values.title);
      fd.append("class_group", values.classGroup);
      fd.append("subject", values.subject);
      fd.append("note", (values.file as FileList)[0]);
      if (values.description?.trim()) fd.append("content", values.description.trim());
      return apiRequest<LessonNoteResponse>(LEARNING_ENDPOINTS.LESSON_NOTES, { method: "POST", body: fd });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lesson-notes"] }),
  });
};

// ─── Approve / Reject (still mocked — endpoints pending from backend) ─────────
type ReviewPayload = { noteId: string; review?: string };

export const useApproveLessonNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ReviewPayload) => {
      // TODO: Replace with actual API call
      // return api.post(`/lesson-notes/${payload.noteId}/approve`, { review: payload.review });
      await delay(600);
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lesson-notes"] }),
  });
};

export const useRejectLessonNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ReviewPayload) => {
      // TODO: Replace with actual API call
      // return api.post(`/lesson-notes/${payload.noteId}/reject`, { review: payload.review });
      await delay(600);
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lesson-notes"] }),
  });
};

// ─── Attendance (still mocked) ────────────────────────────────────────────────
export const useLoadAttendanceStudents = () =>
  useMutation({
    mutationFn: async (_payload: LoadAttendanceValues) => {
      // TODO: Replace with actual API call
      // return api.get(`/attendance/students?class=${payload.class}&group=${payload.classGroup}&date=${payload.date}`);
      await delay(1000);
      return { className: "Nursery 1A", totalStudents: 34, students: mockAttendanceStudents };
    },
  });

export const useSaveAttendance = () => {
  const qc = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationFn: async (payload: { class: string; classGroup: string; date: string; students: AttendanceStudent[] }) => {
      // TODO: Replace with actual API call
      // return api.post("/attendance/save", payload);
      await delay(1000);
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attendance"] }),
  });
};