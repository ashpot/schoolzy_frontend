import type { ResultSheet } from "../types";
import { computeGrade, gradeRemarks } from "../utils/gradeUtils";

export const termOptions = [
  { label: "First Term", value: "first" },
  { label: "Second Term", value: "second" },
  { label: "Third Term", value: "third" },
];

export const sessionOptions = [
  { label: "2025/2026", value: "2025-2026" },
  { label: "2024/2025", value: "2024-2025" },
];

const rawSubjects = [
  { subject: "English Language", assessmentScore: 29, examScore: 33 },
  { subject: "Mathematics", assessmentScore: 3, examScore: 33 },
  { subject: "Biology", assessmentScore: 8, examScore: 33 },
  { subject: "Chemistry", assessmentScore: 13, examScore: 30 },
  { subject: "Economics", assessmentScore: 20, examScore: 30 },
  { subject: "Government", assessmentScore: 25, examScore: 30 },
  { subject: "Physics", assessmentScore: 30, examScore: 27 },
  { subject: "Further Mathematics", assessmentScore: 4, examScore: 27 },
];

export const mockResultSheet: ResultSheet = {
  studentName: "Taiwo Okonkwo",
  admissionNumber: "ADM/2024/007",
  className: "SS 2A",
  session: "2024-2025",
  term: "first",
  formTeacher: "Mr. Emeka Nwosu",
  subjects: rawSubjects.map((s, i) => {
    const totalScore = s.assessmentScore + s.examScore;
    const grade = computeGrade(totalScore);
    return { id: String(i + 1), ...s, totalScore, grade, remark: gradeRemarks[grade] };
  }),
  classPosition: 5,
  classSize: 13,
  overallAverage: 47,
  overallRemark: "Fair performance. Work harder next term.",
};