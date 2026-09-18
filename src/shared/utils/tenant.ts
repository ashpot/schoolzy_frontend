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

export function getRootDomainUrl(path: string = ""): string {
  const host = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";
  const protocol = window.location.protocol;

  const matchedRoot = ROOT_DOMAINS.find(
    (root) => host === root || host === `www.${root}` || host.endsWith(`.${root}`)
  );

  const rootHost = matchedRoot ?? ROOT_DOMAINS[0];

  return `${protocol}//${rootHost}${port}${path}`;
}