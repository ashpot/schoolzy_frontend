export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });