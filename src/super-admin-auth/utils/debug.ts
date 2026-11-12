const isDev = import.meta.env.DEV;

const SENSITIVE = ["password", "confirm_password", "token", "reset_token"];

// Masks secrets so console output is safe to screenshot or paste.
export function redact(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [
        k,
        SENSITIVE.includes(k.toLowerCase()) && typeof v === "string"
          ? `${v.slice(0, 4)}…[redacted]`
          : redact(v),
      ])
    );
  }
  return value;
}

export function debugLog(label: string, payload?: unknown) {
  if (!isDev) return;
  console.groupCollapsed(`🐞 ${label}`);
  if (payload !== undefined) console.log(redact(payload));
  console.groupEnd();
}