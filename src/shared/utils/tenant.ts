const ROOT_DOMAINS = ["schoolzy.com.ng", "localhost"];

export function getTenant(): string | null {
  const host = window.location.hostname; // note: no port included in hostname

  for (const root of ROOT_DOMAINS) {
    if (host === root || host === `www.${root}`) return null;
    if (host.endsWith(`.${root}`)) {
      return host.replace(`.${root}`, "");
    }
  }

  return null;
}

export function isTenantDomain(): boolean {
  return getTenant() !== null;
}