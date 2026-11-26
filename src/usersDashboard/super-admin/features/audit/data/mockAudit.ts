import type { AuditAction, AuditCategory, AuditChange, AuditData, AuditLog, AuditStatus } from "../types";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

// TODO: Delete once the real endpoint is wired.
interface Seed {
  m: number; // minutes ago
  user: string;
  role: string;
  school?: string;
  category: AuditCategory;
  action: AuditAction;
  status: AuditStatus;
  ip: string;
  summary: string;
  description: string;
  change?: AuditChange;
  resource?: { name: string; sub: string };
  location?: string;
}

const SEEDS: Seed[] = [
  { m: 2, user: "Amara Osei", role: "Super Admin", category: "Settings", action: "Permission Changed", status: "Critical", ip: "105.112.44.21", summary: "Role permissions updated for Support Agent", description: "Updated permissions for the Support Agent role — removed Delete access from Schools module.", change: { label: "Schools → Delete", before: "Enabled", after: "Disabled" }, resource: { name: "Support Agent", sub: "Role · role_support" } },
  { m: 6, user: "Tunde Balogun", role: "Super Admin", category: "Authentication", action: "Login", status: "Success", ip: "41.190.3.88", summary: "Admin login from Lagos", description: "Signed in to the platform console." },
  { m: 23, user: "Chisom Eze", role: "Operations Manager", school: "Greenfield Academy", category: "Schools", action: "Approve", status: "Success", ip: "197.210.55.60", summary: "Greenfield Academy approved", description: "Approved the registration of Greenfield Academy.", resource: { name: "Greenfield Academy", sub: "School · school_11" } },
  { m: 30, user: "Unknown", role: "—", category: "Security", action: "Login", status: "Critical", ip: "192.168.1.105", summary: "5 failed login attempts — IP locked", description: "Five failed sign-in attempts from one address. The address was locked.", location: "Amsterdam, Netherlands" },
  { m: 45, user: "Fatima Yusuf", role: "Finance Officer", category: "Payments", action: "Payment Processed", status: "Success", ip: "105.112.44.55", summary: "₦120,000 payment processed", description: "Processed a subscription payment of ₦120,000." },
  { m: 70, user: "Tunde Balogun", role: "Super Admin", category: "Subscriptions", action: "Update", status: "Success", ip: "41.190.3.88", summary: "Enterprise plan student limit increased", description: "Raised the maximum students on the Enterprise plan.", change: { label: "Enterprise → Max students", before: "1,500", after: "2,000" } },
  { m: 90, user: "Blessing Adeyemi", role: "Support Agent", school: "Sunrise International", category: "Support", action: "Update", status: "Success", ip: "197.210.55.80", summary: "Ticket TKT-2845 reassigned", description: "Reassigned a support ticket to another agent." },
  { m: 110, user: "System", role: "System", category: "System", action: "Renew Subscription", status: "Failed", ip: "10.0.0.1", summary: "Auto-renewal failed — Valley View College", description: "Automatic renewal failed because the saved card has expired.", resource: { name: "Valley View College", sub: "School · school_8" } },
  { m: 120, user: "Chisom Eze", role: "Operations Manager", category: "Users", action: "Create", status: "Success", ip: "197.210.55.60", summary: "New support agent account created", description: "Created a new support agent account." },
  { m: 140, user: "Amara Osei", role: "Super Admin", category: "Settings", action: "Update", status: "Success", ip: "105.112.44.21", summary: "SMTP configuration changed", description: "Email provider switched to SendGrid.", change: { label: "Email → Provider", before: "Mailgun", after: "SendGrid" } },
  { m: 180, user: "Tunde Balogun", role: "Super Admin", category: "Authentication", action: "Login", status: "Success", ip: "41.190.3.88", summary: "Admin login", description: "Signed in to the platform console." },
  { m: 200, user: "Fatima Yusuf", role: "Finance Officer", category: "Payments", action: "Export", status: "Success", ip: "105.112.44.55", summary: "Transactions exported", description: "Exported the transactions list as CSV." },
  { m: 240, user: "Chisom Eze", role: "Operations Manager", school: "Sunrise Academy", category: "Schools", action: "Suspend", status: "Success", ip: "197.210.55.60", summary: "Sunrise Academy suspended", description: "Suspended the school for an expired subscription." },
  { m: 260, user: "Blessing Adeyemi", role: "Support Agent", school: "Sunrise International", category: "Support", action: "Update", status: "Success", ip: "197.210.55.80", summary: "Ticket TKT-2844 closed", description: "Closed a resolved support ticket." },
  { m: 300, user: "Amara Osei", role: "Super Admin", category: "Settings", action: "Update", status: "Success", ip: "105.112.44.21", summary: "Platform language updated", description: "Changed the default platform language.", change: { label: "General → Language", before: "English (UK)", after: "English (Nigeria)" } },
];

function buildLogs(): AuditLog[] {
  return SEEDS.map((s, i) => ({
    id: `log-${i + 1}`,
    code: `log${String(i + 1).padStart(3, "0")}`,
    at: ago(s.m),
    user: s.user,
    role: s.role,
    school: s.school ?? null,
    category: s.category,
    action: s.action,
    status: s.status,
    ip: s.ip,
    summary: s.summary,
    description: s.description,
    change: s.change,
    browser: "Chrome 126",
    os: "macOS Sonoma",
    device: "Desktop",
    location: s.location ?? "Lagos, Nigeria",
    sessionId: `sess_${(0x8f2a91bc + i * 7919).toString(16)}`,
    resource: s.resource,
  }));
}

const up = (text: string) => ({ text, good: true });

export async function mockFetchAudit(): Promise<AuditData> {
  await mockDelay(700);
  return {
    logs: buildLogs(),
    insights: [
      { id: "i1", tone: "red", title: "Multiple Failed Logins", text: "5 failed attempts from 192.168.1.105. Account locked.", at: ago(30) },
      { id: "i2", tone: "amber", title: "Suspicious Login Location", text: "Login attempt from Amsterdam, Netherlands — outside normal regions.", at: ago(900) },
      { id: "i3", tone: "purple", title: "Critical Permission Change", text: "Support Agent role permissions modified by Amara Osei.", at: ago(2) },
      { id: "i4", tone: "amber", title: "SMTP Configuration Changed", text: "Email provider switched to SendGrid. Verify delivery settings.", at: ago(140) },
      { id: "i5", tone: "red", title: "Subscription Auto-Renewal Failed", text: "Valley View College payment failed — card expired.", at: ago(110) },
    ],
    deltas: { events: up("+24%"), failed: up("-2"), logins: up("+3"), critical: { text: "today", good: false } },
  };
}