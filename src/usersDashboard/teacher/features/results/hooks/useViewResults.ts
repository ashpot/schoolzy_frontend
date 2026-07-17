import { useMutation } from "@tanstack/react-query";
import type { StudentResultSheet } from "../types";

export const useLoadStudentResult = () => {
  return useMutation({
    //@ts-ignore
    mutationFn: async (payload: { studentId: string; term: string; session: string }): Promise<StudentResultSheet> => {
      // TODO: Replace with actual API call
      // return api.get(`/results/student/${payload.studentId}`, { params: payload });
      await new Promise((r) => setTimeout(r, 800));
      return {
        studentName: "Kehinde Fashola",
        admissionNo: "ADM/2024/001",
        className: "JSS 3A",
        term: "First Term",
        session: "2025/2026",
        teacherName: "Ms. Kim Williams",
        subjects: [
          { subject: "Mathematics", assessment: 18.7, exam: 35.5, total: 54.2, grade: "D", remark: "Fair" },
        ],
        totalScore: 54.2,
        average: 54.2,
        overallGrade: "D",
        overallRemark: "Fair",
        position: "1st",
      };
    },
  });
};