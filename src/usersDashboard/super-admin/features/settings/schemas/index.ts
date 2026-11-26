import { z } from "zod";

const hex = z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/, "Use a hex colour like #1483D3");

const intRange = (min: number, max: number) =>
  z
    .string()
    .trim()
    .regex(/^\d+$/, "Whole numbers only")
    .refine((v) => Number(v) >= min && Number(v) <= max, `Enter a value between ${min} and ${max}`);

const image = (types: string[], maxBytes: number, typeMsg: string) =>
  z
    .instanceof(File)
    .refine((f) => types.includes(f.type), typeMsg)
    .refine((f) => f.size <= maxBytes, `File must be ${Math.round(maxBytes / 1024)}KB or smaller`)
    .optional();

const email = z.string().trim().min(1, "Email is required").email("Enter a valid email address");

/* ───────── Platform settings ───────── */

export const generalSchema = z.object({
  name: z.string().trim().min(2, "Platform name is required").max(60, "Name is too long"),
  url: z.string().trim().url("Enter a valid URL").refine((v) => v.startsWith("https://"), "Use a secure https:// URL"),
  supportEmail: email,
  supportPhone: z.string().trim().regex(/^\+?[\dA-Za-z\s-]{7,24}$/, "Enter a valid phone number"),
  timezone: z.string().min(1, "Select a timezone"),
  language: z.string().min(1, "Select a language"),
  address: z.string().trim().min(3, "Address is required").max(200, "Address is too long"),
});
export type GeneralValues = z.infer<typeof generalSchema>;

// No SVG on purpose: it can carry scripts.
export const brandingSchema = z.object({
  primaryColor: hex,
  secondaryColor: hex,
  accentColor: hex,
  logo: image(["image/png", "image/jpeg", "image/webp"], 2 * 1024 * 1024, "Use a PNG, JPG or WebP image"),
  favicon: image(["image/png", "image/x-icon", "image/vnd.microsoft.icon"], 512 * 1024, "Use an ICO or PNG file"),
  loginBg: image(["image/png", "image/jpeg"], 5 * 1024 * 1024, "Use a JPG or PNG image"),
});
export type BrandingValues = z.infer<typeof brandingSchema>;

export const securitySchema = z.object({
  minPasswordLength: intRange(8, 64),
  passwordExpiryDays: intRange(0, 365), // 0 = never expires
  maxLoginAttempts: intRange(3, 10),
  sessionTimeoutMinutes: intRange(5, 1440),
  requireUppercase: z.boolean(),
  requireNumbers: z.boolean(),
  requireSpecial: z.boolean(),
  twoFactor: z.boolean(),
  deviceVerification: z.boolean(),
  multipleSessions: z.boolean(),
});
export type SecurityValues = z.infer<typeof securitySchema>;

export const localizationSchema = z.object({
  currency: z.string().min(1, "Select a currency"),
  dateFormat: z.string().min(1, "Select a date format"),
  timeFormat: z.string().min(1, "Select a time format"),
  country: z.string().min(1, "Select a country"),
  language: z.string().min(1, "Select a language"),
  measurement: z.string().min(1, "Select a measurement system"),
});
export type LocalizationValues = z.infer<typeof localizationSchema>;

export const maintenanceSchema = z.object({
  message: z.string().trim().min(5, "Write a short message (at least 5 characters)").max(300, "Keep it under 300 characters"),
});
export type MaintenanceValues = z.infer<typeof maintenanceSchema>;

/* ───────── Gateways ───────── */

const gatewayBase = z.object({
  publicKey: z.string().trim().max(200, "Key is too long"),
  secretKey: z.string().max(200, "Key is too long"), // blank = keep the saved one
  mode: z.enum(["production", "sandbox"]),
  currency: z.string().min(1, "Select a currency"),
});
export type GatewayValues = z.infer<typeof gatewayBase>;

export const makeGatewaySchema = (needsKeys: boolean, hasSecret: boolean) =>
  gatewayBase.superRefine((v, ctx) => {
    if (!needsKeys) return;
    if (!v.publicKey) ctx.addIssue({ code: "custom", path: ["publicKey"], message: "Public key is required" });
    if (!hasSecret && !v.secretKey) ctx.addIssue({ code: "custom", path: ["secretKey"], message: "Secret key is required" });
  });

/* ───────── Email, SMS, templates ───────── */

const emailBase = z.object({
  host: z.string().trim().min(3, "SMTP host is required").max(120).regex(/^[A-Za-z0-9.-]+$/, "Enter a valid host name"),
  port: intRange(1, 65535),
  username: z.string().trim().max(120, "Username is too long"),
  password: z.string().max(200, "Password is too long"), // blank = keep the saved one
  encryption: z.enum(["TLS", "SSL"]),
  senderName: z.string().trim().min(2, "Sender name is required").max(60),
  senderEmail: email,
});
export type EmailValues = z.infer<typeof emailBase>;

export const makeEmailSchema = (hasPassword: boolean) =>
  emailBase.superRefine((v, ctx) => {
    if (!hasPassword && !v.password) ctx.addIssue({ code: "custom", path: ["password"], message: "Password is required" });
  });

const smsBase = z.object({
  provider: z.enum(["Termii", "Twilio", "Africa's Talking"]),
  apiKey: z.string().max(300, "Key is too long"), // blank = keep the saved one
  senderId: z.string().trim().regex(/^[A-Za-z0-9]{3,11}$/, "3 to 11 letters or numbers"),
  countryCode: z.string().trim().regex(/^\+\d{1,4}$/, "Use a code like +234"),
});
export type SmsValues = z.infer<typeof smsBase>;

export const makeSmsSchema = (hasKey: boolean) =>
  smsBase.superRefine((v, ctx) => {
    if (!hasKey && !v.apiKey) ctx.addIssue({ code: "custom", path: ["apiKey"], message: "API key is required" });
  });

export const templateSchema = z
  .object({
    name: z.string().trim().min(3, "Template name is required").max(80),
    channel: z.enum(["Email", "SMS", "Both"]),
    status: z.enum(["Active", "Draft"]),
    subject: z.string().trim().max(150, "Keep the subject under 150 characters"),
    body: z.string().trim().min(10, "Write the message (at least 10 characters)").max(3000, "Keep it under 3000 characters"),
  })
  .superRefine((v, ctx) => {
    if (v.channel !== "SMS" && v.subject.length < 3) {
      ctx.addIssue({ code: "custom", path: ["subject"], message: "Email templates need a subject" });
    }
  });
export type TemplateValues = z.infer<typeof templateSchema>;

export const testEmailSchema = z.object({ to: email });
export const testSmsSchema = z.object({ to: z.string().trim().regex(/^\+?\d[\d\s-]{6,18}$/, "Enter a valid phone number") });
export type TestValues = { to: string };