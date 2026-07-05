import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoadedRecord } from "../types";
import { mockStudents } from "../data/mockData";
import type { LocateStudentValues, OmittedScoreValues } from "../schemas/uploadOmited";

export const useLoadStudentRecord = () => {
  return useMutation({
    mutationFn: async (values: LocateStudentValues): Promise<LoadedRecord> => {
      // TODO: Replace with actual API call
      // return api.get(`/students/${values.student}/omitted-record?class=${values.class}&subject=${values.subject}`);
      await new Promise((r) => setTimeout(r, 800));
      const student = mockStudents.find((s) => s.id === values.student) ?? mockStudents[0];
      return {
        student,
        class:      values.class,
        classGroup: values.classGroup,
        subject:    values.subject,
      };
    },
  });
};

export const useSaveOmittedResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { record: LoadedRecord; scores: OmittedScoreValues }) => {
      // TODO: Replace with actual API call
      // return api.post("/results/upload-omitted", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploaded-scores"] });
    },
  });
};