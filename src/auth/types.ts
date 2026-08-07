export type UserRole = "Admin" | "Teacher" | "Student" | "Parent";

export interface AuthUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  user: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

export interface ApiErrorResponse {
  success?: false;
  message?: string;
  error?: string;
}