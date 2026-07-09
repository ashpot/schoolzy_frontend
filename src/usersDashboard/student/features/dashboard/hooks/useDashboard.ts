import { useQuery } from "@tanstack/react-query";
import { mockStudentDetails, mockSubjects } from "../data/mockData";

export const useStudentDetails = () => {
  return useQuery({
    queryKey: ["student-details"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/students/me");
      await new Promise((r) => setTimeout(r, 400));
      return mockStudentDetails;
    },
  });
};

export const useMySubjects = () => {
  return useQuery({
    queryKey: ["student-subjects"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/students/me/subjects");
      await new Promise((r) => setTimeout(r, 400));
      return mockSubjects;
    },
  });
};