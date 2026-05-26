import { useState } from "react";
import { Eye, EyeOff, Copy, RefreshCw, Lock } from "lucide-react";

export function generatePasscode(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({length}).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
}

interface Props {
  value:      string;
  onChange:   (val: string) => void;
  error?:     string;
  isLoading?: boolean;
}

export default function PasscodeField({ value, onChange, error, isLoading }: Props) {
  const [visible, setVisible] = useState(false);
  const [copied,  setCopied]  = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-label)] mb-1.5">
        Passcode{" "}
        <span className="text-[var(--color-text-muted)] font-normal">(optional)</span>
      </label>

      <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-[var(--color-bg-input)] transition-all ${
        error
          ? "border-[var(--color-danger)]"
          : "border-[var(--color-border-line02)] focus-within:ring-2 focus-within:ring-[var(--color-brand-primary)]/20 focus-within:border-[var(--color-brand-primary)]"
      }`}>
        <Lock className="w-3.5 h-3.5 text-[var(--color-text-muted)] flex-shrink-0" />
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] focus:outline-none min-w-0 disabled:opacity-60"
        />
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            title={visible ? "Hide" : "Show"}
            className="w-7 h-7 rounded-lg flex-center text-[var(--color-text-muted)] hover:text-[var(--color-text-nav)] hover:bg-gray-100 transition-colors"
          >
            {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy"}
            className={`w-7 h-7 rounded-lg flex-center transition-colors ${
              copied
                ? "text-green-600 bg-green-50"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-nav)] hover:bg-gray-100"
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onChange(generatePasscode())}
            disabled={isLoading}
            title="Regenerate"
            className="w-7 h-7 rounded-lg flex-center text-[var(--color-brand-primary)] hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="mt-1 text-xs text-[var(--color-text-muted)] flex items-center gap-1">
        Auto-generated — click <RefreshCw className="w-3 h-3 inline-block" /> to regenerate or type your own.
      </p>
      {error && (
        <p className="mt-1 text-xs text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  );
}