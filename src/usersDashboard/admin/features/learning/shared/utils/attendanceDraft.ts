import { getTenant } from "@/shared/utils/tenant";
import type { AttendanceDraft } from "../../types";
import { localDateString } from "./attendanceMapper";

// Scoped by tenant + user so drafts never leak between accounts on a shared browser
function storageKey(): string {
  let userId = "anon";
  try {
    const u = JSON.parse(localStorage.getItem("schoolzy_user") ?? "null");
    userId = String(u?.id ?? u?.user?.id ?? "anon");
  } catch { /* ignore malformed value */ }
  return `schoolzy:attendance-draft:v1:${getTenant() ?? "default"}:${userId}`;
}

export function clearDraft(): void {
  try { localStorage.removeItem(storageKey()); } catch { /* storage unavailable */ }
}

export function writeDraft(draft: AttendanceDraft): void {
  try { localStorage.setItem(storageKey(), JSON.stringify(draft)); } catch { /* quota / private mode */ }
}

export function readDraft(): AttendanceDraft | null {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return null;
    const d = JSON.parse(raw) as AttendanceDraft;
    const valid = typeof d?.classGroupId === "string" && !!d.marks && typeof d.marks === "object";
    // The date is part of the payload, so a draft from an earlier day is dropped
    if (!valid || d.date !== localDateString()) {
      clearDraft();
      return null;
    }
    return d;
  } catch {
    return null;
  }
}