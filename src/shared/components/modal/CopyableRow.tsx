import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";

interface CopyableRowProps {
  label: string;
  value: string;
}

export default function CopyableRow({ label, value }: CopyableRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-3 bg-bg-input rounded-lg px-3.5 py-2.5">
      <div className="min-w-0">
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm font-mono font-medium text-text-primary truncate">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 p-1.5 rounded-lg text-text-muted hover:text-brand-primary hover:bg-white transition-colors"
      >
        {copied ? <CheckCircle2 size={15} className="text-success" /> : <Copy size={15} />}
      </button>
    </div>
  );
}