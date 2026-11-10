import type { StudentSearchItem } from "../types/studentResult";

// Every typed word must appear somewhere in the student's search string,
// so "mark og" and "ogbonna mark" both find "ogbonna mark Mikano".
export function searchStudents(index: StudentSearchItem[], query: string, limit = 8): StudentSearchItem[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  const hits: { item: StudentSearchItem; rank: number }[] = [];
  for (const item of index) {
    if (!tokens.every((t) => item.haystack.includes(t))) continue;
    hits.push({ item, rank: item.haystack.startsWith(tokens[0]) ? 0 : 1 });
  }

  return hits
    .sort((a, b) => a.rank - b.rank || a.item.fullName.localeCompare(b.item.fullName))
    .slice(0, limit)
    .map((h) => h.item);
}