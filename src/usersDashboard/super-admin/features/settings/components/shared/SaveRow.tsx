import type { ReactNode } from "react";
import SubmitButton from "@/shared/ui/SubmitButton";

interface SaveRowProps {
  label: string;
  isPending: boolean;
  error?: string | null;
  saved?: boolean;
  extra?: ReactNode;
}

export default function SaveRow({ label, isPending, error, saved, extra }: SaveRowProps) {
  return (
    <div className="mt-6 space-y-3">
      {error && <p role="alert" className="rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{error}</p>}
      <div className="flex flex-wrap items-center justify-end gap-3">
        {saved && <span role="status" className="mr-auto text-sm text-sa-green-text">Changes saved</span>}
        {extra}
        <div className="w-56"><SubmitButton label={label} isLoading={isPending} /></div>
      </div>
    </div>
  );
}