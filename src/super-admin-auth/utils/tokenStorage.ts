const KEY = "schoolzy_sa_token";

function clearToken() {
  try {
    sessionStorage.removeItem(KEY);
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}

function saveToken(token: string, remember: boolean) {
  clearToken();
  try {
    (remember ? localStorage : sessionStorage).setItem(KEY, token);
  } catch {
    /* storage unavailable */
  }
}

function getToken(): string | null {
  try {
    return sessionStorage.getItem(KEY) ?? localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export const tokenStorage = { save: saveToken, get: getToken, clear: clearToken };