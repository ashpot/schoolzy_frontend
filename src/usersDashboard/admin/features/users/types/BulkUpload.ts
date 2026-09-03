export type ReviewStatus = "ready" | "warning" | "error";

export interface ReviewRow {
  id: string;
  identifier: string;      // ADM. NO or EMP. NO
  name: string;
  extraFields: Record<string, string>; // CLASS for students, EMAIL + DATE OF EMPLOYMENT for teachers
  issue?: string;
  status: ReviewStatus;
}

export interface ReviewColumn {
  key: string;
  header: string;
}

export interface BulkUploadConfig {
  entityLabel: string;
  entityLabelPlural: string;
  description: string;
  identifierLabel: string;
  requiredFields: string[];
  optionalFields: string[];
  reviewColumns: ReviewColumn[];
  templateFileName: string;
  mockReviewData: ReviewRow[];
  mockImportedCount: number;
  mockSkippedCount: number;
}

export type BulkUploadStep = 1 | 2 | 3 | 4;
export type ReviewFilter = "all" | "ready" | "warnings" | "errors";