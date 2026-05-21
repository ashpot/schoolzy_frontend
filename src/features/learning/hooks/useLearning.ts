import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UploadLessonNoteValues, LoadAttendanceValues } from "../schemas";
import type { AttendanceStudent } from "../types";
import { mockAttendanceStudents } from "../data/mockData";

// Lesson Notes

export const useUploadLessonNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UploadLessonNoteValues) => {
      // TODO: Replace with actual API call
      // return api.post("/lesson-notes", payload);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson-notes"] });
    },
  });
};

export const useDeleteLessonNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // @ts-ignore
    mutationFn: async (noteId: string) => {
      // TODO: Replace with actual API call
      // return api.delete(`/lesson-notes/${noteId}`);
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson-notes"] });
    },
  });
};

// Attendance

export const useLoadAttendanceStudents = () => {
  return useMutation({
    mutationFn: async (_payload: LoadAttendanceValues) => {
      // TODO: Replace with actual API call
      // return api.get(`/attendance/students?class=${payload.class}&group=${payload.classGroup}&date=${payload.date}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        className: "Nursery 1A",
        totalStudents: 34,
        students: mockAttendanceStudents,
      };
    },
  });
};

export const useSaveAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // @ts-ignore
    mutationFn: async (payload: {
      class: string;
      classGroup: string;
      date: string;
      students: AttendanceStudent[];
    }) => {
      // TODO: Replace with actual API call
      // return api.post("/attendance/save", payload);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });
};