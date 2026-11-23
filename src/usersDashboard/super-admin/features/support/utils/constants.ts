import type { Category, Priority, TicketStatus } from "../types";

export const PAGE_SIZE = 7;

export const PRIORITIES: Priority[] = ["Critical", "High", "Medium", "Low"];
export const STATUSES: TicketStatus[] = ["Open", "In Progress", "Waiting", "Resolved", "Closed"];
export const CATEGORIES: Category[] = ["Technical", "Billing", "Account", "Onboarding"];

// TODO: load the agent list from the API
export const AGENTS = ["Amara Osei", "Blessing Osei", "Tunde Bello", "Ngozi Eze"];

export const OPEN_STATUSES = new Set<TicketStatus>(["Open", "In Progress", "Waiting"]);

export const toOptions = (list: string[]) => list.map((v) => ({ value: v, label: v }));