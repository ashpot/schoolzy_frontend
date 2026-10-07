export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  middle_name?: string;
  username: string;
  password: string;
  email?: string;
  sex?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  date_of_birth?: string;
  class_group?: number; // Student only
  admission_number?: string; // Student only
  employment_number?: string; // Teacher only
  date_of_employment?: string; // Teacher only
  children?: number[]; // Parent only — student ids
  photo?: File | null;
}
export function buildUserFormData(payload: CreateUserPayload & { role: string }): FormData {
  const fd = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (value instanceof File) {
      fd.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => fd.append(key, String(v)));
    } else {
      fd.append(key, String(value));
    }
  });

  return fd;
}