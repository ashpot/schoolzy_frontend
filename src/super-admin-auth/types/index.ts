export interface SuperAdminUser {
  id: number;
  fullname: string;
  email: string;
  role: "SuperAdmin";
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: SuperAdminUser;
}

export interface ResetFlow {
  email: string | null;
  resetToken: string | null;
}

export interface AuthPanelConfig {
  images: string[];
  fit: "cover" | "contain";
}