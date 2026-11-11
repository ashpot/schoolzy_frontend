import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthHeader, AuthImagePanel, authPanels, SA_ROUTES } from "@/super-admin-auth";

export default function SuperAdminAuthLayout() {
  const { pathname } = useLocation();
  const panel = authPanels[pathname] ?? authPanels[SA_ROUTES.login];

  // Keep the platform console out of search engines while this layout is mounted.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="global-p flex min-h-screen flex-col gap-8 py-8">
        <AuthHeader />
        <main className="grid flex-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          <section className="flex flex-col justify-center">
            <div className="w-full max-w-xl">
              <Outlet />
            </div>
          </section>
          <AuthImagePanel key={pathname} {...panel} />
        </main>
      </div>
    </div>
  );
}