import type { NavItem } from "@/shared/types/navigation";
import {
  DashboardIcon,
  LearningIcon,
  ResultsIcon,
} from "@/shared/lib/SvgLib";

const TEACHER_ROOT_ROUTE = "teacher-dashboard";

export const teacherNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: `/${TEACHER_ROOT_ROUTE}`,
    icon: DashboardIcon,
  },
  {
    id: "my-classes",
    label: "My Classes",
    path: `/${TEACHER_ROOT_ROUTE}/my-classes`,
    icon: DashboardIcon,
    children: [
      { id: "class-list", label: "Class List", path: `/${TEACHER_ROOT_ROUTE}/my-classes/class-list`, icon: ClassesIcon },
      { id: "attendance-summary", label: "Attendance Summary", path: `/${TEACHER_ROOT_ROUTE}/my-classes/attendance-summary`, icon: ClassesIcon },
    ],
  },
  {
    id: "learning",
    label: "Learning",
    path: `/${TEACHER_ROOT_ROUTE}/teacher-learning`,
    icon: LearningIcon,
    children: [
      { id: "lesson-notes", label: "Lesson Notes", path: `/${TEACHER_ROOT_ROUTE}/teacher-learning/lesson-notes`, icon: LearningIcon },
      { id: "attendance", label: "Attendance", path: `/${TEACHER_ROOT_ROUTE}/teacher-learning/attendance`, icon: LearningIcon },
    ],
  },
  {
    id: "results",
    label: "Results",
    path: `/${TEACHER_ROOT_ROUTE}/teacher-results`,
    icon: ResultsIcon,
    children: [
      { id: "enter-scores", label: "Enter Scores", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/enter-scores`, icon: ResultsIcon },
      { id: "upload-results", label: "Upload Results", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/upload-results`, icon: ResultsIcon },
      { id: "upload-omitted", label: "Upload Omitted", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/upload-omitted`, icon: ResultsIcon },
      { id: "view-results", label: "View Results", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/view-results`, icon: ResultsIcon },
      { id: "import-scores", label: "Import Scores", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/import-scores`, icon: ResultsIcon },
      { id: "view-subject-results", label: "View Subject Results", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/view-subject-results`, icon: ResultsIcon },
      { id: "view-uploaded-scores", label: "View Uploaded Scores", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/view-uploaded-scores`, icon: ResultsIcon },
    ],
  },
];