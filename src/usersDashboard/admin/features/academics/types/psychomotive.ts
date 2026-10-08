export interface PsychomotivePayload {
  title: string;
  section: number;
}

export interface PsychomotiveResponse {
  id: number;
  title: string;
  section: number;
}

// Row shown in the session table
export interface PsychomotiveItem {
  id: string;
  title: string;
  section: string;   // section title, for SectionBadge
  sectionId: number; // for filtering
}