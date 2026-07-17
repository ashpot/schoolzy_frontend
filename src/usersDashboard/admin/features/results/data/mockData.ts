import type { AssessmentTypeOption, Student, ViewScore } from "../types";

export const classOptions = [
  { value: "jss1", label: "JSS 1" },
  { value: "jss2", label: "JSS 2" },
  { value: "jss3", label: "JSS 3" },
  { value: "ss1",  label: "SS 1"  },
  { value: "ss2",  label: "SS 2"  },
  { value: "ss3",  label: "SS 3"  },
];

export const classGroupOptions = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
  { value: "d", label: "D" },
];

export const subjectOptions = [
  { value: "mathematics", label: "Mathematics"      },
  { value: "english",     label: "English Language" },
  { value: "physics",     label: "Physics"          },
  { value: "chemistry",   label: "Chemistry"        },
  { value: "biology",     label: "Biology"          },
  { value: "economics",   label: "Economics"        },
];

export const assessmentTypeOptions: AssessmentTypeOption[] = [
  { value: "examination", label: "Examination", maxScore: 60 },
  { value: "ca1",         label: "CA 1",        maxScore: 20 },
  { value: "ca2",         label: "CA 2",        maxScore: 20 },
  { value: "test",        label: "Test",        maxScore: 30 },
  { value: "assignment",  label: "Assignment",  maxScore: 10 },
];

export const termOptions = [
  { value: "first",  label: "First Term"  },
  { value: "second", label: "Second Term" },
  { value: "third",  label: "Third Term"  },
];

export const mockStudents: Student[] = [
  { id: "1",  name: "Adebayo Oluwaseun",  studentId: "STU-001" },
  { id: "2",  name: "Chidinma Okonkwo",   studentId: "STU-002" },
  { id: "3",  name: "Ibrahim Musa",       studentId: "STU-003" },
  { id: "4",  name: "Fatima Sule",        studentId: "STU-004" },
  { id: "5",  name: "Emeka Nwosu",        studentId: "STU-005" },
  { id: "6",  name: "Aisha Bello",        studentId: "STU-006" },
  { id: "7",  name: "Tunde Adeyemi",      studentId: "STU-007" },
  { id: "8",  name: "Ngozi Eze",          studentId: "STU-008" },
  { id: "9",  name: "Yusuf Abdullahi",    studentId: "STU-009" },
  { id: "10", name: "Blessing Obi",       studentId: "STU-010" },
  { id: "11", name: "Kehinde Babatunde",  studentId: "STU-011" },
  { id: "12", name: "Amaka Eze",          studentId: "STU-012" },
];

export const studentOptions = mockStudents.map((s) => ({
  value: s.id,
  label: s.name,
}));

export const mockViewScores: ViewScore[] = [
  { studentId: "STU-001", name: "Adebayo Oluwaseun",  assignment: 12, test: 12, exam: 20, total: 44, grade: "E" },
  { studentId: "STU-006", name: "Aisha Bello",        assignment: 21, test: 15, exam: 36, total: 72, grade: "B" },
  { studentId: "STU-012", name: "Amaka Eze",          assignment: 18, test: 15, exam: 35, total: 68, grade: "B" },
  { studentId: "STU-010", name: "Blessing Obi",       assignment: 22, test:  8, exam: 31, total: 61, grade: "C" },
  { studentId: "STU-002", name: "Chidinma Okonkwo",   assignment: 22, test: 12, exam: 29, total: 63, grade: "C" },
  { studentId: "STU-005", name: "Emeka Nwosu",        assignment: 21, test: 14, exam: 48, total: 83, grade: "A" },
  { studentId: "STU-004", name: "Fatima Sule",        assignment: 28, test: 17, exam: 25, total: 70, grade: "B" },
  { studentId: "STU-003", name: "Ibrahim Musa",       assignment: 16, test: 17, exam: 27, total: 60, grade: "C" },
  { studentId: "STU-011", name: "Kehinde Babatunde",  assignment: 12, test:  8, exam: 25, total: 45, grade: "D" },
  { studentId: "STU-008", name: "Ngozi Eze",          assignment: 27, test: 17, exam: 24, total: 68, grade: "B" },
  { studentId: "STU-007", name: "Tunde Adeyemi",      assignment: 25, test: 17, exam: 42, total: 84, grade: "A" },
  { studentId: "STU-009", name: "Yusuf Abdullahi",    assignment: 18, test: 12, exam: 47, total: 77, grade: "A" },
];