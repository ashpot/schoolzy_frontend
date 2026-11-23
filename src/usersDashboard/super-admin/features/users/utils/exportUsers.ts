import type { PlatformUser, UserKind } from "../types";
import { formatDateTime } from "./userFormat";

// Cells starting with = + - @ can run as formulas in Excel/Sheets (CSV injection): neutralise them.
const cell = (value: string | number) => {
  let s = String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export function exportUsersCsv(kind: UserKind, users: PlatformUser[]) {
  const header = ["Name", "Email", "Phone", "School", "Location", "Status", "Last Login"];
  const rows = users.map((u) => [
    u.name,
    u.email,
    u.phone ?? "",
    u.school,
    u.location ?? "",
    u.status,
    formatDateTime(u.lastLogin),
  ]);
  const csv = [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");

  // BOM so Excel reads UTF-8 correctly
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${kind}s-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}