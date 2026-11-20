import type { Category, ChatMessage, Conversation, Priority, Ticket, TicketMessage, TicketStatus } from "../types";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
const DAY = 1440;

// TODO: Delete once the real endpoints are wired.
type Seed = [
  subject: string, school: string, location: string, by: string, category: Category,
  priority: Priority, status: TicketStatus, agent: string | null, daysAgo: number, respondedAfterMin: number | null,
];

const SEEDS: Seed[] = [
  ["Login keeps failing for teachers", "Greenfield Academy", "Lagos", "Mrs. Adaeze Obi", "Technical", "High", "Open", "Amara Osei", 0, null],
  ["Invoice amount looks incorrect", "Sunrise International School", "Abuja", "Mr. Paul Eze", "Billing", "Critical", "In Progress", "Amara Osei", 1, 40],
  ["Results module not showing for Class 10B", "Sunrise International", "Kano", "Miss Halima Bello", "Technical", "Medium", "Waiting", "Blessing Osei", 3, 95],
  ["Cannot reset admin password", "Cedar Grove School", "Ibadan", "Mrs. Adaeze Obi", "Account", "Low", "Open", null, 2, null],
  ["Parent accounts missing after import", "Horizon Academy", "Enugu", "Mr. Chidi Okoro", "Account", "High", "In Progress", "Tunde Bello", 2, 55],
  ["Duplicate payment charged", "Oakridge International", "Kano", "Mrs. Adaeze Obi", "Billing", "Medium", "Resolved", "Ngozi Eze", 4, 30],
  ["Onboarding checklist stuck at 80%", "Blue Horizon School", "Kaduna", "Mr. Sani Bala", "Onboarding", "Low", "Closed", "Amara Osei", 9, 120],
  ["Attendance export fails", "Maple Leaf Academy", "Port Harcourt", "Mrs. Joy Wike", "Technical", "Medium", "Resolved", "Tunde Bello", 3, 70],
  ["Need help configuring grading scale", "Pioneer Academy", "Enugu", "Mr. Emeka Obi", "Onboarding", "Low", "Open", null, 1, null],
  ["Storage limit warning", "Heritage High School", "Abuja", "Mrs. Ify Nwosu", "Account", "Medium", "Waiting", "Blessing Osei", 5, 200],
  ["Refund request status", "Westgate College", "Kaduna", "Mr. Tunde Bakare", "Billing", "High", "In Progress", "Ngozi Eze", 1, 25],
  ["SMS notifications delayed", "Rosebud College", "Kano", "Mrs. Fatima Musa", "Technical", "Critical", "Resolved", "Amara Osei", 2, 20],
];

function buildTickets(): Ticket[] {
  return SEEDS.map(([subject, school, location, by, category, priority, status, agent, daysAgo, responseMin], i) => {
    const createdMin = daysAgo * DAY + 30;
    const createdAt = ago(createdMin);
    const firstResponseAt = responseMin === null ? null : ago(createdMin - responseMin);
    const done = status === "Resolved" || status === "Closed";
    // Resolved tickets close "today" so the Resolved Today card has data
    const resolvedAt = done ? (status === "Resolved" ? ago(120) : ago(createdMin - DAY)) : null;

    const messages: TicketMessage[] = [
      { id: `m-${i}-1`, author: "school", name: "school", text: `${subject}. This started recently and is affecting our staff.`, at: createdAt },
    ];
    if (firstResponseAt) {
      messages.push({
        id: `m-${i}-2`, author: "agent", name: "Support Team", at: firstResponseAt,
        text: "Thanks for the report. We're looking into this. Can you confirm when it first happened and whether other users are affected?",
      });
    }
    return {
      id: `tkt-${i + 1}`, code: `TKT-${2845 - i}`, subject, school, location, submittedBy: by, category, priority, status, agent,
      platform: "Web", browser: "Safari 17", os: "iPad OS 17",
      createdAt, firstResponseAt, resolvedAt, messages,
    };
  });
}

export async function mockFetchTickets(): Promise<Ticket[]> {
  await mockDelay(700);
  return buildTickets();
}

const m = (id: string, from: ChatMessage["from"], text: string, minsAgo: number): ChatMessage => ({
  id, from, text, at: ago(minsAgo), read: true,
});

function buildConversations(): Conversation[] {
  const base = { online: false, unread: 0, openTickets: 0, recent: ["Uploaded attendance", "Renewed subscription", "Added 3 teachers"] };
  return [
    {
      ...base, id: "c1", schoolId: "1", school: "Greenfield Academy", location: "Lagos", contact: "Mrs. Adaeze Obi", plan: "Premium", online: true, unread: 2, openTickets: 1,
      messages: [
        m("c1-1", "school", "Hi, we're having trouble with the attendance module.", 150),
        m("c1-2", "admin", "Hello! I'm looking into this for you right now.", 147),
        m("c1-3", "school", "The error appears when saving records for Class 5A.", 144),
        m("c1-4", "admin", "Got it — we've pushed a fix. Please refresh and try again.", 130),
        { ...m("c1-5", "school", "Thank you, the issue is now resolved!", 2), read: false },
      ],
    },
    {
      ...base, id: "c2", schoolId: "2", school: "Heritage High School", location: "Abuja", contact: "Mrs. Ify Nwosu", plan: "Standard", online: true, unread: 1,
      messages: [
        m("c2-1", "admin", "Your invoice has been generated.", 60),
        { ...m("c2-2", "school", "We're still waiting on the payment confirmation.", 14), read: false },
      ],
    },
    {
      ...base, id: "c3", schoolId: "3", school: "Meadow Springs School", location: "Rivers", contact: "Mr. Dan Wike", plan: "Enterprise",
      messages: [m("c3-1", "admin", "The update ships tomorrow.", 90), m("c3-2", "school", "Perfect, we'll wait for the update.", 60)],
    },
    {
      ...base, id: "c4", schoolId: "4", school: "Sunrise International", location: "Kano", contact: "Miss Halima Bello", plan: "Basic",
      messages: [m("c4-1", "school", "Is Class 10B available now?", 200), m("c4-2", "admin", "Class 10B has been configured, testing now.", 120)],
    },
    {
      ...base, id: "c5", schoolId: "5", school: "Crown Heights Academy", location: "Ogun", contact: "Mr. Seun Ade", plan: "Premium",
      messages: [m("c5-1", "admin", "Parent logins have been reset.", 1500), m("c5-2", "school", "All parents can login now. Thanks!", 1440)],
    },
  ];
}

export async function mockFetchConversations(): Promise<Conversation[]> {
  await mockDelay(600);
  return buildConversations();
}