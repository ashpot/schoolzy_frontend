import type { NavItem } from "@/shared/types/navigation";
import { DashboardIcon, ResultsIcon, FinancesIcon } from "@/shared/lib/SvgLib";

const STUDENT_ROOT_ROUTE = "student-dashboard";

export const studentNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", path: `/${STUDENT_ROOT_ROUTE}`, icon: DashboardIcon },
  { id: "my-class", label: "My Class", path: `/${STUDENT_ROOT_ROUTE}/my-class`, icon: DashboardIcon },
  { id: "my-results", label: "My Results", path: `/${STUDENT_ROOT_ROUTE}/my-results`, icon: ResultsIcon },
  { id: "my-fees", label: "My Fees", path: `/${STUDENT_ROOT_ROUTE}/my-fees`, icon: FinancesIcon },
];