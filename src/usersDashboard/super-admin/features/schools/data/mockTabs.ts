import type {
  SchoolAcademics, SchoolActivityItem, SchoolFinance, SchoolUsersData, SchoolUser,
} from "../types/detail";
import { mockDelay } from "./mockApi";

// TODO: Delete once the real tab endpoints exist (tabs are gated off by LIVE_TABS).
const SAMPLE = { slug: "school", admin: "Adebayo Okafor", students: 1240, teachers: 68 };

export async function mockFetchUsers(_id: string): Promise<SchoolUsersData> {
  await mockDelay(600);
  const mail = (local: string) => `${local}@${SAMPLE.slug}.edu.ng`;
  const users: SchoolUser[] = [
    { id: "u1", name: "Adaeze Nwosu", role: "Student", email: mail("adaeze"), phone: "+234 811 234 5678", status: "Active", lastLogin: "2 hrs ago" },
    { id: "u2", name: "Okon Bassey", role: "Teacher", email: mail("okon.bassey"), phone: "+234 812 345 6789", status: "Active", lastLogin: "1 hr ago" },
    { id: "u3", name: "Mrs. Folake Balogun", role: "Parent", email: "folake@gmail.com", phone: "+234 813 456 7890", status: "Active", lastLogin: "Yesterday" },
    { id: "u4", name: SAMPLE.admin, role: "Admin", email: mail("adebayo"), phone: "+234 801 234 5678", status: "Active", lastLogin: "5 min ago" },
    { id: "u5", name: "Chukwuemeka Eze", role: "Student", email: mail("emeka"), phone: "+234 814 567 8901", status: "Inactive", lastLogin: "3 days ago" },
    { id: "u6", name: "Sade Williams", role: "Teacher", email: mail("sade.williams"), phone: "+234 815 678 9012", status: "Active", lastLogin: "30 min ago" },
    { id: "u7", name: "Mr. Tunde Fashola", role: "Parent", email: "tunde.f@yahoo.com", phone: "+234 816 789 0123", status: "Active", lastLogin: "2 days ago" },
    { id: "u8", name: "Funmilayo Oladele", role: "Student", email: mail("funmi"), phone: "+234 817 890 1234", status: "Active", lastLogin: "4 hrs ago" },
  ];
  return {
    counts: { students: SAMPLE.students, teachers: SAMPLE.teachers, parents: Math.round(SAMPLE.students * 0.79), admins: 3 },
    users,
  };
}

export async function mockFetchAcademics(_id: string): Promise<SchoolAcademics> {
  await mockDelay(600);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const results = [42, 65, 58, 78, 84, 72, 90];
  const attendance = [88, 91.5, 87.5, 93, 94, 90.5, 95];
  return {
    subjects: 18,
    classes: 24,
    resultsUploaded: 842,
    attendanceRate: 94,
    lessonNotes: 156,
    resultsByMonth: months.map((label, i) => ({ label, value: results[i] })),
    attendanceTrend: months.map((label, i) => ({ label, value: attendance[i] })),
    topTeachers: [
      { id: "t1", name: "Okon Bassey", subject: "Mathematics", count: 98 },
      { id: "t2", name: "Sade Williams", subject: "English", count: 87 },
      { id: "t3", name: "Emeka Okafor", subject: "Physics", count: 76 },
      { id: "t4", name: "Ngozi Obi", subject: "Chemistry", count: 65 },
      { id: "t5", name: "Kemi Adeyemi", subject: "Biology", count: 54 },
    ],
  };
}

export async function mockFetchFinance(_id: string): Promise<SchoolFinance> {
  await mockDelay(600);
  return {
    feesCollected: 28_400_000,
    feesChangePct: 12,
    outstandingFees: 3_200_000,
    outstandingStudents: 38,
    totalExpenses: 5_400_000,
    expensesChangePct: -4,
    transactions: 1247,
    transactionsThisMonth: 89,
    payments: [
      { id: "p1", student: "Adaeze Nwosu", amount: 85000, type: "School Fees", date: "2026-07-12", status: "Paid" },
      { id: "p2", student: "Chukwuemeka Eze", amount: 85000, type: "School Fees", date: "2026-07-10", status: "Paid" },
      { id: "p3", student: "Funmilayo Oladele", amount: 42500, type: "Half Term", date: "2026-07-08", status: "Pending" },
      { id: "p4", student: "Idowu Abiola", amount: 85000, type: "School Fees", date: "2026-07-05", status: "Paid" },
      { id: "p5", student: "Kemi Bankole", amount: 85000, type: "School Fees", date: "2026-07-03", status: "Paid" },
    ],
    expenses: [
      { id: "e1", description: "Staff Salaries", category: "Payroll", amount: 4_200_000, date: "2026-07-01", status: "Paid" },
      { id: "e2", description: "Facility Maintenance", category: "Operations", amount: 340_000, date: "2026-07-05", status: "Paid" },
      { id: "e3", description: "Textbooks & Supplies", category: "Academic", amount: 180_000, date: "2026-07-08", status: "Paid" },
      { id: "e4", description: "IT Infrastructure", category: "Technology", amount: 250_000, date: "2026-07-10", status: "Pending" },
      { id: "e5", description: "External Exams", category: "Academic", amount: 460_000, date: "2026-07-12", status: "Paid" },
    ],
  };
}

export async function mockFetchActivity(_id: string): Promise<SchoolActivityItem[]> {
  await mockDelay(600);
  return [
    { id: "a1", title: "Uploaded term results for JSS 3A", by: SAMPLE.admin, category: "Results", at: "2026-07-14T09:23:00Z" },
    { id: "a2", title: "Subscription renewal reminder sent", by: "System", category: "Subscription", at: "2026-07-14T08:45:00Z" },
    { id: "a3", title: "Marked attendance for SSS 2B", by: "Sade Williams", category: "Attendance", at: "2026-07-13T16:12:00Z" },
    { id: "a4", title: "Added new student: Precious Obi", by: SAMPLE.admin, category: "Users", at: "2026-07-13T14:30:00Z" },
    { id: "a5", title: "School profile updated", by: SAMPLE.admin, category: "Settings", at: "2026-07-12T11:00:00Z" },
    { id: "a6", title: "Payment received: ₦85,000 from Adaeze Nwosu", by: "System", category: "Finance", at: "2026-07-12T10:15:00Z" },
    { id: "a7", title: "Uploaded lesson note for Mathematics", by: "Okon Bassey", category: "Academic", at: "2026-07-11T15:45:00Z" },
    { id: "a8", title: "School account created", by: "Super Admin", category: "Admin", at: "2026-07-10T09:00:00Z" },
  ];
}