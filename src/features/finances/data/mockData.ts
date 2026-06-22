import type { FeeType, Fee, AssignedFee, Student, Payment, Expense, PaidListEntry } from "../types";

export const mockFeeTypes: FeeType[] = [
  { id: "1", name: "Tuition Fee",      description: "Core academic fee covering instructional services and classroom resources.",   createdAt: "2025-09-01" },
  { id: "2", name: "Development Levy", description: "Annual contribution toward school infrastructure and facility upgrades.",      createdAt: "2025-09-01" },
  { id: "3", name: "Sports Fee",       description: "Covers access to sports equipment, coaching staff, and inter-house events.",   createdAt: "2025-09-01" },
  { id: "4", name: "Exam Fee",         description: "Charged per term to cover examination administration and result processing.",   createdAt: "2025-09-01" },
  { id: "5", name: "Library Fee",      description: "Grants access to the school library, textbooks, and digital resources.",       createdAt: "2025-09-01" },
  { id: "6", name: "Hostel Fee",       description: "Accommodation charges for boarding students, billed per term.",                createdAt: "2025-09-01" },
  { id: "7", name: "Transport Fee",    description: "School bus service for day students; amount varies by route distance.",        createdAt: "2025-09-01" },
  { id: "8", name: "Miscellaneous",    description: "Covers sundry charges not classified under other fee categories.",             createdAt: "2025-09-01" },
];

export const mockFees: Fee[] = [
  { id: "1",  name: "First Term Tuition",      feeTypeId: "1", feeTypeName: "Tuition Fee",      term: "First Term",  amount: 75000, dateDue: "2025-09-15" },
  { id: "2",  name: "Second Term Tuition",     feeTypeId: "1", feeTypeName: "Tuition Fee",      term: "Second Term", amount: 75000, dateDue: "2026-01-10" },
  { id: "3",  name: "Third Term Tuition",      feeTypeId: "1", feeTypeName: "Tuition Fee",      term: "Third Term",  amount: 75000, dateDue: "2026-04-05" },
  { id: "4",  name: "Annual Development Levy", feeTypeId: "2", feeTypeName: "Development Levy", term: "First Term",  amount: 25000, dateDue: "2025-09-15" },
  { id: "5",  name: "First Term Exam",         feeTypeId: "4", feeTypeName: "Exam Fee",         term: "First Term",  amount: 5000,  dateDue: "2025-11-01" },
  { id: "6",  name: "Second Term Exam",        feeTypeId: "4", feeTypeName: "Exam Fee",         term: "Second Term", amount: 5000,  dateDue: "2026-03-01" },
  { id: "7",  name: "Sports & Recreation",     feeTypeId: "3", feeTypeName: "Sports Fee",       term: "First Term",  amount: 8000,  dateDue: "2025-09-20" },
  { id: "8",  name: "Library Access Fee",      feeTypeId: "5", feeTypeName: "Library Fee",      term: "First Term",  amount: 3500,  dateDue: "2025-09-20" },
  { id: "9",  name: "Hostel Boarding Fee",     feeTypeId: "6", feeTypeName: "Hostel Fee",       term: "Second Term", amount: 80000, dateDue: "2026-01-10" },
  { id: "10", name: "Transport Levy",          feeTypeId: "7", feeTypeName: "Transport Fee",    term: "First Term",  amount: 58000, dateDue: "2025-09-15" },
];

export const mockAssignedFees: AssignedFee[] = [
  { id: "1",  feeId: "1", feeName: "First Term Tuition",      feeTypeName: "Tuition Fee",      feeTypeIndex: 0, amount: 75000, sectionId: "primary", sectionLabel: "Primary" },
  { id: "2",  feeId: "1", feeName: "First Term Tuition",      feeTypeName: "Tuition Fee",      feeTypeIndex: 0, amount: 75000, sectionId: "junior",  sectionLabel: "Junior"  },
  { id: "3",  feeId: "2", feeName: "Second Term Tuition",     feeTypeName: "Tuition Fee",      feeTypeIndex: 0, amount: 75000, sectionId: "junior",  sectionLabel: "Junior"  },
  { id: "4",  feeId: "3", feeName: "Third Term Tuition",      feeTypeName: "Tuition Fee",      feeTypeIndex: 0, amount: 75000, sectionId: "senior",  sectionLabel: "Senior"  },
  { id: "5",  feeId: "4", feeName: "Annual Development Levy", feeTypeName: "Development Levy", feeTypeIndex: 1, amount: 25000, sectionId: "nursery", sectionLabel: "Nursery" },
  { id: "6",  feeId: "5", feeName: "First Term Exam",         feeTypeName: "Exam Fee",         feeTypeIndex: 3, amount: 5000,  sectionId: "primary", sectionLabel: "Primary" },
  { id: "7",  feeId: "7", feeName: "Sports & Recreation",     feeTypeName: "Sports Fee",       feeTypeIndex: 2, amount: 8000,  sectionId: "junior",  sectionLabel: "Junior"  },
  { id: "8",  feeId: "8", feeName: "Library Access Fee",      feeTypeName: "Library Fee",      feeTypeIndex: 4, amount: 3500,  sectionId: "primary", sectionLabel: "Primary" },
  { id: "9",  feeId: "9", feeName: "Hostel Boarding Fee",     feeTypeName: "Hostel Fee",       feeTypeIndex: 5, amount: 80000, sectionId: "senior",  sectionLabel: "Senior"  },
  { id: "10", feeId: "6", feeName: "Second Term Exam",        feeTypeName: "Exam Fee",         feeTypeIndex: 3, amount: 5000,  sectionId: "junior",  sectionLabel: "Junior"  },
];

export const mockStudents: Student[] = [
  { id: "1",  name: "Amara Okonkwo",  admissionNo: "SCH/2024/001", class: "SS 1",      sectionId: "senior",  sectionLabel: "Senior"  },
  { id: "2",  name: "Tunde Adeyemi",  admissionNo: "SCH/2024/002", class: "SS 2",      sectionId: "senior",  sectionLabel: "Senior"  },
  { id: "3",  name: "Chisom Eze",     admissionNo: "SCH/2024/003", class: "SS 3",      sectionId: "senior",  sectionLabel: "Senior"  },
  { id: "4",  name: "Fatima Musa",    admissionNo: "SCH/2024/004", class: "JSS 2",     sectionId: "junior",  sectionLabel: "Junior"  },
  { id: "5",  name: "David Nwosu",    admissionNo: "SCH/2024/005", class: "JSS 3",     sectionId: "junior",  sectionLabel: "Junior"  },
  { id: "6",  name: "Ngozi Obi",      admissionNo: "SCH/2024/006", class: "Primary 3", sectionId: "primary", sectionLabel: "Primary" },
  { id: "7",  name: "Emeka Chukwu",   admissionNo: "SCH/2024/007", class: "Primary 5", sectionId: "primary", sectionLabel: "Primary" },
  { id: "8",  name: "Aisha Bello",    admissionNo: "SCH/2024/008", class: "JSS 1",     sectionId: "junior",  sectionLabel: "Junior"  },
  { id: "9",  name: "Kemi Adewale",   admissionNo: "SCH/2024/009", class: "Primary 1", sectionId: "primary", sectionLabel: "Primary" },
  { id: "10", name: "Uche Okafor",    admissionNo: "SCH/2024/010", class: "SS 3",      sectionId: "senior",  sectionLabel: "Senior"  },
  { id: "11", name: "Bola Fashola",   admissionNo: "SCH/2024/011", class: "JSS 2",     sectionId: "junior",  sectionLabel: "Junior"  },
  { id: "12", name: "Ibrahim Yakubu", admissionNo: "SCH/2024/012", class: "SS 1",      sectionId: "senior",  sectionLabel: "Senior"  },
];

const STAFF = ["Mrs. Okafor", "Mr. Adebayo", "Miss Lawal", "Mr. Nwosu", "Mr. Chukwu"];

export const mockPayments: Payment[] = [
  { id: "1",  studentId: "1",  studentName: "Amara Okonkwo",  admissionNo: "SCH/2024/001", studentClass: "SS 1",      sectionLabel: "Senior",  feeId: "1", feeName: "First Term Tuition",      feeTypeName: "Tuition Fee",      feeTypeIndex: 0, term: "First Term",  receivedBy: STAFF[0], receivedDate: "2025-01-10", amount: 75000, totalFeeAmount: 75000 },
  { id: "2",  studentId: "2",  studentName: "Tunde Adeyemi",  admissionNo: "SCH/2024/002", studentClass: "SS 2",      sectionLabel: "Senior",  feeId: "1", feeName: "First Term Tuition",      feeTypeName: "Tuition Fee",      feeTypeIndex: 0, term: "First Term",  receivedBy: STAFF[1], receivedDate: "2025-01-11", amount: 40000, totalFeeAmount: 75000 },
  { id: "3",  studentId: "3",  studentName: "Chisom Eze",     admissionNo: "SCH/2024/003", studentClass: "SS 3",      sectionLabel: "Senior",  feeId: "2", feeName: "Second Term Tuition",     feeTypeName: "Tuition Fee",      feeTypeIndex: 0, term: "Second Term", receivedBy: STAFF[2], receivedDate: "2025-01-14", amount: 75000, totalFeeAmount: 75000 },
  { id: "4",  studentId: "4",  studentName: "Fatima Musa",    admissionNo: "SCH/2024/004", studentClass: "JSS 2",     sectionLabel: "Junior",  feeId: "5", feeName: "First Term Exam",         feeTypeName: "Exam Fee",         feeTypeIndex: 3, term: "First Term",  receivedBy: STAFF[4], receivedDate: "2025-01-15", amount: 5000,  totalFeeAmount: 5000  },
  { id: "5",  studentId: "5",  studentName: "David Nwosu",    admissionNo: "SCH/2024/005", studentClass: "JSS 3",     sectionLabel: "Junior",  feeId: "7", feeName: "Sports & Recreation",     feeTypeName: "Sports Fee",       feeTypeIndex: 2, term: "First Term",  receivedBy: STAFF[3], receivedDate: "2025-01-16", amount: 4000,  totalFeeAmount: 8000  },
  { id: "6",  studentId: "6",  studentName: "Ngozi Obi",      admissionNo: "SCH/2024/006", studentClass: "Primary 3", sectionLabel: "Primary", feeId: "4", feeName: "Annual Development Levy", feeTypeName: "Development Levy", feeTypeIndex: 1, term: "First Term",  receivedBy: STAFF[0], receivedDate: "2025-01-17", amount: 25000, totalFeeAmount: 25000 },
  { id: "7",  studentId: "7",  studentName: "Emeka Chukwu",   admissionNo: "SCH/2024/007", studentClass: "Primary 5", sectionLabel: "Primary", feeId: "8", feeName: "Library Access Fee",      feeTypeName: "Library Fee",      feeTypeIndex: 4, term: "First Term",  receivedBy: STAFF[1], receivedDate: "2025-01-18", amount: 3500,  totalFeeAmount: 3500  },
  { id: "8",  studentId: "8",  studentName: "Aisha Bello",    admissionNo: "SCH/2024/008", studentClass: "JSS 1",     sectionLabel: "Junior",  feeId: "3", feeName: "Third Term Tuition",      feeTypeName: "Tuition Fee",      feeTypeIndex: 0, term: "Third Term",  receivedBy: STAFF[2], receivedDate: "2025-01-20", amount: 60000, totalFeeAmount: 75000 },
  { id: "9",  studentId: "9",  studentName: "Kemi Adewale",   admissionNo: "SCH/2024/009", studentClass: "Primary 1", sectionLabel: "Primary", feeId: "1", feeName: "First Term Tuition",      feeTypeName: "Tuition Fee",      feeTypeIndex: 0, term: "First Term",  receivedBy: STAFF[3], receivedDate: "2025-01-21", amount: 75000, totalFeeAmount: 75000 },
  { id: "10", studentId: "10", studentName: "Uche Okafor",    admissionNo: "SCH/2024/010", studentClass: "SS 3",      sectionLabel: "Senior",  feeId: "2", feeName: "Second Term Tuition",     feeTypeName: "Tuition Fee",      feeTypeIndex: 0, term: "Second Term", receivedBy: STAFF[4], receivedDate: "2025-01-22", amount: 75000, totalFeeAmount: 75000 },
  { id: "11", studentId: "1",  studentName: "Amara Okonkwo",  admissionNo: "SCH/2024/001", studentClass: "SS 1",      sectionLabel: "Senior",  feeId: "5", feeName: "First Term Exam",         feeTypeName: "Exam Fee",         feeTypeIndex: 3, term: "First Term",  receivedBy: STAFF[0], receivedDate: "2025-01-23", amount: 5000,  totalFeeAmount: 5000  },
  { id: "12", studentId: "2",  studentName: "Tunde Adeyemi",  admissionNo: "SCH/2024/002", studentClass: "SS 2",      sectionLabel: "Senior",  feeId: "7", feeName: "Sports & Recreation",     feeTypeName: "Sports Fee",       feeTypeIndex: 2, term: "First Term",  receivedBy: STAFF[1], receivedDate: "2025-01-24", amount: 8000,  totalFeeAmount: 8000  },
  { id: "13", studentId: "3",  studentName: "Chisom Eze",     admissionNo: "SCH/2024/003", studentClass: "SS 3",      sectionLabel: "Senior",  feeId: "4", feeName: "Annual Development Levy", feeTypeName: "Development Levy", feeTypeIndex: 1, term: "First Term",  receivedBy: STAFF[2], receivedDate: "2025-01-25", amount: 25000, totalFeeAmount: 25000 },
  { id: "14", studentId: "4",  studentName: "Fatima Musa",    admissionNo: "SCH/2024/004", studentClass: "JSS 2",     sectionLabel: "Junior",  feeId: "8", feeName: "Library Access Fee",      feeTypeName: "Library Fee",      feeTypeIndex: 4, term: "First Term",  receivedBy: STAFF[3], receivedDate: "2025-01-26", amount: 3500,  totalFeeAmount: 3500  },
  { id: "15", studentId: "5",  studentName: "David Nwosu",    admissionNo: "SCH/2024/005", studentClass: "JSS 3",     sectionLabel: "Junior",  feeId: "3", feeName: "Third Term Tuition",      feeTypeName: "Tuition Fee",      feeTypeIndex: 0, term: "Third Term",  receivedBy: STAFF[4], receivedDate: "2025-01-27", amount: 75000, totalFeeAmount: 75000 },
];

export const mockExpenses: Expense[] = [
  { id: "1",  description: "Electricity bill — January 2025",                    category: "Utilities",     amount: 48000,  date: "2025-01-05", recordedBy: "Mrs. Okafor"  },
  { id: "2",  description: "Classroom chair replacements (12 units)",             category: "Maintenance",   amount: 72000,  date: "2025-01-08", recordedBy: "Mr. Adebayo"  },
  { id: "3",  description: "Chalk, markers and stationery supplies",              category: "Supplies",      amount: 15500,  date: "2025-01-10", recordedBy: "Miss Lawal"   },
  { id: "4",  description: "Support staff January salaries",                      category: "Salaries",      amount: 320000, date: "2025-01-31", recordedBy: "Mr. Chukwu"   },
  { id: "5",  description: "Inter-house sports event logistics",                  category: "Events",        amount: 55000,  date: "2025-02-03", recordedBy: "Mr. Nwosu"    },
  { id: "6",  description: "School bus fuel — February",                          category: "Transport",     amount: 38000,  date: "2025-02-06", recordedBy: "Mr. Adebayo"  },
  { id: "7",  description: "Canteen restocking — vegetables & proteins",          category: "Food & Catering", amount: 29000, date: "2025-02-10", recordedBy: "Mrs. Okafor"  },
  { id: "8",  description: "Computer lab maintenance & antivirus renewal",        category: "ICT",           amount: 42500,  date: "2025-02-14", recordedBy: "Miss Lawal"   },
  { id: "9",  description: "Staff training workshop — curriculum development",    category: "Training",      amount: 35000,  date: "2025-02-20", recordedBy: "Mr. Chukwu"   },
  { id: "10", description: "Library book acquisition — new titles",               category: "Supplies",      amount: 28000,  date: "2025-03-01", recordedBy: "Mr. Nwosu"    },
  { id: "11", description: "School fence repair and painting",                    category: "Maintenance",   amount: 31500,  date: "2025-03-10", recordedBy: "Mrs. Okafor"  },
  { id: "12", description: "End of term prize giving day expenses",               category: "Events",        amount: 12000,  date: "2025-03-20", recordedBy: "Mr. Adebayo"  },
];

// Mock paid list data keyed by feeId
export const mockPaidListData: Record<string, PaidListEntry[]> = {
  "1": [
    { studentId: "12", studentName: "Ibrahim Yakubu", admissionNo: "SCH/2024/012", studentClass: "SS 1", sectionLabel: "Senior", amountPaid: 75000, totalFeeAmount: 75000, datePaid: "2025-01-24" },
    { studentId: "2",  studentName: "Tunde Adeyemi",  admissionNo: "SCH/2024/002", studentClass: "SS 2", sectionLabel: "Senior", amountPaid: 40000, totalFeeAmount: 75000, datePaid: "2025-01-11" },
    { studentId: "1",  studentName: "Amara Okonkwo",  admissionNo: "SCH/2024/001", studentClass: "SS 1", sectionLabel: "Senior", amountPaid: 75000, totalFeeAmount: 75000, datePaid: "2025-01-10" },
  ],
  "2": [
    { studentId: "3",  studentName: "Chisom Eze",  admissionNo: "SCH/2024/003", studentClass: "SS 3", sectionLabel: "Senior", amountPaid: 75000, totalFeeAmount: 75000, datePaid: "2025-01-14" },
    { studentId: "10", studentName: "Uche Okafor", admissionNo: "SCH/2024/010", studentClass: "SS 3", sectionLabel: "Senior", amountPaid: 75000, totalFeeAmount: 75000, datePaid: "2025-01-22" },
  ],
  "5": [
    { studentId: "4", studentName: "Fatima Musa",   admissionNo: "SCH/2024/004", studentClass: "JSS 2", sectionLabel: "Junior", amountPaid: 5000, totalFeeAmount: 5000, datePaid: "2025-01-15" },
    { studentId: "1", studentName: "Amara Okonkwo", admissionNo: "SCH/2024/001", studentClass: "SS 1",  sectionLabel: "Senior", amountPaid: 5000, totalFeeAmount: 5000, datePaid: "2025-01-23" },
  ],
};

export const termOptions = [
  { value: "First Term",  label: "First Term"  },
  { value: "Second Term", label: "Second Term" },
  { value: "Third Term",  label: "Third Term"  },
];

export const sectionOptions = [
  { value: "nursery", label: "Nursery" },
  { value: "primary", label: "Primary" },
  { value: "junior",  label: "Junior"  },
  { value: "senior",  label: "Senior"  },
];

export const QUICK_AMOUNTS = [5000, 10000, 25000, 50000, 100000];

export const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100   text-blue-700",
  "bg-green-100  text-green-700",
  "bg-amber-100  text-amber-700",
  "bg-pink-100   text-pink-700",
  "bg-indigo-100 text-indigo-700",
];

export function avatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

const EXPENSE_CATEGORY_COLORS: Record<string, string> = {
  "Utilities":      "bg-blue-50   text-blue-700   border border-blue-100",
  "Maintenance":    "bg-amber-50  text-amber-700  border border-amber-100",
  "Supplies":       "bg-green-50  text-green-700  border border-green-100",
  "Salaries":       "bg-purple-50 text-purple-700 border border-purple-100",
  "Events":         "bg-pink-50   text-pink-700   border border-pink-100",
  "Transport":      "bg-cyan-50   text-cyan-700   border border-cyan-100",
  "Food & Catering":"bg-orange-50 text-orange-700 border border-orange-100",
  "ICT":            "bg-indigo-50 text-indigo-700 border border-indigo-100",
  "Training":       "bg-teal-50   text-teal-700   border border-teal-100",
};

export function expenseCategoryColor(category: string): string {
  return EXPENSE_CATEGORY_COLORS[category] ?? "bg-gray-50 text-gray-600 border border-gray-200";
}