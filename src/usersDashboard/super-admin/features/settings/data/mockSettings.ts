import type { CommsData, GatewaysData, PlatformSettings } from "../types";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
const DAY = 1440;

// TODO: Delete once the real endpoints are wired.
const PLATFORM: PlatformSettings = {
  general: {
    name: "Schoolzy",
    url: "https://app.schoolzy.com",
    supportEmail: "hello@schoolzy.com",
    supportPhone: "+234 800 SCHOOLZY",
    timezone: "Africa/Lagos",
    language: "English (Nigeria)",
    address: "Victoria Island, Lagos, Nigeria",
  },
  branding: { primaryColor: "#1483D3", secondaryColor: "#0F172A", accentColor: "#FFFFFF", logoUrl: null, faviconUrl: null, loginBgUrl: null },
  security: {
    minPasswordLength: "8", passwordExpiryDays: "90", maxLoginAttempts: "5", sessionTimeoutMinutes: "30",
    requireUppercase: true, requireNumbers: true, requireSpecial: true,
    twoFactor: true, deviceVerification: false, multipleSessions: true,
  },
  localization: { currency: "NGN", dateFormat: "DD/MM/YYYY", timeFormat: "12-hour", country: "Nigeria", language: "English", measurement: "Metric" },
  system: {
    maintenance: { enabled: false, message: "We are performing scheduled maintenance. Back shortly." },
    status: { storageUsedGb: 42.3, storageTotalGb: 100, dbUsedGb: 8.1, dbTotalGb: 50, api: "Operational", server: "All systems normal" },
  },
};

const GATEWAYS: GatewaysData = {
  health: { value: "98.7%", text: "+0.2%" },
  txDelta: "+18% vs yesterday",
  gateways: [
    { id: "g1", code: "PS", name: "Paystack", status: "Connected", mode: "production", enabled: true, txToday: 312, lastTested: ago(120), currency: "NGN", needsKeys: true, publicKey: "pk_live_xxxxxxxxxxxx", hasSecret: true },
    { id: "g2", code: "FW", name: "Flutterwave", status: "Sandbox", mode: "sandbox", enabled: true, txToday: null, lastTested: ago(DAY), currency: "NGN", needsKeys: true, publicKey: "FLWPUBK_TEST-xxxxxxxx", hasSecret: true },
    { id: "g3", code: "ST", name: "Stripe", status: "Disconnected", mode: "sandbox", enabled: false, txToday: null, lastTested: null, currency: "USD", needsKeys: true, publicKey: "", hasSecret: false },
    { id: "g4", code: "MN", name: "Manual Payments", status: "Connected", mode: "production", enabled: true, txToday: 14, lastTested: null, currency: "NGN", needsKeys: false, publicKey: "", hasSecret: false },
  ],
};

const COMMS: CommsData = {
  email: { host: "smtp.sendgrid.net", port: "587", username: "apikey", encryption: "TLS", senderName: "Schoolzy", senderEmail: "noreply@schoolzy.com", hasPassword: true },
  sms: { provider: "Termii", senderId: "Schoolzy", countryCode: "+234", hasApiKey: true },
  templates: [
    { id: "t1", name: "Welcome Email", channel: "Email", status: "Active", subject: "Welcome to {{school_name}} on Schoolzy", body: "Hi {{admin_name}}, your school {{school_name}} is ready. Sign in to get started.", updatedAt: ago(DAY * 22) },
    { id: "t2", name: "Password Reset", channel: "Email", status: "Active", subject: "Reset your Schoolzy password", body: "Hi {{admin_name}}, use the link in this email to reset your password. It expires soon.", updatedAt: ago(DAY * 38) },
    { id: "t3", name: "Subscription Renewal", channel: "Both", status: "Active", subject: "Your subscription renews on {{date}}", body: "{{school_name}}: your subscription of {{amount}} renews on {{date}}.", updatedAt: ago(DAY * 43) },
    { id: "t4", name: "Payment Successful", channel: "Both", status: "Active", subject: "Payment received", body: "Thanks {{admin_name}}. We received {{amount}} for {{school_name}} on {{date}}.", updatedAt: ago(DAY * 48) },
    { id: "t5", name: "Payment Failed", channel: "Both", status: "Active", subject: "Payment failed", body: "{{school_name}}: your payment of {{amount}} did not go through. Please retry.", updatedAt: ago(DAY * 48) },
    { id: "t6", name: "School Approved", channel: "Email", status: "Active", subject: "{{school_name}} has been approved", body: "Good news {{admin_name}}, {{school_name}} is approved and ready to use.", updatedAt: ago(DAY * 52) },
    { id: "t7", name: "New School Registration", channel: "Email", status: "Draft", subject: "New school registration", body: "A new school, {{school_name}}, has registered and is awaiting review.", updatedAt: ago(DAY * 56) },
  ],
};

export async function mockFetchSettings(): Promise<PlatformSettings> {
  await mockDelay(600);
  return structuredClone(PLATFORM);
}

export async function mockFetchGateways(): Promise<GatewaysData> {
  await mockDelay(600);
  return structuredClone(GATEWAYS);
}

export async function mockFetchComms(): Promise<CommsData> {
  await mockDelay(600);
  return structuredClone(COMMS);
}