import type {
  Subject,
  SubjectTeacherAssignment,
  AssessmentType,
  Grade,
  PsychomotiveMetric,
} from "../types";
import type { StudentResultData } from "../types/studentResult";


// ─── Subjects ─────────────────────────────────────────────────────────────────
export const mockSubjects: Subject[] = [
  { id: "SUB-001", subjectName: "Mathematics", code: "MAT-101", section: "Primary", elective: false },
  { id: "SUB-002", subjectName: "English Language", code: "ENG-101", section: "Primary", elective: false },
  { id: "SUB-003", subjectName: "Basic Science", code: "BSC-101", section: "Primary", elective: false },
  { id: "SUB-004", subjectName: "Social Studies", code: "SST-101", section: "Primary", elective: false },
  { id: "SUB-005", subjectName: "Phonics", code: "PHN101", section: "Nursery", elective: false },
  { id: "SUB-006", subjectName: "Handwriting", code: "HNF101", section: "Nursery", elective: true },
  { id: "SUB-007", subjectName: "Physics", code: "PHY101", section: "Junior Secondary", elective: false },
  { id: "SUB-008", subjectName: "Chemistry", code: "CHM101", section: "Junior Secondary", elective: false },
  { id: "SUB-009", subjectName: "Biology", code: "BIO201", section: "Junior Secondary", elective: false },
  { id: "SUB-010", subjectName: "Economics", code: "ECO-301", section: "Senior Secondary", elective: true },
  { id: "SUB-011", subjectName: "Further Mathematics", code: "FMT-301", section: "Senior Secondary", elective: true },
  { id: "SUB-012", subjectName: "Geography", code: "GEO-201", section: "Junior Secondary", elective: false },
  { id: "SUB-013", subjectName: "Islamic Studies", code: "IRS-101", section: "Primary", elective: true },
  { id: "SUB-014", subjectName: "Agric Studies", code: "AGR-201", section: "Junior Secondary", elective: false },
  { id: "SUB-015", subjectName: "English Literature", code: "LIT-301", section: "Senior Secondary", elective: false },
  { id: "SUB-016", subjectName: "Computer Science", code: "ICT-201", section: "Junior Secondary", elective: false },
  { id: "SUB-017", subjectName: "Home Economics", code: "HEC-201", section: "Junior Secondary", elective: true },
  { id: "SUB-018", subjectName: "Christian Studies", code: "CRS-101", section: "Primary", elective: true },
  { id: "SUB-019", subjectName: "Fine Arts", code: "FAR-101", section: "Nursery", elective: false },
  { id: "SUB-020", subjectName: "Music", code: "MUS-101", section: "Nursery", elective: true },
];

// ─── Subject Teachers ─────────────────────────────────────────────────────────
export const mockSubjectTeachers: SubjectTeacherAssignment[] = [
  { id: "STA-001", class: "JSS 1", subjectName: "Mathematics", teacher: "Mr. Adeyemi Babatunde", elective: "Admin Seun" },
  { id: "STA-002", class: "JSS 1", subjectName: "English Language", teacher: "Mrs. Okonkwo Chdinma", elective: "Admin Seun" },
  { id: "STA-003", class: "Primary 3", subjectName: "Basic Science", teacher: "Mr. Lawal Rotimi", elective: "Admin Ugo" },
  { id: "STA-004", class: "SS 2", subjectName: "Physics", teacher: "Mr. Nwosu Emeka", elective: "Admin Musa" },
  { id: "STA-005", class: "SS 2", subjectName: "Chemistry", teacher: "Mrs. Ibrahim Aminat", elective: "Admin Ugo" },
  { id: "STA-006", class: "SS 3", subjectName: "Further Mathematics", teacher: "Mr. Adeyemi Babatunde", elective: "Admin Ugo" },
  { id: "STA-007", class: "JSS 2", subjectName: "Biology", teacher: "Mrs. Akinwale oluwani", elective: "Admin Seun" },
  { id: "STA-008", class: "SS 1", subjectName: "Economics", teacher: "Mrs. Bello Rukayat", elective: "Admin Ugo" },
  { id: "STA-009", class: "Primary 5", subjectName: "Mathematics", teacher: "Mr. Lawal Rotimi", elective: "Admin Seun" },
  { id: "STA-010", class: "JSS 3", subjectName: "Geography", teacher: "Mrs. Okonkwo Chdinma", elective: "Admin Musa" },
  { id: "STA-011", class: "Primary 1", subjectName: "Phonics", teacher: "Mrs. Aliyu Fatima", elective: "Admin Ugo" },
  { id: "STA-012", class: "SS 1", subjectName: "English Literature", teacher: "Mr. Adeyemi Babatunde", elective: "Admin Seun" },
  { id: "STA-013", class: "JSS 1", subjectName: "Computer Science", teacher: "Mr. Nwosu Emeka", elective: "Admin Ugo" },
  { id: "STA-014", class: "Primary 4", subjectName: "Social Studies", teacher: "Mrs. Bello Rukayat", elective: "Admin Seun" },
  { id: "STA-015", class: "SS 2", subjectName: "Biology", teacher: "Mrs. Ibrahim Aminat", elective: "Admin Ugo" },
  { id: "STA-016", class: "JSS 2", subjectName: "Basic Science", teacher: "Mr. Lawal Rotimi", elective: "Admin Musa" },
  { id: "STA-017", class: "Primary 2", subjectName: "Mathematics", teacher: "Mrs. Akinwale oluwani", elective: "Admin Seun" },
  { id: "STA-018", class: "SS 3", subjectName: "Economics", teacher: "Mrs. Okonkwo Chdinma", elective: "Admin Ugo" },
  { id: "STA-019", class: "JSS 3", subjectName: "Chemistry", teacher: "Mr. Nwosu Emeka", elective: "Admin Seun" },
  { id: "STA-020", class: "Primary 6", subjectName: "English Language", teacher: "Mrs. Aliyu Fatima", elective: "Admin Ugo" },
];

// ─── Teacher & Class options for form selects ─────────────────────────────────
export const mockTeachers = [
  { value: "t1", label: "Mr. Adeyemi Babatunde" },
  { value: "t2", label: "Mrs. Okonkwo Chdinma" },
  { value: "t3", label: "Mr. Lawal Rotimi" },
  { value: "t4", label: "Mr. Nwosu Emeka" },
  { value: "t5", label: "Mrs. Ibrahim Aminat" },
  { value: "t6", label: "Mrs. Akinwale oluwani" },
  { value: "t7", label: "Mrs. Bello Rukayat" },
  { value: "t8", label: "Mrs. Aliyu Fatima" },
];

export const mockClasses = [
  { value: "c1", label: "Nursery 1" },
  { value: "c2", label: "Nursery 2" },
  { value: "c3", label: "Primary 1" },
  { value: "c4", label: "Primary 2" },
  { value: "c5", label: "Primary 3" },
  { value: "c6", label: "Primary 4" },
  { value: "c7", label: "Primary 5" },
  { value: "c8", label: "Primary 6" },
  { value: "c9", label: "JSS 1" },
  { value: "c10", label: "JSS 2" },
  { value: "c11", label: "JSS 3" },
  { value: "c12", label: "SS 1" },
  { value: "c13", label: "SS 2" },
  { value: "c14", label: "SS 3" },
];

// ─── Assessment Types ─────────────────────────────────────────────────────────
export const mockAssessmentTypes: AssessmentType[] = [
  { id: "AT-001", name: "Classwork", section: "Primary", code: "CW", baseMark: 10, terminalPercent: 10, weekly: true },
  { id: "AT-002", name: "Test", section: "Primary", code: "TST", baseMark: 20, terminalPercent: 20, weekly: false },
  { id: "AT-003", name: "Project", section: "Junior Secondary", code: "PRJ", baseMark: 20, terminalPercent: 15, weekly: false },
  { id: "AT-004", name: "Exam", section: "Junior Secondary", code: "EXM", baseMark: 100, terminalPercent: 60, weekly: false },
  { id: "AT-005", name: "Assignment", section: "Senior Secondary", code: "ASG", baseMark: 10, terminalPercent: 10, weekly: true },
  { id: "AT-006", name: "Quiz", section: "Senior Secondary", code: "QZ", baseMark: 10, terminalPercent: 10, weekly: true },
  { id: "AT-007", name: "Exam", section: "Senior Secondary", code: "EXM", baseMark: 100, terminalPercent: 70, weekly: false },
  { id: "AT-008", name: "Classwork", section: "Nursery", code: "CW", baseMark: 10, terminalPercent: 30, weekly: true },
  { id: "AT-009", name: "Oral Assessment", section: "Nursery", code: "ORL", baseMark: 20, terminalPercent: 40, weekly: false },
  { id: "AT-010", name: "Homework", section: "Primary", code: "HW", baseMark: 5, terminalPercent: 5, weekly: true },
  { id: "AT-011", name: "Practical", section: "Junior Secondary", code: "PRC", baseMark: 30, terminalPercent: 10, weekly: false },
  { id: "AT-012", name: "Debate", section: "Senior Secondary", code: "DBT", baseMark: 15, terminalPercent: 5, weekly: false },
  { id: "AT-013", name: "Portfolio", section: "Primary", code: "PRT", baseMark: 10, terminalPercent: 15, weekly: false },
  { id: "AT-014", name: "Group Work", section: "Junior Secondary", code: "GRP", baseMark: 20, terminalPercent: 10, weekly: false },
  { id: "AT-015", name: "Test", section: "Nursery", code: "TST", baseMark: 20, terminalPercent: 30, weekly: false },
  { id: "AT-016", name: "Exam", section: "Primary", code: "EXM", baseMark: 100, terminalPercent: 50, weekly: false },
  { id: "AT-017", name: "Assignment", section: "Junior Secondary", code: "ASG", baseMark: 10, terminalPercent: 5, weekly: true },
  { id: "AT-018", name: "Quiz", section: "Primary", code: "QZ", baseMark: 10, terminalPercent: 10, weekly: true },
  { id: "AT-019", name: "Project", section: "Senior Secondary", code: "PRJ", baseMark: 20, terminalPercent: 10, weekly: false },
  { id: "AT-020", name: "Practical", section: "Senior Secondary", code: "PRC", baseMark: 30, terminalPercent: 5, weekly: false },
];

// ─── Grades ───────────────────────────────────────────────────────────────────
export const mockGrades: Grade[] = [
  { id: "GRD-001", caption: "A1", minScore: 75, maxScore: 100, remark: "Excellent", section: "Senior Secondary" },
  { id: "GRD-002", caption: "B2", minScore: 70, maxScore: 74, remark: "Very Good", section: "Senior Secondary" },
  { id: "GRD-003", caption: "B3", minScore: 65, maxScore: 69, remark: "Good", section: "Senior Secondary" },
  { id: "GRD-004", caption: "C4", minScore: 60, maxScore: 64, remark: "Good", section: "Senior Secondary" },
  { id: "GRD-005", caption: "C5", minScore: 55, maxScore: 59, remark: "Average", section: "Senior Secondary" },
  { id: "GRD-006", caption: "C6", minScore: 50, maxScore: 54, remark: "Average", section: "Senior Secondary" },
  { id: "GRD-007", caption: "D7", minScore: 45, maxScore: 49, remark: "Pass", section: "Senior Secondary" },
  { id: "GRD-008", caption: "F9", minScore: 0, maxScore: 44, remark: "Fail", section: "Senior Secondary" },
  { id: "GRD-009", caption: "A", minScore: 80, maxScore: 100, remark: "Excellent", section: "Junior Secondary" },
  { id: "GRD-010", caption: "B", minScore: 65, maxScore: 79, remark: "Very Good", section: "Junior Secondary" },
  { id: "GRD-011", caption: "C", minScore: 50, maxScore: 64, remark: "Good", section: "Junior Secondary" },
  { id: "GRD-012", caption: "D", minScore: 40, maxScore: 49, remark: "Pass", section: "Junior Secondary" },
  { id: "GRD-013", caption: "F", minScore: 0, maxScore: 39, remark: "Fail", section: "Junior Secondary" },
  { id: "GRD-014", caption: "A", minScore: 75, maxScore: 100, remark: "Excellent", section: "Primary" },
  { id: "GRD-015", caption: "B", minScore: 60, maxScore: 74, remark: "Good", section: "Primary" },
  { id: "GRD-016", caption: "C", minScore: 50, maxScore: 59, remark: "Average", section: "Primary" },
  { id: "GRD-017", caption: "D", minScore: 40, maxScore: 49, remark: "Pass", section: "Primary" },
  { id: "GRD-018", caption: "F", minScore: 0, maxScore: 39, remark: "Fail", section: "Primary" },
  { id: "GRD-019", caption: "A", minScore: 70, maxScore: 100, remark: "Excellent", section: "Nursery" },
  { id: "GRD-020", caption: "B", minScore: 50, maxScore: 69, remark: "Good", section: "Nursery" },
];

// ─── Psychomotive Metrics ─────────────────────────────────────────────────────
export const mockPsychomotiveMetrics: PsychomotiveMetric[] = [
  { id: "PSY-001", title: "Hand-Eye Coordination", section: "Nursery" },
  { id: "PSY-002", title: "Fine Motor Skills", section: "Nursery" },
  { id: "PSY-003", title: "Gross Motor Skills", section: "Nursery" },
  { id: "PSY-004", title: "Pencil Grip & Control", section: "Primary" },
  { id: "PSY-005", title: "Drawing & Colouring Neatness", section: "Primary" },
  { id: "PSY-006", title: "Physical Coordination", section: "Primary" },
  { id: "PSY-007", title: "Participation in Sports", section: "Primary" },
  { id: "PSY-008", title: "Practical Skills Application", section: "Junior Secondary" },
  { id: "PSY-009", title: "Creative Expression", section: "Nursery" },
  { id: "PSY-010", title: "Listening & Response", section: "Nursery" },
  { id: "PSY-011", title: "Spatial Awareness", section: "Primary" },
  { id: "PSY-012", title: "Tool Usage", section: "Junior Secondary" },
  { id: "PSY-013", title: "Laboratory Safety", section: "Junior Secondary" },
  { id: "PSY-014", title: "Technical Drawing", section: "Junior Secondary" },
  { id: "PSY-015", title: "Research & Presentation", section: "Senior Secondary" },
  { id: "PSY-016", title: "Leadership & Initiative", section: "Senior Secondary" },
  { id: "PSY-017", title: "Team Collaboration", section: "Senior Secondary" },
  { id: "PSY-018", title: "Problem Solving", section: "Senior Secondary" },
  { id: "PSY-019", title: "Balance & Posture", section: "Nursery" },
  { id: "PSY-020", title: "Rhythm & Movement", section: "Nursery" },
];

export const PSYCHOMOTIVE_SKILLS = [
  "Neatness", "Punctuality", "Attentiveness", "Cooperation", "Creativity",
  "Sports", "Handling of Tools", "Drawing & Painting", "Music",
] as const;

export const mockStudentResult: StudentResultData = {
  studentId: "3",
  admissionNumber: "SCH/2024/001",
  fullName: "Adaeze Okonkwo",
  className: "JSS 3A",
  section: "Junior Secondary",
  term: "First Term",
  session: "2025/2026",
  positionInClass: "12th",
  classSize: 54,
  averageScore: 74,
  overallGrade: "B",
  attendancePercentage: 84,
  subjects: [
    { id: "1", subject: "Mathematics",       assignment: 5, assignmentMax: 10, test: 17, testMax: 20, exam: 42, examMax: 70, total: 64, totalMax: 100, grade: "C", subjectPosition: "7th" },
    { id: "2", subject: "English Language",  assignment: 5, assignmentMax: 10, test: 15, testMax: 20, exam: 53, examMax: 70, total: 73, totalMax: 100, grade: "B", subjectPosition: "2nd" },
    { id: "3", subject: "Basic Science",     assignment: 5, assignmentMax: 10, test: 13, testMax: 20, exam: 64, examMax: 70, total: 82, totalMax: 100, grade: "A", subjectPosition: "2nd" },
    { id: "4", subject: "Social Studies",    assignment: 5, assignmentMax: 10, test: 20, testMax: 20, exam: 44, examMax: 70, total: 69, totalMax: 100, grade: "B", subjectPosition: "4th" },
    { id: "5", subject: "French",            assignment: 5, assignmentMax: 10, test: 18, testMax: 20, exam: 55, examMax: 70, total: 78, totalMax: 100, grade: "B", subjectPosition: "3rd" },
    { id: "6", subject: "CRS",               assignment: 5, assignmentMax: 10, test: 16, testMax: 20, exam: 66, examMax: 70, total: 87, totalMax: 100, grade: "A", subjectPosition: "1st" },
    { id: "7", subject: "Agricultural Science", assignment: 5, assignmentMax: 10, test: 14, testMax: 20, exam: 46, examMax: 70, total: 65, totalMax: 100, grade: "B", subjectPosition: "2nd" },
  ],
  psychomotive: PSYCHOMOTIVE_SKILLS.map((skill) => ({ skill, score: 3, remark: "Good" })),
  attendance: { timesSchoolOpened: 60, timesPresent: 55, timesEarly: 10, timesLate: 3, timesAbsent: 5 },
  comments: { classTeacherComment: "", principalComment: "" },
};