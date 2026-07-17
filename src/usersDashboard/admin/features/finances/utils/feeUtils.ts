export function formatNaira(amount: number): string {
  return "₦ " + amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function isOverdue(dateStr: string): boolean {
  return new Date(dateStr) < new Date(new Date().toDateString());
}

export function formatDisplayDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function termColor(term: string): string {
  switch (term) {
    case "First Term":  return "bg-blue-50 text-blue-700 border border-blue-100";
    case "Second Term": return "bg-purple-50 text-purple-700 border border-purple-100";
    case "Third Term":  return "bg-green-50 text-green-700 border border-green-100";
    default:            return "bg-gray-50 text-gray-600 border border-gray-100";
  }
}

const FEE_TYPE_COLORS = [
  "border border-purple-200 bg-purple-50 text-purple-700",
  "border border-blue-200   bg-blue-50   text-blue-700",
  "border border-green-200  bg-green-50  text-green-700",
  "border border-amber-200  bg-amber-50  text-amber-700",
  "border border-red-200    bg-red-50    text-red-700",
  "border border-indigo-200 bg-indigo-50 text-indigo-700",
  "border border-teal-200   bg-teal-50   text-teal-700",
  "border border-gray-200   bg-gray-50   text-gray-600",
];

export function feeTypeColor(index: number): string {
  return FEE_TYPE_COLORS[index % FEE_TYPE_COLORS.length];
}