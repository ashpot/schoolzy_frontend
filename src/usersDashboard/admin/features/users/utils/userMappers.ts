import type { UserResponse, Student, Teacher, Admin, Parent, ClassGroupListItem } from "../types";

const sexOrFallback = (sex: "Male" | "Female" | null): "Male" | "Female" => sex ?? "Male"; // TODO: type only allows Male/Female — nulls coerced, not real data

function sectionLabel(sectionName: string | undefined): "Jnr Sec" | "Snr Sec" {
  if (!sectionName) return "Jnr Sec";
  const upper = sectionName.toUpperCase();
  if (upper.includes("SENIOR")) return "Snr Sec";
  return "Jnr Sec"; // default bucket — Primary/Pre-Primary sections will misclassify here
}

export function toStudent(u: UserResponse, classGroups: ClassGroupListItem[]): Student {
  const cg = classGroups.find((c) => c.id === u.class_group);
  return {
    id: String(u.id),
    admNo: u.admission_number ?? "—",
    firstName: u.first_name,
    middleName: u.middle_name ?? undefined,
    lastName: u.last_name,
    username: u.username,
    sex: sexOrFallback(u.sex),
    dob: u.date_of_birth ?? "",
    phone: u.phone ?? "",
    address: u.address ?? "",
    city: u.city ?? "",
    state: u.state ?? "",
    country: u.country ?? "",
    email: u.email,
    classGroup: cg?.name ?? "—",
    section: sectionLabel(cg?.section_name),
    classLabel: cg?.name ?? "—",
    dateOfAdmission: u.date_of_admission ?? "",
    photo: u.photo ?? undefined,
  };
}

export function toTeacher(u: UserResponse): Teacher {
  return {
    id: String(u.id),
    empNo: u.employment_number ?? "—",
    firstName: u.first_name,
    middleName: u.middle_name ?? undefined,
    lastName: u.last_name,
    username: u.username,
    sex: sexOrFallback(u.sex),
    dob: u.date_of_birth ?? "",
    phone: u.phone ?? "",
    address: u.address ?? "",
    city: u.city ?? "",
    state: u.state ?? "",
    country: u.country ?? "",
    email: u.email,
    classLabel: "—", // not available from /users/ — needs /academics/assigned-classes/
    dateOfEmployment: u.date_of_employment ?? "",
    photo: u.photo ?? undefined,
  };
}

export function toAdmin(u: UserResponse): Admin {
  return {
    id: String(u.id),
    adminId: `ADM-${String(u.id).padStart(4, "0")}`, // display-only, not a real backend field
    firstName: u.first_name,
    middleName: u.middle_name ?? undefined,
    lastName: u.last_name,
    username: u.username,
    sex: sexOrFallback(u.sex),
    dob: u.date_of_birth ?? "",
    phone: u.phone ?? "",
    address: u.address ?? "",
    city: u.city ?? "",
    state: u.state ?? "",
    country: u.country ?? "",
    email: u.email,
    signature: u.signature ?? undefined,
    photo: u.photo ?? undefined,
  };
}

export function toParent(u: UserResponse): Parent {
  return {
    id: String(u.id),
    parentId: `PAR-${String(u.id).padStart(4, "0")}`, // display-only, not a real backend field
    firstName: u.first_name,
    middleName: u.middle_name ?? undefined,
    lastName: u.last_name,
    username: u.username,
    sex: sexOrFallback(u.sex),
    dob: u.date_of_birth ?? "",
    phone: u.phone ?? "",
    address: u.address ?? "",
    city: u.city ?? "",
    state: u.state ?? "",
    country: u.country ?? "",
    email: u.email,
    photo: u.photo ?? undefined,
  };
}