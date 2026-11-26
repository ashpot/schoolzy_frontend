import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { Notice } from "../../types";

export default function NoticeBanner({ notice, onDismiss }: { notice: Notice | null; onDismiss: () => void }) {
  if (!notice) return null;
  return (
    <div
      role={notice.tone === "red" ? "alert" : "status"}
      className={cn("flex items-center justify-between gap-4 rounded-2xl px-5 py-3 text-sm", notice.tone === "red" ? "bg-sa-red-soft text-sa-red-text" : "bg-sa-green-soft text-sa-green-text")}
    >
      <span>{notice.text}</span>
      <button type="button" aria-label="Dismiss" onClick={onDismiss} className="shrink-0 opacity-70 hover:opacity-100"><X size={16} /></button>
    </div>
  );
}