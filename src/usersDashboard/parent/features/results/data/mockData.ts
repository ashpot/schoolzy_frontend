import type { ResultSheet } from "../types";

export const childOptions = [
  { value: "c1", label: "Chukwuemeka Felix (ADM/2024/001)" },
  { value: "c2", label: "Adaeze Felix (ADM/2024/002)" },
];

export const sessionOptions = [
  { value: "2024/2025", label: "2024/2025" },
  { value: "2023/2024", label: "2023/2024" },
];

export const termOptions = [
  { value: "First Term", label: "First Term" },
  { value: "Second Term", label: "Second Term" },
  { value: "Third Term", label: "Third Term" },
];

export const mockResultSheet: ResultSheet = {
  studentName: "Chukwuemeka Felix",
  admissionNo: "ADM/2024/001",
  class: "JSS 3A",
  session: "2024/2025",
  term: "First Term",
  average: 78,
  position: "5th",
  remark: "Very Good",
  subjects: [
    { subject: "Mathematics", ca: 28, exam: 58, total: 86, grade: "A", remark: "Excellent" },
    { subject: "English Language", ca: 25, exam: 52, total: 77, grade: "B", remark: "Very Good" },
    { subject: "Basic Science", ca: 27, exam: 55, total: 82, grade: "A", remark: "Excellent" },
    { subject: "Social Studies", ca: 22, exam: 50, total: 72, grade: "B", remark: "Very Good" },
    { subject: "Civic Education", ca: 24, exam: 48, total: 72, grade: "B", remark: "Very Good" },
    { subject: "Computer Studies", ca: 29, exam: 60, total: 89, grade: "A", remark: "Excellent" },
    { subject: "Agricultural Science", ca: 20, exam: 45, total: 65, grade: "C", remark: "Good" },
  ],
};