export const opts = (list: string[]) => list.map((v) => ({ value: v, label: v }));

export const TIMEZONES = opts(["Africa/Lagos", "Africa/Accra", "Africa/Nairobi", "Africa/Johannesburg", "UTC"]);
export const PLATFORM_LANGUAGES = opts(["English (Nigeria)", "English (UK)", "French"]);

export const CURRENCIES = [
  { value: "NGN", label: "NGN (₦)" },
  { value: "USD", label: "USD ($)" },
  { value: "GHS", label: "GHS (₵)" },
  { value: "KES", label: "KES (KSh)" },
];
export const DATE_FORMATS = opts(["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]);
export const TIME_FORMATS = opts(["12-hour", "24-hour"]);
export const COUNTRIES = opts(["Nigeria", "Ghana", "Kenya", "South Africa"]);
export const LANGUAGES = opts(["English", "French"]);
export const MEASUREMENTS = opts(["Metric", "Imperial"]);

export const ENCRYPTIONS = opts(["TLS", "SSL"]);
export const SMS_PROVIDERS = opts(["Termii", "Twilio", "Africa's Talking"]);
export const CHANNELS = opts(["Email", "SMS", "Both"]);
export const TEMPLATE_STATUSES = opts(["Active", "Draft"]);
export const GATEWAY_MODES = [
  { value: "production", label: "Production" },
  { value: "sandbox", label: "Sandbox" },
];

export const PLACEHOLDERS = ["{{school_name}}", "{{admin_name}}", "{{amount}}", "{{date}}"];
export const SAMPLE_VARS: Record<string, string> = {
  "{{school_name}}": "Greenfield Academy",
  "{{admin_name}}": "Adebayo Okafor",
  "{{amount}}": "₦150,000",
  "{{date}}": "1 Aug 2026",
};