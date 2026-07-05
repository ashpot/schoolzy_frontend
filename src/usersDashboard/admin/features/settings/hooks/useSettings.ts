import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SchoolSettingsValues } from "../schemas";
import type { TestimonialValues, NewsPostValues } from "../schemas";

export const useSaveSchoolSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationFn: async (payload: SchoolSettingsValues) => {
      // TODO: Replace with actual API call e.g. api.put("/settings/school", payload)
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-settings"] });
    },
  });
};

export const useAddTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TestimonialValues) => {
      // TODO: Replace with actual API call e.g. api.post("/testimonials", payload)
      await new Promise((r) => setTimeout(r, 800));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call e.g. api.delete(`/testimonials/${id}`)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const usePublishNewsPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: NewsPostValues) => {
      // TODO: Replace with actual API call e.g. api.post("/news", payload)
      await new Promise((r) => setTimeout(r, 900));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-posts"] });
    },
  });
};

export const useDeleteNewsPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call e.g. api.delete(`/news/${id}`)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-posts"] });
    },
  });
};