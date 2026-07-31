import { useQuery } from "@tanstack/react-query";
import { getTenant } from "@/shared/utils/tenant";

const TENANT_API_URL = "https://api.schoolzy.com.ng/api/v1/public/tenant/";
const ROOT_DOMAIN = "schoolzy.com.ng";

export interface TenantInfo {
  school_name: string;
  logo: string | null;
  favicon: string | null;
  school_slug: string;
}

async function fetchTenant(tenant: string): Promise<TenantInfo> {
  const res = await fetch(TENANT_API_URL, {
    headers: {
      "X-Tenant-Domain": `${tenant}.${ROOT_DOMAIN}`,
    },
  });

  if (!res.ok) {
    throw new Error("TENANT_NOT_FOUND");
  }
  return res.json();
}

export function useTenantCheck() {
  const tenant = getTenant();

  return useQuery({
    queryKey: ["tenant-check", tenant],
    queryFn: () => fetchTenant(tenant as string),
    enabled: !!tenant,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}