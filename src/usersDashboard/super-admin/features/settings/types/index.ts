import type {
  EmailValues, GeneralValues, LocalizationValues, SecurityValues, SmsValues,
} from "../schemas";

export type SettingsTab = "general" | "branding" | "security" | "localization" | "system";
export type CommsTab = "email" | "sms" | "templates";

export type GeneralSettings = GeneralValues;
export type SecuritySettings = SecurityValues;
export type LocalizationSettings = LocalizationValues;

export interface BrandingSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  loginBgUrl: string | null;
}

export interface SystemSettings {
  maintenance: { enabled: boolean; message: string };
  status: {
    storageUsedGb: number; storageTotalGb: number;
    dbUsedGb: number; dbTotalGb: number;
    api: string; server: string;
  };
}

export interface PlatformSettings {
  general: GeneralSettings;
  branding: BrandingSettings;
  security: SecuritySettings;
  localization: LocalizationSettings;
  system: SystemSettings;
}

export type SystemAction = "cache" | "optimize" | "diagnostics";

export type GatewayStatus = "Connected" | "Sandbox" | "Disconnected";

export interface Gateway {
  id: string;
  code: string; // "PS"
  name: string;
  status: GatewayStatus;
  mode: "production" | "sandbox";
  enabled: boolean;
  txToday: number | null;
  lastTested: string | null; // ISO, null = never
  currency: string;
  needsKeys: boolean; // false for Manual Payments
  publicKey: string;
  hasSecret: boolean; // the secret itself is never sent to the browser
}

export interface GatewaysData {
  gateways: Gateway[];
  // TODO: the backend should provide these
  health: { value: string; text: string };
  txDelta: string;
}

export type EmailConfig = Omit<EmailValues, "password"> & { hasPassword: boolean };
export type SmsConfig = Omit<SmsValues, "apiKey"> & { hasApiKey: boolean };

export type Channel = "Email" | "SMS" | "Both";

export interface Template {
  id: string;
  name: string;
  channel: Channel;
  status: "Active" | "Draft";
  subject: string;
  body: string;
  updatedAt: string; // ISO
}

export interface CommsData {
  email: EmailConfig;
  sms: SmsConfig;
  templates: Template[];
}

export interface Notice {
  tone: "green" | "red";
  text: string;
}