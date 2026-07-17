import { useQuery } from "@tanstack/react-query";
import { mockTeacherDetails, mockSubjects } from "../data/mockData";

export const useTeacherDetails = () => {
  return useQuery({
    queryKey: ["teacher-details"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/teacher/me");
      await new Promise((r) => setTimeout(r, 300));
      return mockTeacherDetails;
    },
  });
};

export const useMySubjects = () => {
  return useQuery({
    queryKey: ["teacher-subjects"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/teacher/subjects");
      await new Promise((r) => setTimeout(r, 300));
      return mockSubjects;
    },
  });
};