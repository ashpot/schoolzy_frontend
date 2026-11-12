import type { SuperAdminUser } from "../types";

const TOKEN_KEY = "schoolzy_sa_token";
const USER_KEY = "schoolzy_sa_user";

function remove(key: string) {
  try {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch {
    /* storage unavailable */
  }
}

function write(key: string, value: string, remember: boolean) {
  remove(key);
  try {
    (remember ? localStorage : sessionStorage).setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key) ?? localStorage.getItem(key);
  } catch {
    return null;
  }
}

export const tokenStorage = {
  save: (token: string, remember: boolean) => write(TOKEN_KEY, token, remember),
  get: () => read(TOKEN_KEY),
  // Clears the token AND the cached user so a session can never half-exist.
  clear: () => {
    remove(TOKEN_KEY);
    remove(USER_KEY);
  },
};

export const userStorage = {
  save: (user: SuperAdminUser, remember: boolean) =>
    write(USER_KEY, JSON.stringify(user), remember),
  get: (): SuperAdminUser | null => {
    try {
      const raw = read(USER_KEY);
      return raw ? (JSON.parse(raw) as SuperAdminUser) : null;
    } catch {
      return null;
    }
  },
};