import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SchoolSettingsValues, TestimonialValues, NewsPostValues } from "../schemas";
import type { SchoolSettingsResponse } from "../types";
import { apiRequest } from "@/shared/lib/apiClient";
import { SETTINGS_ENDPOINTS } from "../api";

export const useSchoolSettings = () => {
  return useQuery({
    queryKey: ["school-settings"],
    queryFn: async () => apiRequest<SchoolSettingsResponse>(SETTINGS_ENDPOINTS.SCHOOL_SETTINGS),
  });
};

export const useSaveSchoolSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: SchoolSettingsValues) => {
      const fd = new FormData();
      if (values.motto) fd.append("motto", values.motto);
      if (values.timezone) fd.append("timezone", values.timezone);
      fd.append("email", values.email);
      if (values.phone) fd.append("phone", values.phone);
      if (values.alternate_phone) fd.append("alternate_phone", values.alternate_phone);
      if (values.address) fd.append("address", values.address);
      if (values.city) fd.append("city", values.city);
      if (values.state) fd.append("state", values.state);
      if (values.website) fd.append("website", values.website);
      if (values.primary_color) fd.append("primary_color", values.primary_color);
      if (values.secondary_color) fd.append("secondary_color", values.secondary_color);
      // Only append files when a new one was picked — sending the existing
      // logo URL back as text isn't valid for a file field
      if (values.logo instanceof File) fd.append("logo", values.logo);
      if (values.favicon instanceof File) fd.append("favicon", values.favicon);

      return apiRequest<SchoolSettingsResponse>(SETTINGS_ENDPOINTS.SCHOOL_SETTINGS, {
        method: "PATCH",
        body: fd,
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["school-settings"], data);
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