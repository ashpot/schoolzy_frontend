import type { Session } from "../types";

export interface SessionPatch {
  name?: string;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
}

// Returns ONLY the fields the user actually changed, using backend key names.
// An empty object means nothing changed, so no request should be sent.
export function buildSessionPatch(original: Session, updated: Session): SessionPatch {
  const patch: SessionPatch = {};

  const name = String(updated.name ?? "").trim();
  if (name !== original.name) patch.name = name;
  if (updated.startDate !== original.startDate) patch.start_date = updated.startDate;
  if (updated.endDate !== original.endDate) patch.end_date = updated.endDate;
  if (updated.isActive !== original.isActive) patch.is_active = updated.isActive;

  return patch;
}