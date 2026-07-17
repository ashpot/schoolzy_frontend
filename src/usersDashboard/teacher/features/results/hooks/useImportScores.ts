import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadCsv = () => {
  const queryClient = useQueryClient();
  return useMutation({
    //@ts-ignore
    mutationFn: async (payload: { classId: string; subjectId: string; term: string; file: File }) => {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append("file", payload.file);
      // return api.post("/results/import-csv", formData);
      await new Promise((r) => setTimeout(r, 1200));
      return { success: true, rowsImported: 12 };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploaded-scores"] });
    },
  });
};

export const useDownloadTemplate = () => {
  return useMutation({
    //@ts-ignore
    mutationFn: async (payload: { classId: string; subjectId: string }) => {
      // TODO: Replace with actual API call
      // return api.get("/results/csv-template", { params: payload, responseType: "blob" });
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
  });
};