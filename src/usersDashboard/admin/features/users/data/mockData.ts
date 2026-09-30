import type { Admin, Parent } from "../types";
import type { BulkUploadConfig, ReviewRow } from "../types/BulkUpload";

export const mockAdmins: Admin[] = [
  { id: "1", adminId: "ADM-001", firstName: "Adeyemi",      lastName: "Oluwaseun",  username: "@oluwa.ade",    sex: "Male",   dob: "1988-03-10", phone: "+2348012345678", address: "1 Admin Block", city: "Lagos",  state: "Lagos",  country: "Nigeria", email: "seun@school.com",    middleName: "" },
  { id: "2", adminId: "ADM-002", firstName: "Okonkwo",      lastName: "Chidinma",   username: "@nma_okonkwo",  sex: "Female", dob: "1992-07-20", phone: "+2348023456789", address: "4 Office Rd",   city: "Enugu",  state: "Enugu",  country: "Nigeria", email: "nma@school.com",     middleName: "" },
  { id: "3", adminId: "ADM-003", firstName: "Lawal",        lastName: "Babatunde",  username: "@baba_law",     sex: "Male",   dob: "1985-11-15", phone: "+2348034567890", address: "9 Admin Lane",  city: "Ibadan", state: "Oyo",    country: "Nigeria", email: "baba@school.com",    middleName: "" },
  { id: "4", adminId: "ADM-004", firstName: "Ibrahim",      lastName: "Aminat",     username: "@ibra.aminat",  sex: "Female", dob: "1990-05-25", phone: "+2348045678901", address: "2 North St",    city: "Kano",   state: "Kano",   country: "Nigeria", email: "aminat@school.com",  middleName: "" },
  { id: "5", adminId: "ADM-005", firstName: "Nwosu",        lastName: "Chukwuemeka",username: "@emeka_nwosu",  sex: "Male",   dob: "1987-01-18", phone: "+2348056789012", address: "6 East Ave",    city: "Aba",    state: "Abia",   country: "Nigeria", email: "emeka@school.com",   middleName: "" },
  { id: "6", adminId: "ADM-006", firstName: "Bello",        lastName: "Rukayat",    username: "@belruk",       sex: "Female", dob: "1993-09-12", phone: "+2348067890123", address: "3 West Blvd",   city: "Abuja",  state: "FCT",    country: "Nigeria", email: "ruka@school.com",    middleName: "" },
];

export const mockParents: Parent[] = [
  { id: "1", parentId: "PAR-001", firstName: "Okafor",   lastName: "Ngozi",       username: "@ngozi_o",    sex: "Female", dob: "1978-03-10", phone: "+2348012345678", address: "12 Parent Ave", city: "Lagos",  state: "Lagos",  country: "Nigeria", email: "ngozi@parent.com",    middleName: "" },
  { id: "2", parentId: "PAR-002", firstName: "Adebayo",  lastName: "Emmanuel",    username: "@bayo.nuel",  sex: "Male",   dob: "1975-07-22", phone: "+2348023456789", address: "5 Family Rd",   city: "Ibadan", state: "Oyo",    country: "Nigeria", email: "bayo@parent.com",     middleName: "" },
  { id: "3", parentId: "PAR-003", firstName: "Fatima",   lastName: "Musa",        username: "@fatima.m",   sex: "Female", dob: "1980-11-04", phone: "+2348034567890", address: "3 Kano Way",    city: "Kano",   state: "Kano",   country: "Nigeria", email: "fatima@parent.com",   middleName: "" },
  { id: "4", parentId: "PAR-004", firstName: "Obi",      lastName: "Chukwudi",    username: "@chuks_obi",  sex: "Male",   dob: "1972-05-17", phone: "+2348045678901", address: "8 East Lane",   city: "Onitsha",state: "Anambra",country: "Nigeria", email: "chuks@parent.com",    middleName: "" },
  { id: "5", parentId: "PAR-005", firstName: "Bolanle",  lastName: "Adeleke",     username: "@bola.leke",  sex: "Female", dob: "1979-01-30", phone: "+2348056789012", address: "2 South Close", city: "Abeokuta",state: "Ogun",  country: "Nigeria", email: "bola@parent.com",     middleName: "" },
  { id: "6", parentId: "PAR-006", firstName: "Garba",    lastName: "Suleiman",    username: "@sule.garba", sex: "Male",   dob: "1970-09-09", phone: "+2348067890123", address: "11 North Rd",   city: "Kaduna", state: "Kaduna", country: "Nigeria", email: "garba@parent.com",    middleName: "" },
  { id: "7", parentId: "PAR-007", firstName: "Adaeze",   lastName: "Nwosu",       username: "@ada.eze",    sex: "Female", dob: "1982-12-25", phone: "+2348078901234", address: "9 PH Road",     city: "PH",     state: "Rivers", country: "Nigeria", email: "ada@parent.com",      middleName: "" },
];

const studentReviewRows: ReviewRow[] = [
  { id: "1", identifier: "SCH/2024/009", name: "Amina Yusuf", extraFields: { class: "JSS 1A" }, status: "ready" },
  { id: "2", identifier: "SCH/2024/010", name: "Emeka Obi", extraFields: { class: "SS 2B" }, status: "ready" },
  { id: "3", identifier: "SCH/2024/011", name: "Fatima Sule", extraFields: { class: "JSS 3A" }, status: "ready" },
  { id: "4", identifier: "SCH/2024/001", name: "Chidi Eze", extraFields: { class: "JSS 1B" }, issue: "Duplicate Admission No.", status: "error" },
  { id: "5", identifier: "SCH/2024/012", name: "Ngozi Uche", extraFields: { class: "SS 1C" }, status: "ready" },
  { id: "6", identifier: "SCH/2024/013", name: "Tunde Fashola", extraFields: { class: "INVALID" }, issue: "Invalid Class", status: "error" },
];

export const studentBulkUploadConfig: BulkUploadConfig = {
  entityLabel: "Student",
  entityLabelPlural: "Students",
  description: "Add multiple students at once by uploading a completed Schoolzy student template.",
  identifierLabel: "Adm. No.",
  requiredFields: [
    "Admission Number", "First Name", "Last Name", "Sex",
    "Date of Birth", "Class Group", "Date of Admission",
  ],
  optionalFields: [
    "Middle Name", "Photo", "Phone", "Address",
    "City", "State", "Country", "Email Address",
  ],
  reviewColumns: [{ key: "class", header: "Class" }],
  templateFileName: "schoolzy_student_template",
  mockReviewData: studentReviewRows,
  mockImportedCount: 236,
  mockSkippedCount: 12,
};

const teacherReviewRows: ReviewRow[] = [
  { id: "1", identifier: "TCH/2024/013", name: "Amina Garba", extraFields: { email: "amina.garba@school.com", dateOfEmployment: "01 Sep 2022" }, status: "ready" },
  { id: "2", identifier: "TCH/2024/014", name: "Emeka Obi", extraFields: { email: "emeka.obi@school.com", dateOfEmployment: "15 Jan 2023" }, status: "ready" },
  { id: "3", identifier: "TCH/2024/015", name: "Fatima Sule", extraFields: { email: "fatima.sule@school.com", dateOfEmployment: "03 Mar 2021" }, status: "ready" },
  { id: "4", identifier: "TCH/2024/001", name: "Chidi Nwosu", extraFields: { email: "chidi.nwosu@school.com", dateOfEmployment: "10 Jun 2020" }, issue: "Duplicate Employment No.", status: "error" },
];

export const teacherBulkUploadConfig: BulkUploadConfig = {
  entityLabel: "Teacher",
  entityLabelPlural: "Teachers",
  description: "Add multiple teachers at once by uploading a completed Schoolzy teacher template.",
  identifierLabel: "Emp. No.",
  requiredFields: [
    "Employment Number", "First Name", "Last Name",
    "Sex", "Date of Birth", "Date of Employment",
  ],
  optionalFields: [
    "Middle Name", "Photo", "Phone", "Address",
    "City", "State", "Country", "Email Address",
  ],
  reviewColumns: [
    { key: "email", header: "Email" },
    { key: "dateOfEmployment", header: "Date of Employment" },
  ],
  templateFileName: "schoolzy_teacher_template",
  mockReviewData: teacherReviewRows,
  mockImportedCount: 40,
  mockSkippedCount: 2,
};

export interface SearchableStudent {
  id: string;
  name: string;
  classLabel: string;
}

// TODO: Replace with real student list once GET /users/?role=Student is wired for parent-assignment search
export const mockSearchableStudents: SearchableStudent[] = [
  { id: "1", name: "Chidi Okafor", classLabel: "JSS 1A" },
  { id: "2", name: "Halima Musa", classLabel: "JSS 2C" },
  { id: "3", name: "Emeka Obi", classLabel: "SS 2B" },
  { id: "4", name: "Fatima Sule", classLabel: "JSS 3A" },
  { id: "5", name: "Ngozi Uche", classLabel: "SS 1C" },
  { id: "6", name: "Tunde Fashola", classLabel: "JSS 1B" },
  { id: "7", name: "Amina Yusuf", classLabel: "JSS 1A" },
];