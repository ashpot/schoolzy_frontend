import type { NavItem } from "@/shared/types/navigation";
import { DashboardIcon, ResultsIcon, FinancesIcon } from "@/shared/lib/SvgLib";

const PARENT_ROOT_ROUTE = "parent-dashboard";

export const parentNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", path: `/${PARENT_ROOT_ROUTE}`, icon: DashboardIcon },
  { id: "results", label: "Results", path: `/${PARENT_ROOT_ROUTE}/results`, icon: ResultsIcon },
  {
    id: "fees",
    label: "Fees",
    path: `/${PARENT_ROOT_ROUTE}/fees`,
    icon: FinancesIcon,
    children: [
      { id: "pay-fees", label: "Pay Fees", path: `/${PARENT_ROOT_ROUTE}/fees/pay-fees`, icon: FinancesIcon },
      { id: "payment-history", label: "Payment History", path: `/${PARENT_ROOT_ROUTE}/fees/payment-history`, icon: FinancesIcon },
    ],
  },
];