export const SA_ROUTES = {
  login: "/super-admin/login",
  forgotPassword: "/super-admin/forgot-password",
  verifyCode: "/super-admin/verify-code",
  setPassword: "/super-admin/set-password",
  dashboard: "/super-admin/dashboard",
} as const;

export const MAX_ATTEMPTS = 5;
export const LOCKOUT_SECONDS = 30;
export const RESEND_SECONDS = 60;

// Off by default: OAuth on a platform console widens the attack surface.
// Flip to true to match Figma once the backend supports it.
export const ENABLE_SOCIAL_LOGIN = false;