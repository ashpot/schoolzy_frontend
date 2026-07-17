import type { ResultStudent, AssessmentTypeOption, OmittedStudent } from "../types";
import type { SubjectResultRow2, UploadedScoreRow } from "../types";

export const classOptions = [
  { value: "jss3a", label: "JSS 3A" },
  { value: "jss2a", label: "JSS 2A" },
  { value: "jss1a", label: "JSS 1A" },
];

export const subjectOptions = [
  { value: "mathematics", label: "Mathematics" },
  { value: "english", label: "English Language" },
  { value: "basic-science", label: "Basic Science" },
];

export const termOptions = [
  { value: "first-term", label: "First Term" },
  { value: "second-term", label: "Second Term" },
  { value: "third-term", label: "Third Term" },
];

export const sessionOptions = [
  { value: "2025-2026", label: "2025/2026" },
  { value: "2024-2025", label: "2024/2025" },
];

export const assessmentTypeOptions: AssessmentTypeOption[] = [
  { value: "assignment", label: "Assignment", maxScore: 30 },
  { value: "test", label: "Test", maxScore: 20 },
  { value: "examination", label: "Examination", maxScore: 60 },
  { value: "end-of-term-exam", label: "End of Term Exam", maxScore: 50 },
];

export const mockStudents: ResultStudent[] = [
  { id: "STU-001", name: "Adebayo Oluwaseun", admissionNo: "ADM/2024/001" },
  { id: "STU-002", name: "Chidinma Okonkwo", admissionNo: "ADM/2024/002" },
  { id: "STU-003", name: "Ibrahim Musa", admissionNo: "ADM/2024/003" },
  { id: "STU-004", name: "Fatima Sule", admissionNo: "ADM/2024/004" },
  { id: "STU-005", name: "Emeka Nwosu", admissionNo: "ADM/2024/005" },
  { id: "STU-006", name: "Aisha Bello", admissionNo: "ADM/2024/006" },
  { id: "STU-007", name: "Tunde Adeyemi", admissionNo: "ADM/2024/007" },
  { id: "STU-008", name: "Ngozi Eze", admissionNo: "ADM/2024/008" },
  { id: "STU-009", name: "Yusuf Abdullahi", admissionNo: "ADM/2024/009" },
  { id: "STU-010", name: "Blessing Obi", admissionNo: "ADM/2024/010" },
  { id: "STU-011", name: "Kehinde Babatunde", admissionNo: "ADM/2024/011" },
  { id: "STU-012", name: "Amaka Eze", admissionNo: "ADM/2024/012" },
];

export const mockOmittedStudents: OmittedStudent[] = [
  { id: "STU-013", name: "Kehinde Fashola", admissionNo: "ADM/2024/001", reason: "Absent during exam", score: null },
  { id: "STU-014", name: "Obiageli Nnaemeka", admissionNo: "ADM/2024/002", reason: "Result sheet missing", score: null },
  { id: "STU-015", name: "Abdulrahman Danjuma", admissionNo: "ADM/2024/003", reason: "Late registration", score: null },
];

export const mockSubjectResults: SubjectResultRow2[] = [
  { studentId: "STU-001", studentName: "Kehinde Fashola", admissionNo: "ADM/2024/001", assessmentScore: 21, examScore: 68, totalScore: 89, grade: "A", position: 2, remark: "Excellent" },
  { studentId: "STU-002", studentName: "Obiageli Nnaemeka", admissionNo: "ADM/2024/002", assessmentScore: 29, examScore: 42, totalScore: 71, grade: "B", position: 9, remark: "Very Good" },
  { studentId: "STU-003", studentName: "Abdulrahman Danjuma", admissionNo: "ADM/2024/003", assessmentScore: 19, examScore: 51, totalScore: 70, grade: "B", position: 10, remark: "Very Good" },
  { studentId: "STU-004", studentName: "Tolani Adeola", admissionNo: "ADM/2024/004", assessmentScore: 26, examScore: 59, totalScore: 85, grade: "A", position: 3, remark: "Excellent" },
  { studentId: "STU-005", studentName: "Chinonso Obi", admissionNo: "ADM/2024/005", assessmentScore: 21, examScore: 40, totalScore: 61, grade: "C", position: 12, remark: "Good" },
  { studentId: "STU-006", studentName: "Hadiza Usman", admissionNo: "ADM/2024/006", assessmentScore: 16, examScore: 66, totalScore: 82, grade: "A", position: 5, remark: "Excellent" },
  { studentId: "STU-007", studentName: "Lanre Salami", admissionNo: "ADM/2024/007", assessmentScore: 23, examScore: 69, totalScore: 92, grade: "A", position: 1, remark: "Excellent" },
  { studentId: "STU-008", studentName: "Uchenna Okeke", admissionNo: "ADM/2024/008", assessmentScore: 26, examScore: 59, totalScore: 85, grade: "A", position: 4, remark: "Excellent" },
  { studentId: "STU-009", studentName: "Suleiman Aliyu", admissionNo: "ADM/2024/009", assessmentScore: 29, examScore: 45, totalScore: 74, grade: "B", position: 8, remark: "Very Good" },
  { studentId: "STU-010", studentName: "Adaeze Okoye", admissionNo: "ADM/2024/010", assessmentScore: 26, examScore: 40, totalScore: 66, grade: "B", position: 11, remark: "Very Good" },
  { studentId: "STU-011", studentName: "Bola Adesola", admissionNo: "ADM/2024/011", assessmentScore: 16, examScore: 61, totalScore: 77, grade: "A", position: 6, remark: "Excellent" },
  { studentId: "STU-012", studentName: "Emeka Chibuike", admissionNo: "ADM/2024/012", assessmentScore: 27, examScore: 50, totalScore: 77, grade: "A", position: 7, remark: "Excellent" },
];

export const mockUploadedScores: UploadedScoreRow[] = [
  { studentId: "STU-001", studentName: "Kehinde Fashola", admissionNo: "ADM/2024/001", assignment: 19, test: 2, exam: 41, total: 62, grade: "C", status: "Submitted" },
  { studentId: "STU-002", studentName: "Obiageli Nnaemeka", admissionNo: "ADM/2024/002", assignment: 1, test: 13, exam: 31, total: 45, grade: "D", status: "Submitted" },
  { studentId: "STU-003", studentName: "Abdulrahman Danjuma", admissionNo: "ADM/2024/003", assignment: 11, test: 11, exam: 20, total: 42, grade: "E", status: "Submitted" },
  { studentId: "STU-004", studentName: "Tolani Adeola", admissionNo: "ADM/2024/004", assignment: 17, test: 11, exam: 6, total: 34, grade: "F", status: "Submitted" },
  { studentId: "STU-005", studentName: "Chinonso Obi", admissionNo: "ADM/2024/005", assignment: 7, test: 6, exam: 33, total: 46, grade: "D", status: "Submitted" },
  { studentId: "STU-006", studentName: "Hadiza Usman", admissionNo: "ADM/2024/006", assignment: 26, test: 10, exam: 4, total: 40, grade: "E", status: "Submitted" },
  { studentId: "STU-007", studentName: "Lanre Salami", admissionNo: "ADM/2024/007", assignment: 5, test: 14, exam: 26, total: 45, grade: "D", status: "Submitted" },
  { studentId: "STU-008", studentName: "Uchenna Okeke", admissionNo: "ADM/2024/008", assignment: 12, test: 5, exam: 31, total: 48, grade: "D", status: "Submitted" },
  { studentId: "STU-009", studentName: "Suleiman Aliyu", admissionNo: "ADM/2024/009", assignment: 30, test: 2, exam: 18, total: 50, grade: "C", status: "Submitted" },
  { studentId: "STU-010", studentName: "Adaeze Okoye", admissionNo: "ADM/2024/010", assignment: 12, test: 7, exam: 15, total: 34, grade: "F", status: "Submitted" },
  { studentId: "STU-011", studentName: "Bola Adesola", admissionNo: "ADM/2024/011", assignment: 14, test: 19, exam: 9, total: 42, grade: "E", status: "Submitted" },
  { studentId: "STU-012", studentName: "Emeka Chibuike", admissionNo: "ADM/2024/012", assignment: 6, test: 15, exam: 15, total: 36, grade: "F", status: "Submitted" },
];