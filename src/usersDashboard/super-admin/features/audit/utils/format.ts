const p = (n: number) => String(n).padStart(2, "0");

export const stamp = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

export const clock = (iso: string) => {
  const d = new Date(iso);
  return `${p(d.getHours())}:${p(d.getMinutes())}`;
};

export const isToday = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();

export const dayMonth = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export function downloadJson(name: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}