export interface Session {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Term {
  id: string;
  name: string;
  sessionId: string;
  sessionName: string;
  tag: "1st" | "2nd" | "3rd";
  startDate: string;
  endDate: string;
  isActive: boolean;
  resultPublished: boolean;
}

// NEW — real API shapes
export interface SessionPayload {
  name: string;
  start_date: string;
  end_date: string;
}
export interface SessionResponse {
  id: number;
  name: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
}
export interface SessionListItem {
  id: number;
  name: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
}

export interface TermPayload {
  name: string;
  is_active: boolean;
  result_published: boolean;
  tag: "1" | "2" | "3";
  start_date: string;
  end_date: string;
  session: number;
}
export interface TermResponse {
  id: number;
  name: string;
  is_active: boolean;
  result_published: boolean;
  tag: string;
  start_date: string;
  end_date: string;
  session: number;
}