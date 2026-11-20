const mins = (iso: string) => Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));

export const shortAgo = (iso: string) => {
  const m = mins(iso);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.round(m / 60);
  return h < 24 ? `${h}h` : `${Math.round(h / 24)}d`;
};

export const formatStamp = (iso: string) => {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return `${day}, ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
};

export const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const formatClock = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

export const formatDuration = (ms: number) => {
  const total = Math.round(ms / 60_000);
  const h = Math.floor(total / 60);
  return h > 0 ? `${h}h ${total % 60}m` : `${total}m`;
};

export const isToday = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();