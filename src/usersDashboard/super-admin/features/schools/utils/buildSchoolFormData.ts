import type { CreateSchoolValues } from "../schemas";

// TODO: field names are guesses; align with the backend serializer
export function buildSchoolFormData(v: CreateSchoolValues): FormData {
  const fd = new FormData();
  const set = (key: string, value: string | number | boolean) => {
    if (value !== "") fd.append(key, String(value));
  };

  set("school_name", v.name.trim());
  set("school_code", v.code.trim().toUpperCase());
  set("email", v.email.trim());
  set("phone", v.phone.trim());
  set("website", v.website.trim());
  set("address", v.address.trim());
  set("country", v.country);
  set("state", v.state.trim());
  set("city", v.city.trim());
  if (v.logo) fd.append("logo", v.logo, v.logo.name);

  set("admin_first_name", v.firstName.trim());
  set("admin_last_name", v.lastName.trim());
  set("admin_email", v.adminEmail.trim());
  set("admin_phone", v.adminPhone.trim());
  set("admin_username", v.username.trim());
  set("admin_temporary_password", v.temporaryPassword);

  set("subscription_plan", v.plan);
  set("trial_mode", v.trialMode);
  set("start_date", v.startDate);
  set("renewal_date", v.renewalDate);
  set("max_students", v.maxStudents);
  set("max_teachers", v.maxTeachers);
  return fd;
}