import { SA_ROUTES } from "../utils/constants";
import type { AuthPanelConfig } from "../types";

// TODO: Replace placeholder URLs with final images (import from @/assets/super-admin-auth/...)
// Picsum URL format: /seed/<any-word>/<width>/<height>. Same seed = same photo every time.
const IMG = {
  login: "https://picsum.photos/seed/schoolzy-login/1200/1400",
  forgot: "https://picsum.photos/seed/schoolzy-forgot/1200/1400",
  verify: "https://picsum.photos/seed/schoolzy-verify/1200/1400",
  setPassword: "https://picsum.photos/seed/schoolzy-reset/1200/1400",
};

// Add more URLs to the login array to get the carousel dots from Figma.
export const authPanels: Record<string, AuthPanelConfig> = {
  [SA_ROUTES.login]: {
    images: [IMG.login, "https://picsum.photos/seed/schoolzy-login-2/1200/1400"],
    fit: "cover",
  },
  [SA_ROUTES.forgotPassword]: { images: [IMG.forgot], fit: "cover" },
  [SA_ROUTES.verifyCode]: { images: [IMG.verify], fit: "cover" },
  [SA_ROUTES.setPassword]: { images: [IMG.setPassword], fit: "cover" },
};