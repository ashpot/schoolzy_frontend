import type { Session, Term } from "../types";

export const mockSessions: Session[] = [
  { id: "1", name: "2022/2023", startDate: "2022-09-05", endDate: "2023-07-21", isActive: false },
  { id: "2", name: "2023/2024", startDate: "2023-09-04", endDate: "2024-07-19", isActive: false },
  { id: "3", name: "2024/2025", startDate: "2024-09-02", endDate: "2025-07-18", isActive: false },
  { id: "4", name: "2025/2026", startDate: "2025-09-01", endDate: "2026-07-17", isActive: true  },
];

export const mockTerms: Term[] = [
  { id: "1", name: "First Term",  sessionId: "2", sessionName: "2023/2024", tag: "1st", startDate: "2023-09-04", endDate: "2023-12-15", isActive: false, resultPublished: false },
  { id: "2", name: "Second Term", sessionId: "2", sessionName: "2023/2024", tag: "2nd", startDate: "2024-01-08", endDate: "2024-04-05", isActive: false, resultPublished: false },
  { id: "3", name: "Third Term",  sessionId: "2", sessionName: "2023/2024", tag: "3rd", startDate: "2024-04-22", endDate: "2024-07-19", isActive: false, resultPublished: false },
  { id: "4", name: "First Term",  sessionId: "3", sessionName: "2024/2025", tag: "1st", startDate: "2024-09-02", endDate: "2024-12-13", isActive: false, resultPublished: false },
  { id: "5", name: "Second Term", sessionId: "3", sessionName: "2024/2025", tag: "2nd", startDate: "2025-01-06", endDate: "2025-04-04", isActive: false, resultPublished: true  },
  { id: "6", name: "First Term",  sessionId: "4", sessionName: "2025/2026", tag: "1st", startDate: "2025-09-01", endDate: "2025-12-12", isActive: true,  resultPublished: true  },
];

export const sessionSelectOptions = mockSessions.map((s) => ({
  value: s.id,
  label: s.name,
}));