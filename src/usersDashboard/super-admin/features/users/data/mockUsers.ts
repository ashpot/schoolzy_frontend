import type { PlatformUser, UserKind } from "../types";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ago = (days: number, hours = 0) => new Date(Date.now() - (days * 24 + hours) * 3_600_000).toISOString();

type Seed = Partial<Omit<PlatformUser, "id" | "kind" | "createdAt" | "lastLogin" | "name" | "school">> & {
  name: string;
  school: string;
  loginHoursAgo?: number | null; // null = never logged in
  joinedDaysAgo?: number;
};

function build(kind: UserKind, seeds: Seed[]): PlatformUser[] {
  return seeds.map((s, i) => {
    const { loginHoursAgo = 3, joinedDaysAgo = 90, ...rest } = s;
    const first = s.name.replace(/^(mrs?|dr|engr)\.?\s+/i, "").split(" ")[0].toLowerCase();
    const domain = s.school.toLowerCase().replace(/[^a-z]+/g, "").slice(0, 12);
    return {
      id: `${kind}-${i + 1}`,
      kind,
      email: `${first}@${domain}.edu.ng`,
      phone: `0801234${5600 + i}`,
      location: null,
      status: "Active",
      ...rest,
      lastLogin: loginHoursAgo == null ? null : ago(0, loginHoursAgo),
      createdAt: ago(joinedDaysAgo),
    };
  });
}

// TODO: Delete once the real endpoints are wired.
const db: Record<UserKind, PlatformUser[]> = {
  admin: build("admin", [
    { name: "Adebayo Okafor", school: "Greenfield Academy", location: "Lagos", plan: "Premium", loginHoursAgo: 20 },
    { name: "Ngozi Eze", school: "Sunlight International", location: "FCT", plan: "Standard", loginHoursAgo: 36 },
    { name: "Chidi Nwosu", school: "Heritage High School", location: "Rivers", plan: "Premium", loginHoursAgo: 60 },
    { name: "Fatima Musa", school: "Rosebud College", location: "Kano", plan: "Basic", loginHoursAgo: 100, joinedDaysAgo: 12 },
    { name: "Emeka Obi", school: "Pioneer Academy", location: "Enugu", plan: "Standard", loginHoursAgo: 140, joinedDaysAgo: 9 },
    { name: "Blessing Aigbogun", school: "Crown Heights School", location: "Edo", plan: "Standard", status: "Inactive", loginHoursAgo: 380 },
    { name: "Tunde Bakare", school: "Westgate College", location: "Lagos", plan: "Premium", loginHoursAgo: 5, joinedDaysAgo: 4 },
    { name: "Grace Osei", school: "Bright Minds School", location: "Plateau", plan: "Basic", status: "Locked", loginHoursAgo: 500 },
    { name: "Kemi Adeyemi", school: "Sunrise Academy", location: "Oyo", plan: "Standard", loginHoursAgo: 8 },
    { name: "Musa Ibrahim", school: "Valley Heights School", location: "Kaduna", plan: "Basic", loginHoursAgo: 12 },
  ]),
  teacher: build("teacher", [
    { name: "Amina Yusuf", school: "Bright Future High", location: "Abuja", subject: "English Literature", classes: ["SS 1", "SS 2"], loginHoursAgo: 2 },
    { name: "Emeka Obi", school: "Starlight Academy", location: "Port Harcourt", subject: "Physics", classes: ["SS 3"], loginHoursAgo: 5 },
    { name: "Chinelo Nwosu", school: "Mountview Sec School", location: "Enugu", subject: "Biology", classes: ["JSS 3", "SS 1"], status: "Inactive", loginHoursAgo: 400 },
    { name: "Tunde Lawal", school: "Sky High College", location: "Ibadan", subject: "Chemistry", classes: ["SS 1", "SS 2"], loginHoursAgo: 30 },
    { name: "Fola Adeyemi", school: "Sunrise Academy", location: "Ibadan", subject: "Geography", classes: ["JSS 2", "JSS 3"], loginHoursAgo: 7, joinedDaysAgo: 10 },
    { name: "Halima Bello", school: "New Horizon School", location: "Kaduna", subject: "Computer Science", classes: ["SS 2", "SS 3"], status: "Inactive", loginHoursAgo: 600 },
    { name: "Okon Bassey", school: "Greenfield Academy", location: "Lagos", subject: "Mathematics", classes: ["JSS 1", "JSS 2"], loginHoursAgo: 1 },
    { name: "Sade Williams", school: "Greenfield Academy", location: "Lagos", subject: "English Literature", classes: ["SS 2"], loginHoursAgo: 3, joinedDaysAgo: 20 },
    { name: "Ngozi Obi", school: "Pioneer Academy", location: "Enugu", subject: "Chemistry", classes: ["SS 3"], status: "Locked", loginHoursAgo: 300 },
    { name: "Kemi Adeyemi", school: "Crown Heights School", location: "Edo", subject: "Biology", classes: ["SS 1"], loginHoursAgo: 9 },
  ]),
  parent: build("parent", [
    { name: "Mrs. Folake Balogun", school: "Bright Future High", location: "Abuja", children: 3, loginHoursAgo: 4 },
    { name: "Mr. Tunde Fashola", school: "Starlight Academy", location: "Port Harcourt", children: 2, loginHoursAgo: 22 },
    { name: "Dr. Amara Okonkwo", school: "Mountview Sec School", location: "Enugu", children: 1, status: "Inactive", loginHoursAgo: 700 },
    { name: "Hajiya Mariam Sani", school: "Sky High College", location: "Ibadan", children: 4, loginHoursAgo: 6, joinedDaysAgo: 8 },
    { name: "Engr. Segun Adeleke", school: "Sunrise Academy", location: "Ibadan", children: 2, loginHoursAgo: 50, joinedDaysAgo: 15 },
    { name: "Mrs. Grace Nwosu", school: "New Horizon School", location: "Kaduna", children: 3, status: "Inactive", loginHoursAgo: 800 },
    { name: "Mr. Ibrahim Danjuma", school: "Greenfield Academy", location: "Lagos", children: 2, loginHoursAgo: 12, joinedDaysAgo: 3 },
    { name: "Mrs. Elizabeth Igwe", school: "Greenfield Academy", location: "Lagos", children: 1, loginHoursAgo: 9, joinedDaysAgo: 25 },
    { name: "Chief Obinna Eze", school: "Pioneer Academy", location: "Enugu", children: 5, status: "Locked", loginHoursAgo: 330 },
    { name: "Mrs. Bisi Ajayi", school: "Westgate College", location: "Lagos", children: 2, loginHoursAgo: 18 },
  ]),
  student: build("student", [
    { name: "Kelechi Igwe", school: "Greenfield Academy", location: "Lagos", className: "JSS 1", parentName: "Mrs. Elizabeth Igwe", admissionNo: "SCH/2025/002", loginHoursAgo: 3 },
    { name: "Femi Ade", school: "Greenfield Academy", location: "Lagos", className: "JSS 1", parentName: "Mrs. Folake Balogun", admissionNo: "SCH/2025/003", loginHoursAgo: 5, joinedDaysAgo: 20 },
    { name: "Emeka Okeke", school: "Greenfield Academy", location: "Lagos", className: "SS 3", parentName: "Mrs. Folake Balogun", admissionNo: "SCH/2025/004", loginHoursAgo: 8 },
    { name: "Ngozi Anthony", school: "Greenfield Academy", location: "Lagos", className: "JSS 2", parentName: "Mr. Ibrahim Danjuma", admissionNo: "SCH/2025/007", loginHoursAgo: 12, joinedDaysAgo: 14 },
    { name: "Hassan Jibril", school: "Sunlight International", location: "FCT", className: "SS 3", parentName: "Mrs. Aisha Jibril", admissionNo: "SCH/2025/008", loginHoursAgo: 26 },
    { name: "Chidinma Lawrence", school: "Sunlight International", location: "FCT", className: "SS 1", parentName: "Mr. Paul Lawrence", admissionNo: "SCH/2025/009", loginHoursAgo: 2, joinedDaysAgo: 6 },
    { name: "Precious Obi", school: "Heritage High School", location: "Rivers", className: "JSS 3", parentName: "Chief Obinna Eze", admissionNo: "SCH/2025/011", loginHoursAgo: 40 },
    { name: "Adaeze Nwosu", school: "Rosebud College", location: "Kano", className: "SS 2", parentName: "Mrs. Grace Nwosu", admissionNo: "SCH/2025/012", status: "Inactive", loginHoursAgo: 500 },
    { name: "Idowu Abiola", school: "Pioneer Academy", location: "Enugu", className: "JSS 1", parentName: "Mrs. Bisi Ajayi", admissionNo: "SCH/2025/014", loginHoursAgo: 4, joinedDaysAgo: 9 },
    { name: "Kemi Bankole", school: "Crown Heights School", location: "Edo", className: "SS 2", parentName: "Mr. Segun Bankole", admissionNo: "SCH/2025/015", loginHoursAgo: 15 },
  ]),
};

export async function mockFetchUsers(kind: UserKind): Promise<PlatformUser[]> {
  await mockDelay(700);
  return [...db[kind]];
}