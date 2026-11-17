const isDev = import.meta.env.DEV;

const PASSWORD_KEY = /password/i;
const TOKEN_KEY = /token|secret/i;

// Masks secrets so console output is safe to screenshot or paste.
export function redact(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => {
        if (typeof v === "string") {
          if (PASSWORD_KEY.test(k)) return [k, "[redacted]"];
          if (TOKEN_KEY.test(k)) return [k, `${v.slice(0, 4)}…[redacted]`];
        }
        return [k, redact(v)];
      })
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