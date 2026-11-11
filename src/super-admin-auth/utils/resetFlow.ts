import type { ResetFlow } from "../types";

// In-memory only. Never put these in the URL, localStorage or router state.
let flow: ResetFlow = { email: null, resetToken: null };

export const resetFlow = {
  get: () => flow,
  setEmail: (email: string) => {
    flow = { email, resetToken: null };
  },
  setToken: (resetToken: string) => {
    flow = { ...flow, resetToken };
  },
  clear: () => {
    flow = { email: null, resetToken: null };
  },
};