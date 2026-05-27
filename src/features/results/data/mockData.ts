import type { AssessmentTypeOption, Student } from "../types";

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