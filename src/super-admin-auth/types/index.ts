export interface SuperAdminUser {
  uuid: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "SUPER_ADMIN";
}

export interface LoginResponse {
  success: boolean;
  message?: string;
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