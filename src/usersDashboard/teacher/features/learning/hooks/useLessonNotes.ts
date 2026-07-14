import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockLessonNotes } from "../data/mockData";
import type { UploadLessonNoteValues } from "../schemas";

export const useLessonNotesList = () => {
  return useQuery({
    queryKey: ["lesson-notes"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/lesson-notes");
      await new Promise((r) => setTimeout(r, 300));
      return mockLessonNotes;
    },
  });
};

export const useUploadLessonNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: UploadLessonNoteValues) => {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append("file", values.file[0]);
      // return api.post("/lesson-notes", formData);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: values };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson-notes"] });
    },
  });
};

export const useDeleteLessonNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call e.g. api.delete(`/lesson-notes/${id}`)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson-notes"] });
    },
  });
};