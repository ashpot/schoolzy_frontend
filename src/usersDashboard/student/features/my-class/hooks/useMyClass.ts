import { useQuery } from "@tanstack/react-query";
import { mockClassmates } from "../data/mockData";

export const useClassmates = () => {
  return useQuery({
    queryKey: ["student-classmates"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/students/me/class");
      await new Promise((r) => setTimeout(r, 400));
      return mockClassmates;
    },
  });
};