import type { Student, Teacher, Admin, Parent } from "../types";
import type { BulkUploadConfig, ReviewRow } from "../types/BulkUpload";

export const mockStudents: Student[] = [
  { id: "1", admNo: "SCH/2025/001", firstName: "Amara",  lastName: "Udo",      middleName: "",  username: "@amara.u",   sex: "Female", dob: "2010-03-12", phone: "+2348012345678", address: "12 Lagos St", city: "Enugu",  state: "Enugu",  country: "Nigeria", email: "amara@school.com",  classGroup: "JSS",  section: "Jnr Sec", classLabel: "JSS 1A", dateOfAdmission: "2024-09-01" },
  { id: "2", admNo: "SCH/2025/002", firstName: "Chidi",  lastName: "Nduka",    middleName: "",  username: "@chidi.ND", sex: "Male",   dob: "2009-07-22", phone: "+2348023456789", address: "5 Aba Rd",    city: "Aba",    state: "Abia",   country: "Nigeria", email: "chidi@school.com",  classGroup: "JSS",  section: "Jnr Sec", classLabel: "JSS 1B", dateOfAdmission: "2024-09-01" },
  { id: "3", admNo: "SCH/2025/003", firstName: "Fatima", lastName: "Aliyu",    middleName: "",  username: "@FatimaA", sex: "Female", dob: "2007-11-04", phone: "+2348034567890", address: "3 Kano Ave",  city: "Kano",   state: "Kano",   country: "Nigeria", email: "fatima@school.com", classGroup: "SS",   section: "Snr Sec", classLabel: "SS 2A",  dateOfAdmission: "2022-09-01" },
  { id: "4", admNo: "SCH/2025/004", firstName: "Seun",   lastName: "Adekunle", middleName: "",  username: "@Seun.Ade",sex: "Male",   dob: "2008-05-17", phone: "+2348045678901", address: "8 Ibadan Cl", city: "Ibadan", state: "Oyo",    country: "Nigeria", email: "seun@school.com",   classGroup: "SS",   section: "Snr Sec", classLabel: "SS 1C",  dateOfAdmission: "2023-09-01" },
  { id: "5", admNo: "SCH/2025/005", firstName: "Ngozi",  lastName: "Okoro",    middleName: "",  username: "@NgoziOk", sex: "Female", dob: "2010-01-30", phone: "+2348056789012", address: "2 Onitsha Rd",city: "Onitsha",state: "Anambra",country: "Nigeria", email: "ngozi@school.com",  classGroup: "JSS",  section: "Jnr Sec", classLabel: "JSS 2A", dateOfAdmission: "2024-09-01" },
  { id: "6", admNo: "SCH/2025/006", firstName: "Tunde",  lastName: "Bello",    middleName: "",  username: "@tunde.b", sex: "Male",   dob: "2009-09-09", phone: "+2348067890123", address: "7 Abuja Way", city: "Abuja",  state: "FCT",    country: "Nigeria", email: "tunde@school.com",  classGroup: "JSS",  section: "Jnr Sec", classLabel: "JSS 3B", dateOfAdmission: "2023-09-01" },
  { id: "7", admNo: "SCH/2025/007", firstName: "Ifeoma", lastName: "Obi",      middleName: "",  username: "@ify.obi", sex: "Female", dob: "2008-12-25", phone: "+2348078901234", address: "9 Port Harcourt", city: "PH", state: "Rivers", country: "Nigeria", email: "ify@school.com",    classGroup: "SS",   section: "Snr Sec", classLabel: "SS 3A",  dateOfAdmission: "2022-09-01" },
  { id: "8", admNo: "SCH/2025/008", firstName: "Musa",   lastName: "Garba",    middleName: "",  username: "@musa.g",  sex: "Male",   dob: "2011-02-14", phone: "+2348089012345", address: "4 Kaduna Blvd",city: "Kaduna", state: "Kaduna", country: "Nigeria", email: "musa@school.com",   classGroup: "JSS",  section: "Jnr Sec", classLabel: "JSS 1C", dateOfAdmission: "2024-09-01" },
];

export const mockTeachers: Teacher[] = [
  { id: "1", empNo: "TCH/2025/001", firstName: "Okafor",   lastName: "Ada",     username: "@eze.blessed", sex: "Female", dob: "1990-03-12", phone: "+2348012345678", address: "10 Teacher Ave", city: "Lagos",  state: "Lagos",   country: "Nigeria", email: "ada@school.com",      classLabel: "JSS 3A", dateOfEmployment: "2018-01-15", middleName: "" },
  { id: "2", empNo: "TCH/2025/002", firstName: "Emeka",    lastName: "Nwosu",   username: "@eze.blessed", sex: "Male",   dob: "1985-07-22", phone: "+2348023456789", address: "22 School Rd",   city: "Enugu",  state: "Enugu",   country: "Nigeria", email: "emeka@school.com",    classLabel: "SS 2B",  dateOfEmployment: "2015-09-01", middleName: "" },
  { id: "3", empNo: "TCH/2025/003", firstName: "Halima",   lastName: "Musa",    username: "@eze.blessed", sex: "Female", dob: "1992-11-04", phone: "+2348034567890", address: "3 Kano St",      city: "Kano",   state: "Kano",    country: "Nigeria", email: "halima@school.com",   classLabel: "JSS 1A", dateOfEmployment: "2020-01-10", middleName: "" },
  { id: "4", empNo: "TCH/2025/004", firstName: "Fashola",  lastName: "Tunde",   username: "@eze.blessed", sex: "Male",   dob: "1988-05-17", phone: "+2348045678901", address: "7 Ibadan Way",   city: "Ibadan", state: "Oyo",     country: "Nigeria", email: "tunde@school.com",    classLabel: "SS 1A",  dateOfEmployment: "2016-04-20", middleName: "" },
  { id: "5", empNo: "TCH/2025/005", firstName: "Blessing", lastName: "Eze",     username: "@eze.blessed", sex: "Female", dob: "1995-01-30", phone: "+2348056789012", address: "5 Aba Rd",       city: "Aba",    state: "Abia",    country: "Nigeria", email: "blessing@school.com", classLabel: "JSS 2B", dateOfEmployment: "2021-09-01", middleName: "" },
  { id: "6", empNo: "TCH/2025/006", firstName: "Sule",     lastName: "Ibrahim", username: "@eze.blessed", sex: "Male",   dob: "1983-09-09", phone: "+2348067890123", address: "11 North Ave",   city: "Abuja",  state: "FCT",     country: "Nigeria", email: "sule@school.com",     classLabel: "SS 3A",  dateOfEmployment: "2013-03-05", middleName: "" },
];

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