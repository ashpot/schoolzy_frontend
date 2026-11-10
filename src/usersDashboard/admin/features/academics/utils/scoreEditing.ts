export function scoreError(value: string, max: number | null): string {
  const v = value.trim();
  if (v === "") return "Enter a score";
  const n = Number(v);
  if (!Number.isInteger(n)) return "Whole numbers only";
  if (n < 0) return "Can't be negative";
  if (max !== null && n > max) return `Max is ${max}`;
  return "";
}