export function getClassBadgeColor(name: string): string {
  if (name.startsWith("Nursery"))  return "bg-amber-50  text-amber-700  border-amber-200";
  if (name.startsWith("Primary"))  return "bg-orange-50 text-orange-700 border-orange-200";
  if (name.startsWith("JSS"))      return "bg-blue-50   text-blue-700   border-blue-200";
  if (name.startsWith("SS"))       return "bg-green-50  text-green-700  border-green-200";
  return "bg-gray-100 text-gray-600 border-gray-200";
}

export function getSectionBadgeColor(name: string): string {
  const map: Record<string, string> = {
    "Sciences":        "bg-blue-50   text-blue-700   border-blue-200",
    "Arts":            "bg-pink-50   text-pink-700   border-pink-200",
    "Commercial":      "bg-amber-50  text-amber-700  border-amber-200",
    "Social Sciences": "bg-green-50  text-green-700  border-green-200",
    "Technical":       "bg-orange-50 text-orange-700 border-orange-200",
    "Vocational":      "bg-teal-50   text-teal-700   border-teal-200",
    "Languages":       "bg-purple-50 text-purple-700 border-purple-200",
    "Mathematics":     "bg-indigo-50 text-indigo-700 border-indigo-200",
    "Humanities":      "bg-rose-50   text-rose-700   border-rose-200",
    "Engineering":     "bg-cyan-50   text-cyan-700   border-cyan-200",
  };
  return map[name] ?? "bg-gray-100 text-gray-600 border-gray-200";
}