export const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

export const dayMonthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const userCount = (n: number) => `${n} ${n === 1 ? "user" : "users"}`;