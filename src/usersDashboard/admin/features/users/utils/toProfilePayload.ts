import type { CreateUserPayload } from "./buildUserFormData";

interface ProfileValues {
  firstName: string;
  lastName: string;
  middleName?: string;
  username: string;
  password: string;
  email?: string;
  sex?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  dob?: string;
  photo?: File;
}

/** Maps the shared person-form fields (Teacher / Admin / Parent) to the backend payload. */
export function toProfilePayload(v: ProfileValues): CreateUserPayload {
  return {
    first_name: v.firstName,
    last_name: v.lastName,
    middle_name: v.middleName,
    username: v.username,
    password: v.password,
    email: v.email,
    sex: v.sex,
    phone: v.phone,
    address: v.address,
    city: v.city,
    state: v.state,
    country: v.country,
    date_of_birth: v.dob,
    photo: v.photo,
  };
}