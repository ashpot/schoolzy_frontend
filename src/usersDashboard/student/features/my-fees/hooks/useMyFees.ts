import { useQuery } from "@tanstack/react-query";
import { mockFeeProfile, mockFeeRecords } from "../data/mockData";

export const useFeeProfile = () => {
  return useQuery({
    queryKey: ["student-fee-profile"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/students/me/fees/profile");
      await new Promise((r) => setTimeout(r, 400));
      return mockFeeProfile;
    },
  });
};

export const useFeeRecords = () => {
  return useQuery({
    queryKey: ["student-fee-records"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/students/me/fees/records");
      await new Promise((r) => setTimeout(r, 400));
      return mockFeeRecords;
    },
  });
};