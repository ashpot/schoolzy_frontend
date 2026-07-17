// ─── Questions ─────────────────────────────────────────────────────────────
export type QuestionType = "objective" | "subjective" | "theory";

export interface Question {
  id: string;
  subject: string;
  class: string;
  questionText: string;
  type: QuestionType;
  marks: number;
  correctAnswer: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: string;
  theoryAnswer?: string;
}

// ─── Tests ─────────────────────────────────────────────────────────────────
export type TestType        = "Exam" | "Test" | "Quiz";
export type ScheduledStatus = "upcoming" | "past";

export interface Test {
  id: string;
  title: string;
  class: string;
  subject: string;
  type: TestType;
  timeAllowed: number;
  passcode: string;
  dateCreated: string;
}

export interface ScheduledTest {
  id: string;
  testTitle: string;
  subject: string;
  type: TestType;
  timeAllowed: number;
  class: string;
  dateScheduled: string;
  dateCreated: string;
  status: ScheduledStatus;
}

// ─── Results ───────────────────────────────────────────────────────────────
export interface QuestionResult {
  id: string;
  number: number;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface TestResult {
  id: string;
  dateAdded: string;
  student: {
    name: string;
    class: string;
  };
  test: string;
  subject: string;
  testType: string;
  right: number;
  wrong: number;
  totalQuestions: number;
  score: number;
  grade: string;
  questions: QuestionResult[];
}