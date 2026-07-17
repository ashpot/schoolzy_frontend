import type { StudentDetails, Subject } from "../types";

export const mockStudentDetails: StudentDetails = {
  name: "James Carter",
  className: "SS 2A",
  admissionNumber: "ADM/2024/007",
  currentClass: "SS 2A (Science)",
  formTeacher: "Ms. Kim Williams",
};

export const mockSubjects: Subject[] = [
  { id: "1", name: "English Language", code: "ENG", elective: false },
  { id: "2", name: "Mathematics", code: "MAT", elective: false },
  { id: "3", name: "Biology", code: "BIO", elective: false },
  { id: "4", name: "Chemistry", code: "CHE", elective: false },
  { id: "5", name: "Economics", code: "ECO", elective: false },
  { id: "6", name: "Government", code: "GOV", elective: true },
  { id: "7", name: "Physics", code: "PHY", elective: false },
  { id: "8", name: "Further Mathematics", code: "FMT", elective: true },
];