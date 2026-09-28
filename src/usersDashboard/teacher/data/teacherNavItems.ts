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
      { id: "class-list", label: "Class List", path: `/${TEACHER_ROOT_ROUTE}/my-classes/class-list`,},
      { id: "attendance-summary", label: "Attendance Summary", path: `/${TEACHER_ROOT_ROUTE}/my-classes/attendance-summary`,},
    ],
  },
  {
    id: "learning",
    label: "Learning",
    path: `/${TEACHER_ROOT_ROUTE}/teacher-learning`,
    icon: LearningIcon,
    children: [
      { id: "lesson-notes", label: "Lesson Notes", path: `/${TEACHER_ROOT_ROUTE}/teacher-learning/lesson-notes`,},
      { id: "attendance", label: "Attendance", path: `/${TEACHER_ROOT_ROUTE}/teacher-learning/attendance`,},
    ],
  },
  {
    id: "results",
    label: "Results",
    path: `/${TEACHER_ROOT_ROUTE}/teacher-results`,
    icon: ResultsIcon,
    children: [
      { id: "enter-scores", label: "Enter Scores", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/enter-scores`, },
      { id: "upload-results", label: "Upload Results", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/upload-results`, },
      { id: "upload-omitted", label: "Upload Omitted", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/upload-omitted`, },
      { id: "view-results", label: "View Results", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/view-results`, },
      { id: "import-scores", label: "Import Scores", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/import-scores`, },
      { id: "view-subject-results", label: "View Subject Results", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/view-subject-results`, },
      { id: "view-uploaded-scores", label: "View Uploaded Scores", path: `/${TEACHER_ROOT_ROUTE}/teacher-results/view-uploaded-scores`, },
    ],
  },
];