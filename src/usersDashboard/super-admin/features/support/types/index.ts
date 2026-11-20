export type Priority = "Critical" | "High" | "Medium" | "Low";
export type TicketStatus = "Open" | "In Progress" | "Waiting" | "Resolved" | "Closed";
export type Category = "Technical" | "Billing" | "Account" | "Onboarding";

export interface TicketMessage {
  id: string;
  author: "school" | "agent" | "note";
  name: string;
  text: string;
  at: string; // ISO datetime
}

export interface Ticket {
  id: string;
  code: string; // e.g. TKT-2845
  subject: string;
  school: string;
  location: string;
  submittedBy: string;
  category: Category;
  priority: Priority;
  status: TicketStatus;
  agent: string | null;
  platform: string;
  browser: string;
  os: string;
  createdAt: string;
  firstResponseAt: string | null;
  resolvedAt: string | null;
  messages: TicketMessage[];
}

export type TicketMenuKey = "view" | "assign" | "reply" | "close" | "delete";
export type TicketAction = "close" | "resolve" | "delete";

export interface ChatMessage {
  id: string;
  from: "school" | "admin";
  text: string;
  at: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  schoolId: string;
  school: string;
  location: string;
  contact: string;
  plan: string;
  online: boolean;
  unread: number;
  openTickets: number;
  recent: string[];
  messages: ChatMessage[];
}