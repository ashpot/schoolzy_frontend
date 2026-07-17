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