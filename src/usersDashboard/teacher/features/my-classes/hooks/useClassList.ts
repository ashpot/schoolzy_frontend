import { useMutation } from "@tanstack/react-query";
import { mockEnrolledStudents } from "../data/mockData";
import type { EnrolledStudent } from "../types";
import type { ClassListFilterValues } from "../schemas";

export const useLoadStudents = () => {
  return useMutation({
    mutationFn: async (_filters: ClassListFilterValues): Promise<EnrolledStudent[]> => {
      // TODO: Replace with actual API call
      // return api.get(`/classes/${filters.classId}/students`, { params: filters });
      await new Promise((r) => setTimeout(r, 800));
      return mockEnrolledStudents;
    },
  });
};